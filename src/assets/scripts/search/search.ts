import { SearchResponse } from '../types/ebeyeResponse';

const searchEBI = async (query: string, page: number) => {
  const [vertebratesResults, nonVertebratesResults] = await Promise.all([
    searchVertebrates(query, page),
    searchNonVertebrates(query, page)
  ]);

  return {
    query,
    vertebrates: vertebratesResults,
    nonVertebrates: nonVertebratesResults
  };
};

const searchVertebrates = async (query: string, page: number) => {
  const url = buildSearchUrl('ensembl_gene', query, page);
  return await runSearch(url);
};

const searchNonVertebrates = async (query: string, page: number) => {
  const url = buildSearchUrl('ensemblGenomes_gene', query, page);
  return await runSearch(url);
};

const runSearch = async (url: string): Promise<SearchResponse> => {
  return await fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => response.json());
}

// size=%s&start=%s
const buildSearchUrl = (domain: string, query: string, page: number = 1, perPage: number = 10) => {
  const start = calculateOffset(page, perPage);
  const queryParams = `query=${query}&fields=${getGeneFields()}&start=${start}&size=${perPage}`;
  return `https://www.ebi.ac.uk/ebisearch/ws/rest/${domain}?${queryParams}`;
}

const calculateOffset = (page: number, perPage: number) =>
  (page - 1) * perPage;

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
