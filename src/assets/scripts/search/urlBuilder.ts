import { SearchEntry } from '../types/ebeyeResponse';

export const buildGeneUrl = (entry: SearchEntry) => {
  const geneId = entry.id;
  const species = getSpecies(entry);
  const pathname = `/${species}/Gene/Summary?g=${geneId}`;
  return `${getHost(entry)}${pathname}`;
};

export const buildTranscriptUrl = (entry: SearchEntry, transcriptId: string) => {
  const species = getSpecies(entry);
  const geneId = entry.fields.id[0];
  const host = getHost(entry);
  const pathname = `/${species}/Transcript/Summary?g=${geneId};t=${transcriptId}`;
  return `${host}${pathname}`;
};

export const buildProteinUrl = (entry: SearchEntry, proteinId: string) => {
  const division = getDivision(entry);
  const species = getSpecies(entry);
  const geneId = entry.fields.id[0];
  const host = getHost(entry);
  const proteinSummary = division === 'bacteria' ? `ProteinSummary_${proteinId}` : 'ProteinSummary';
  const pathname = `/${species}/Transcript/${proteinSummary}?g=${geneId};protein=${proteinId}`;
  return `${host}${pathname}`;
};

export const buildSpeciesUrl = (entry: SearchEntry) => {
  const host = getHost(entry);
  const species = getSpecies(entry);
  const pathname = `${species}/Info/Index`;
  return `${host}/${pathname}`;
};

const getSpecies = (entry: SearchEntry) => {
  return entry.fields.system_name[0];
}

const getHost = (entry: SearchEntry) => {
  return `https://${getSubdomain(entry)}.ensembl.org`;
};

const getSubdomain = (entry: SearchEntry) => {
  const division = getDivision(entry);
  return division === 'vertebrates' ? 'www' : division;
};

const getDivision = (entry: SearchEntry) => {
  return entry.fields.genomic_unit[0];
};
