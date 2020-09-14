import { handleGenetreeIdLookup } from './genetreeLookup';

const idRegex = /\/id-genetree\/([^\/]*)/; // match everything after "/id-genetree/" that is not a slash

const id = (window.location.pathname.match(idRegex) as RegExpMatchArray)[1];

handleGenetreeIdLookup(id);
