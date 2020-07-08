import searchEBI from '../search/search';
import getExactIdMatch from '../search/getExactIdMatch';

const handleIdLookup = async (query) => {
  const searchResults = await searchEBI(query);
  const exactMatch = getExactIdMatch(searchResults);

  console.log('exactMatch', exactMatch);
  return;
  if (exactMatch) {
    redirectTo(exactMatch);
  }
};

const redirectTo = (match) => {
  let url;
  if (match.type === 'gene') {
    url = buildGeneUrl(match);
  } else if (match.type === 'transcript') {
    url = buildTranscriptUrl(match);
  } else if (match.type === 'protein') {
    url = buildProteinUrl(match);
  }

  if (url) {
    window.location = url;
  }
};

const buildGeneUrl = (match) => {
  const location = getLocation(match);
  const locationParam = location ? `;r=${location}` : '';
  const pathname = `/Gene/Summary?db=core;g=${match.id}${locationParam}`;
  return `${getHost(match)}${pathname}`;
};

const buildTranscriptUrl = (match) => {
  const speciesScientificName = match.data.fields.system_name;
  const geneId = match.data.fields.id;
  const transcriptId = match.id;
  const host = getHost(match);
  const location = getLocation(match);
  const locationParam = location ? `;r=${location}` : '';
  const pathname = `/${speciesScientificName}/Transcript/Summary?db=core;g=${geneId};t=${transcriptId}${locationParam}`;
  return `${host}${pathname}`;
};

//  http://bacteria.ensembl.org/homo_sapiens/Transcript/ProteinSummary_CCE57584?db=core;g=HUS2011_pI0088;protein=CCE57584

const buildProteinUrl = (match) => {
  const division = getDivision(match);
  const speciesScientificName = match.data.fields.system_name;
  const geneId = match.data.fields.id;
  const transcriptId = match.id; // FIXME!!!
  const host = getHost(match);
  const location = getLocation(match);
  const locationParam = location ? `;r=${location}` : '';
  const proteinSummary = division === 'bacteria' ? `ProteinSummary_${match.id}` : 'ProteinSummary';
  const pathname = `/${speciesScientificName}/Transcript/${proteinSummary}?db=core;g=${geneId};t=${transcriptId}${locationParam}`;
  return `${host}${pathname}`;
  // /Transcript/ProteinSummary?db=core;g=%s%s;t=%s
};

const getHost = (match) => {
  return `https://${getSubdomain(match)}.ensembl.org`;
};

const getSubdomain = (match) => {
  const division = getDivision(match);
  return division === 'vertebrates' ? 'www' : division;
};

const getDivision = (match) => {
  return match.data.fields.genomic_unit[0];
};

const getLocation = (match) => {
  return match.data.fields.location.pop();
}

export default handleIdLookup;
