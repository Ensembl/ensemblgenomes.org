const searchEBI = async (query) => {
  const [vertebratesResults, nonVertebratesResults] = await Promise.all([
    searchVertebrates(query),
    searchNonVertebrates(query)
  ]);

  return {
    query,
    vertebrates: vertebratesResults,
    nonVertebrates: nonVertebratesResults
  };
};

const searchVertebrates = async (query) => {
  const url = buildSearchUrl('ensembl_gene', query);
  return await runSearch(url);
};

const searchNonVertebrates = async (query) => {
  const url = buildSearchUrl('ensemblGenomes_gene', query);
  return await runSearch(url);
};

const runSearch = async (url) => {
  return await fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => response.json());
}

const buildSearchUrl = (domain, query) =>
  `https://www.ebi.ac.uk/ebisearch/ws/rest/${domain}?query=${query}&fields=${getGeneFields()}`;

// see the full available list of fields at https://www.ebi.ac.uk/ebisearch/metadata.ebi?db=ensembl_gene
const getGeneFields = () => {
  const geneFields = [
    "domain_source",
    "gene_name",
    "id",
    "description",
    "species",
    "system_name",
    "featuretype",
    "genomic_unit",
    "source",
    "location",
    "transcript",
    "peptide",
    "gene_synonym"
  ];
  return geneFields.join(',');
};

export default searchEBI;
