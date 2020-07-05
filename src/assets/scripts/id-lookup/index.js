import handleIdLookup from './handleIdLookup';

const idRegex = /\/id\/([^\/]*)/; // match everything after "/id/" that is not a slash

const id = window.location.pathname.match(idRegex)[1];

handleIdLookup(id);
