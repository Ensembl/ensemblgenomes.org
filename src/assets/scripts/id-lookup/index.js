import handleIdLookup from './handleIdLookup';

const id = new URLSearchParams(window.location.search).get('id');

id && handleIdLookup(id);
