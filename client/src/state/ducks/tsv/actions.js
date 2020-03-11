import * as types from './types';

export const handleTsvFormChange = (key, value) => ({
  type: types.HANDLE_TSV_FORM_CHANGE,
  key,
  value
});

export const clearTsvForm = () => ({ type: types.CLEAR_TSV_FORM });

export const addRfoToTsv = rfo => ({ type: types.ADD_RFO_TO_TSV, payload: rfo });

export const setLoadingTsv = status => ({ type: types.LOADING_TSV, status });

export const populateFacilities = fs => ({ type: types.TSV_POPULATE_FACILITIES, payload: fs });

export const clearRfoFromTsv = () => ({ type: types.CLEAR_RFO_FROM_TSV });

export const addTsvNeededDataToTsv = data => ({
  type: types.ADD_TSV_NEEDED_DATA_TO_TSV,
  payload: data
});

export const clearTsvGeneral = () => ({ type: types.CLEAR_TSV_GENERAL });

export const setTsvHasChanges = status => ({ type: types.TSV_FORM_HAS_CHANGES, status });

export const addContractDraft = (id, isImport) => ({
  type: types.ADD_CONTRACT_DRAFT,
  tsvId: id,
  isImport: isImport
});

export const handleContractChange = (key, value) => ({
  type: types.HANDLE_CONTRACT_CHANGE,
  key,
  value
});

export const addTsvRequestToRequestView = tsvRequest => ({
  type: types.ADD_TSV_REQUEST_TO_REQUEST_VIEW,
  payload: tsvRequest
});

export const handleTsvViewFormChange = (key, value) => ({
  type: types.HANDLE_TSV_VIEW_FORM_CHANGE,
  key,
  value
});

export const addFiles = attachments => ({ type: types.ADD_FILES, attachments });

export const deleteFile = fileId => ({ type: types.DELETE_FILE, fileId });

export const clearTsvView = () => ({ type: types.CLEAR_TSV_VIEW });
