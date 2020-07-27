import { SearchResponse } from '../types/ebeyeResponse';

type SearchParams = {
  query: string;
  division?: string | null;
  page?: number;
  perPage?: number;
};

const searchEBI = async (params: SearchParams) => {
  const nonVertebratesResults = await searchNonVertebrates(params);

  return {
    query: params.query,
    nonVertebrates: nonVertebratesResults
  };
};

// DEPRECATION: we aren't going to search vertebrates from ensemblgenomes site
// const searchVertebrates = async (query: string, page: number) => {
//   const url = buildSearchUrl('ensembl_gene', query, page);
//   return await runSearch(url);
// };

const searchNonVertebrates = async (params: SearchParams) => {
  const url = buildSearchUrl(Object.assign({}, params, { domain: 'ensemblGenomes_gene' }));
  return await runSearch(url);
};

const runSearch = async (url: string): Promise<SearchResponse> => {
  return await fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => response.json());
}

const buildSearchUrl = (params: SearchParams & { domain: string }) => {
  const { domain, page = 1, perPage = 10 } = params;
  const query = buildQuery(params.query, params.division);
  const start = calculateOffset(page, perPage);
  const queryParams = `query=${query}&fields=${getGeneFields()}&start=${start}&size=${perPage}`;
  return `https://www.ebi.ac.uk/ebisearch/ws/rest/${domain}?${queryParams}`;
}

const buildQuery = (query: string, division?: string |null) => {
  if (!division) {
    return query;
  } else {
    return `${query} AND genomic_unit:${division}`;
  }
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
