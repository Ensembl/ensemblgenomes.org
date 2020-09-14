import { showRedirectMessage } from '../id-lookup/handleIdLookup';

type Subdomain =
  | 'www'
  | 'bacteria'
  | 'fungi'
  | 'metazoa'
  | 'plants'
  | 'protists'


export const handleGenetreeIdLookup = (genetreeId: string) => {
  showRedirectMessage();
  redirectToEnsemblSite(genetreeId);
};

const redirectToEnsemblSite = (genetreeId: string) => {
  window.location.href = buildRedirectUrl(genetreeId);
}

const buildRedirectUrl = (genetreeId: string) => {
  const subdomain = determineSubdomain(genetreeId);
  return `https://${subdomain}.ensembl.org/Multi/GeneTree/Image?gt=${genetreeId}`;
};

/**
 * The code below replicates the old behaviour of ensemblgenomes.org
 * (when it was still a Drupal-powered site)
 * 
 * In it the id of a gene tree is mapped to appropriate division site
 * by checking the first symbols of the id.
 * 
 * We expect to have a better solution in the future.
 */

const determineSubdomain = (genetreeId: string): Subdomain => {
  if (genetreeId.startsWith('EGGT') || genetreeId.startsWith('EMGT')) {
    return 'metazoa';
  } else if (genetreeId.startsWith('EBGT')) {
    return 'bacteria';
  } else if (genetreeId.startsWith('EPGT')) {
    return 'plants';
  } else if (genetreeId.startsWith('EPrGT')) {
    return 'protists';
  } else if (
    genetreeId.startsWith('EFGT') ||
    genetreeId.startsWith('Node_') ||
    genetreeId.startsWith('ENSGT009300000')
  ) {
    return 'fungi';
  } else {
    return 'www';
  }
};
