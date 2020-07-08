import {
  buildGeneUrl,
  buildTranscriptUrl,
  buildProteinUrl,
  buildSpeciesUrl
} from '../urlBuilder';

import { SearchEntry } from '../../types/ebeyeResponse';

export const renderSearchItem = (entry: SearchEntry) => {
  const element = document.createElement('div');

  const innerHtml = `
    <div class="search-result-item">
      ${renderSearchItemHeader(entry)}
      ${renderSearchItemBody(entry)}
    </div>
  `;

  element.innerHTML = innerHtml;
  return element;
};

const renderSearchItemHeader = (entry: SearchEntry) => {
  const hasTranscripts = entry.fields.transcript.length;
  const hasProteins = entry.fields.peptide.length;
  const transcriptLinks = entry.fields.transcript.map(transcript => {
    const url = buildTranscriptUrl(entry, transcript);
    return `<a href="${url}">${transcript}</a>`;
  }).join(', ');
  const transcriptsElement = hasTranscripts ? `
    <span class="search-result-item__header-section">
      Transcripts: ${transcriptLinks}
    </span>
  `: '';
  const proteinLinks = entry.fields.peptide.map(peptide => {
    const url = buildProteinUrl(entry, peptide);
    return `<a href="${url}">${peptide}</a>`;
  }).join(', ');
  const proteinsElement = hasProteins ? `
    <span class="search-result-item__header-section">
      Peptides: ${proteinLinks}
    </span>
  `: '';

  return `
    <div class="search-result-item__header">
      ${transcriptsElement}
      ${proteinsElement}
    </div>
  `;
};

const renderSearchItemBody = (entry: SearchEntry) => {
  const geneRow = `
    <span class="search-result-item__label">
      Gene ID
    </span>
    <span>
      <a href="${buildGeneUrl(entry)}">${entry.id}</a>
    </span>
  `;
  const descriptionRow = `
    <span class="search-result-item__label">
      Description
    </span>
    <span>${getDescription(entry)}</span>
  `;
  const speciesRow = `
    <span class="search-result-item__label">
      Species
    </span>
    <span>
      <a href="${buildSpeciesUrl(entry)}">${getSpeciesName(entry)}</a>
    </span>
  `;
  const locationRow = `
    <span class="search-result-item__label">
      Location
    </span>
    <span>
      <a href="${buildSpeciesUrl(entry)}">${getLocation(entry)}</a>
    </span>
  `

  return `
    <div class="search-result-item__body">
      ${geneRow}
      ${descriptionRow}
      ${speciesRow}
      ${locationRow}
    </div>
  `;
};

const getSpeciesName = (entry: SearchEntry) => {
  return entry.fields.species[0];
};

const getDescription = (entry: SearchEntry) => {
  return entry.fields.description[0] || '–';
};

const getLocation = (entry: SearchEntry) => {
  return entry.fields.location[0] || '–';
};
