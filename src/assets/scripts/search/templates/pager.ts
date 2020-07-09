type PagerParams = {
  query: string;
  page: number;
  perPage: number;
  hitCount: number;
};

export const renderPager = (params: PagerParams) => {
  const { query } = params;
  const pagerElement = document.createElement('div');
  pagerElement.classList.add('pager');
  const {
    pages,
    isFirstPageShown,
    isLastPageShown,
    lastPage
  } = getPageList(params);

  const pageLinks = pages.map(page => {
    const isCurrent = page === params.page;

    if (isCurrent) {
      return `
        <span class="pager__page pager__page_current">
          ${page}
        </span>
      `;
    } else {
      return `
        <a class="pager__page" href=${buildSearchPageUrl(query, page)}>
          ${page}
        </a>
      `;
    }
  }).join(' ');

// « first ‹ previous
// next › last »
  const spanner = `<span class="pager__spanner">...</spam>`
  const toFirst = isFirstPageShown
    ? ''
    : `
      <a class="pager__page" href=${buildSearchPageUrl(query, 1)}>
        « first
      </a>
      ${spanner}
    `;
  const toLast = isLastPageShown
    ? ''
    : `
      ${spanner}
      <a class="pager__page" href=${buildSearchPageUrl(query, lastPage)}>
        last »
      </a>
    `;

  pagerElement.innerHTML = `
    ${toFirst}
    ${pageLinks}
    ${toLast}
  `;
  return pagerElement;
};

const getLastPage = (params: PagerParams) => {
  const { perPage, hitCount } = params;
  return Math.ceil(hitCount / perPage);
};

const getPageList = (params: PagerParams) => {
  const { page } = params;
  const maxNumberOfPages = 9;
  const distanceFromMiddle = Math.floor(maxNumberOfPages / 2); // show this number of pages to the left and to the right of selected page
  const firstPage = 1;
  const lastPage = getLastPage(params);

  const isFirstPageShown = page - firstPage <= distanceFromMiddle;
  const startPage = isFirstPageShown ? 1 : page - distanceFromMiddle;
  const isLastPageShown = startPage + maxNumberOfPages >= lastPage;
  const endPage = isLastPageShown
    ? lastPage
    : isFirstPageShown
      ? maxNumberOfPages
      : page + distanceFromMiddle;

  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return {
    pages,
    isFirstPageShown,
    isLastPageShown,
    lastPage
  };
};

const buildSearchPageUrl = (query: string, page: number) => {
  const pageParam = page === 1 ? '' : `&page=${page}`;
  return `/search/?query=${query}${pageParam}`;
}
