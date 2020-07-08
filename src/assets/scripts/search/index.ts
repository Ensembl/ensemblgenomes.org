import searchEBI from './search';
import { renderSearchItem } from './templates/searchResults';

(async () => {
  const searchParams = new URLSearchParams(window.location.search);
  console.log('searchParams', searchParams);
  if (!searchParams.has('query')) {
    // show error? or show a search field?
    return;
  }
  const query = searchParams.get('query') as string;

  const searchResults = await searchEBI(query);

  const container = document.querySelector('main');
  const renderedResults = searchResults.nonVertebrates.entries.map(renderSearchItem);

  // renderedResults.forEach(child => container?.appendChild(child));
  container?.append(...renderedResults);
  console.log('searchResults', searchResults);
})();
