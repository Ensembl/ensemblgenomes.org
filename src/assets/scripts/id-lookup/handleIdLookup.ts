import searchEBI from '../search/search';
import getExactIdMatch, { Match } from './getExactIdMatch';
import { buildGeneUrl, buildTranscriptUrl, buildProteinUrl } from '../search/urlBuilder';

const handleIdLookup = async (query: string) => {
  const searchResults = await searchEBI({query, page: 1, perPage: 20});
  const { nonVertebrates } = searchResults;
  const exactMatch = getExactIdMatch(searchResults);

  if (exactMatch) {
    showRedirectMessage();
    redirectTo(exactMatch);
  } else if (nonVertebrates.hitCount > 0) {
    redirectToSearch(query);
  } else {
    redirectTo404();
  }
};

export const showRedirectMessage = () => {
  const container = document.createElement('div');
  container.innerHTML = `
    <span>
      Please wait while you are being redirected...
    </span>
  `;
  container.style.cssText = `
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
  `;
  document.body.appendChild(container);
}

const redirectTo = (match: Match) => {
  let url;
  const { type, id, data } = match;
  if (type === 'gene') {
    url = buildGeneUrl(data);
  } else if (type === 'transcript') {
    url = buildTranscriptUrl(data, id);
  } else if (type === 'protein') {
    url = buildProteinUrl(data, id);
  }

  if (url) {
    window.location.href = url;
  }
};

const redirectToSearch = (query: string) => {
  const url = new URL(window.location.href);
  url.pathname = '/search/';
  url.searchParams.set('query', query);
  window.location.href = url.toString();
}

const redirectTo404 = () => {
  window.location.href = '/404/';
}

export default handleIdLookup;
