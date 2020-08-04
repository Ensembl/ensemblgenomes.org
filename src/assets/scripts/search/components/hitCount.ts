export const renderHitCount = (query: string, hitCount: number) => {
  const container = document.createElement('div');
  const grammaticalResults = hitCount === 1 ? 'result' : 'results';
  container.innerHTML = `
    ${hitCount} ${grammaticalResults} for "${query}"
  `;

  container.classList.add('hit-count');
  return container;
};
