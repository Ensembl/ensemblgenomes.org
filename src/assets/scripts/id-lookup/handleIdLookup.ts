import searchEBI from '../search/search';
import getExactIdMatch, { Match } from './getExactIdMatch';
import { buildGeneUrl, buildTranscriptUrl, buildProteinUrl } from '../search/urlBuilder';

const handleIdLookup = async (query: string) => {
  const searchResults = await searchEBI({query, page: 1, perPage: 20});
  const exactMatch = getExactIdMatch(searchResults);

  console.log('exactMatch', exactMatch);
  if (exactMatch) {
    redirectTo(exactMatch);
  }
};

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

export default handleIdLookup;
