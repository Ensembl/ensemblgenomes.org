const getExactIdMatch = ({ vertebrates, nonVertebrates, query }) => {
  return findMatch(vertebrates, query)
      || findMatch(nonVertebrates, query)
      || null;
};

const findMatch = (searchResults, query) => {
  console.log('searchResults', searchResults);
  
  if (!searchResults.entries.length) {
    return null;
  }
  const geneMatch = findGeneMatch(searchResults.entries, query);
  
  if (geneMatch) {
    return {
      type: 'gene',
      id: query,
      data: geneMatch
    };
  }
  
  const transcriptMatch = findTranscriptMatch(searchResults.entries, query);

  if (transcriptMatch) {
    return {
      type: 'transcript',
      id: query,
      data: transcriptMatch
    };
  }
  
  const proteinMatch = findProteinMatch(searchResults.entries, query);
  
  if (proteinMatch) {
    return {
      type: 'protein',
      id: query,
      data: proteinMatch
    };
  }
};

const findGeneMatch = (searchResults, query) => {
  return searchResults.find(item => item.id === query);
};

const findTranscriptMatch = (searchResults, query) => {
  // const unversionedQuery = query.split('.').shift();
  return searchResults.find(item => item.fields.transcript.includes(query));
};

const findProteinMatch = (searchResults, query) => {
  const unversionedQuery = query.split('.').shift();
  return searchResults.find(item => item.fields.peptide.includes(unversionedQuery));
};

export default getExactIdMatch;
