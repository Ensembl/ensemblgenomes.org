import searchEBI from './search';
import { renderSearchField } from './components/searchPanel';
import { renderDivisions } from './components/divisions';
import { renderSearchItem } from './components/searchResults';
import { renderPager } from './components/pager';

import { SearchResponse } from '../types/ebeyeResponse';

const main = async () => {
  const searchParams = new URLSearchParams(window.location.search);
  if (!searchParams.has('query')) {
    // show error? or show a search field?
    return;
  }
  const query = searchParams.get('query') as string;
  const division = searchParams.get('division');
  const page = getPage(searchParams);

  const searchResults = await searchEBI({ query, division, page });

  const container = document.querySelector('main');
  const renderedResults = searchResults.nonVertebrates.entries.map(renderSearchItem);

  container?.appendChild(renderTopFields());
  container?.append(...renderedResults);
  container?.append(buildPager(query, searchResults.nonVertebrates, searchParams));
};

const getPage = (searchParams: URLSearchParams) => {
  let page = 1;
  const pageFromParam = searchParams.get('page');
  if (pageFromParam) {
    const parsedPage = parseInt(pageFromParam, 10);
    if (parsedPage && parsedPage > 0) {
      page = parsedPage;
    }
  }
  return page;
};

const renderTopFields = () => {
  const container = document.createElement('div');
  container.classList.add('top-grid');
  container?.appendChild(renderSearchField());
  container?.appendChild(renderDivisions());
  return container;
};

const buildPager = (query: string, response: SearchResponse, params: URLSearchParams) => {
  const { hitCount } = response;
  const page = getPage(params);
  return renderPager({ query, page, perPage: 10, hitCount });
};

(async () => {
  await main();
})();


/**
 window.onunload = function() {
    myfun();
    alert('Bye.');
}
 */
