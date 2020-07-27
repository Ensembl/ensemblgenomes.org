const divisions = [
  'Bacteria',
  'Fungi',
  'Metazoa',
  'Plants',
  'Protists'
];

export const renderDivisions = () => {
  const divisionsElement = document.createElement('div');
  const selectedDivision = readDivisionFromUrl();
  const divisionOptions = divisions.map(division => {
    const isSelected = division.toLowerCase() === selectedDivision;
    return `
      <option value="${division.toLowerCase()}" ${isSelected ? 'selected' : ''}>
        ${division}
      </option>
    `;
  });
  divisionsElement.innerHTML = `
    <label for="divisions">Search in division</label>
    <select id="divisions">
      <option value="">All</option>
      ${divisionOptions}
    </select>
  `;

  divisionsElement.classList.add('divisions-filter');
  divisionsElement.querySelector('select')?.addEventListener('change', onDivisionChange);
  return divisionsElement;
};

export const readDivisionFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('division');
}

const onDivisionChange = (event: Event) => {
  const division = (event.target as HTMLSelectElement).value;
  const searchParams = new URLSearchParams(window.location.search);
  if (division) {
    searchParams.set('division', division);
  } else {
    searchParams.delete('division');
  }
  searchParams.delete('page');
  const url = new URL(window.location.href);
  url.search = `?${searchParams.toString()}`;
  const newUrl = url.toString();
  window.location.href = newUrl;
};
