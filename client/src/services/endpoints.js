/* RFO */
export const FETCH_RFOS = '/api/rfo';
export const FETCH_ALL_RFOS = '/api/rfo?pageSize=25';
export const FETCH_RFO_CACHED = '/api/rfoc';
export const FETCH_RFOS_TO_MAP = '/api/rfo/map';
export const FETCH_SAVED_SEARCHES = '/api/rfo/savesearch';
export const SAVE_SEARCH = '/api/rfo/savesearch';
export const REMOVE_SAVED_SEARCH = '/api/rfo/savesearch/';
export const FETCH_RFO_SUMMARY = '/api/rfosummary';

/* Event */
export const FETCH_ALL_EVENTS = `/api/company/events?eventForBusinessIds={0}&pageSize=25`;
export const FETCH_NEW_EVENTS = `/api/company/events?eventForBusinessIds={0}&pageSize=5`;

/* Configurations */
export const FETCH_CONFIGURATIONS = '/api/configurations';

/* Company */
export const FETCH_COMPANIES = '/api/company';
export const SAVE_COMPANY_DETAILS = '/api/company/details';

/* Offer */
export const FETCH_OFFER = '/api/offer';
export const ACCEPT_DECLINE_OFFER = '/api/offer';
export const CREATE_OFFER = '/api/rfo/{0}/offer';

/* Error */
export const CLIENT_ERROR = '/api/clienterror';

/* TSV */
export const FETCH_TSV_NEEDED_DATA_FOR_RFO = '/api/rfo_tsv/{0}';
export const SUBMIT_TSV_REQUEST = '/api/tsv';
export const FETCH_TSV_REQUEST = '/api/tsv/id/{0}';
export const CANCEL_TSV_REQUEST = '/api/tsv/id/{0}/cancel';
export const REJECT_TSV_REQUEST = '/api/tsv/id/{0}/reject';
export const REJECT_TSV_CONTRACT = '/api/tsv/contract/{0}/reject';
export const ACCEPT_TSV_CONTRACT = '/api/tsv/contract/{0}/finalize';
export const FETCH_FACILITIES = '/api/tsv/facilities';
export const FETCH_TSV_CONTRACT_SUMMARY = '/api/tsvcontractsummary';
export const FETCH_TSV_REQUESTS = '/api/tsv';
export const FETCH_CONTRACTS = '/api/tsv/facility/contract';
export const FETCH_CONTRACT = '/api/tsv/contract';

/* Waste batches */
export const WASTE_BATCH = '/api/wastebatch';

/* Other */
export const FETCH_BASIC_STATS = 'api/stats/basic';
export const POST_TSV_CONTRACT = '/api/tsv/contract/';
