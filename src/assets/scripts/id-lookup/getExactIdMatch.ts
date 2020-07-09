import { SearchResponse, SearchEntry } from '../types/ebeyeResponse';

type GetExactIdMatchParams = {
  nonVertebrates: SearchResponse;
  query: string;
};

export type Match = {
  type: string;
  id: string;
  data: SearchEntry
};

const getExactIdMatch = ({ nonVertebrates, query }: GetExactIdMatchParams) => {
  return findMatch(nonVertebrates, query) || null;
};

const findMatch = (searchResults: SearchResponse, query: string) => {  
  if (!searchResults.entries.length) {
    return null;
  }
  const geneMatch = findGeneMatch(searchResults, query);
  
  if (geneMatch) {
    return {
      type: 'gene',
      id: query,
      data: geneMatch
    };
  }
  
  const transcriptMatch = findTranscriptMatch(searchResults, query);

  if (transcriptMatch) {
    return {
      type: 'transcript',
      id: query,
      data: transcriptMatch
    };
  }
  
  const proteinMatch = findProteinMatch(searchResults, query);
  
  if (proteinMatch) {
    return {
      type: 'protein',
      id: query,
      data: proteinMatch
    };
  }
};

const findGeneMatch = (searchResults: SearchResponse, query: string) => {
  return searchResults.entries.find(item => item.id === query);
};

const findTranscriptMatch = (searchResults: SearchResponse, query: string) => {
  return searchResults.entries.find(item => item.fields.transcript.includes(query));
};

const findProteinMatch = (searchResults: SearchResponse, query: string) => {
  return searchResults.entries.find(item => item.fields.peptide.includes(query));
};

export default getExactIdMatch;
