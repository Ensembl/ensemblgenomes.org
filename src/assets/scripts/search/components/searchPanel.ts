import { readDivisionFromUrl } from './divisions';

export const renderSearchField = ({ query }: { query: string }) => {
  const searchField = document.createElement('div');
  searchField.innerHTML = `
    <form>
      <label for="search-field" class="search-field__label">
        Search ${getSearchDivisions()}
      </label>
      <input id="search-field" class="search-field__input" name="query" />
      <button class="search-field__button" type="submit">
        Search
      </button>
    </form>
  `;
  searchField.classList.add('search-panel');
  searchField.querySelector('form')
    ?.addEventListener('submit', onSearchSubmit);
  const searchInput = searchField.querySelector('input') as HTMLInputElement;
  searchInput.value = query; // setting the value on the input field imperatively rather than in the template above to avoid edge cases such as quotes
  
  return searchField;
};

const onSearchSubmit = (event: Event) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const inputField = form.querySelector('input');
  const query = inputField?.value;
  if (!query) {
    return;
  }

  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('query', query);
  url.search = `?${searchParams.toString()}`;
  const newUrl = url.toString();
  window.location.href = newUrl;
};

const getSearchDivisions = () => {
  return readDivisionFromUrl() ?? 'all genomes';
};
