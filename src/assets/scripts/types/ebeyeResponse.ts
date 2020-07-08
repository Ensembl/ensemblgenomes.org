export type SearchEntry = {
  id: string;
  source: string;
  fields: {
    id: string[];
    description: string[];
    domain_source: string[];
    genomic_unit: string[];
    peptide: string[];
    species: string[]; // species display name (common or scientific)
    system_name: string[]; // species as used in Ensembl urls
    transcript: string[];
    location: string[];
  }
};

export type SearchResponse = {
  hitCount: number;
  entries: SearchEntry[];
};
