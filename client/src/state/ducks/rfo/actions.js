import * as types from './types';

export const handleRfoFormChange = (key, value) => ({
  type: types.HANDLE_RFO_FORM_CHANGE,
  key,
  value
});

export const handleMaterialFormChange = (index, materialKey, materialValue) => ({
  type: types.HANDLE_MATERIAL_FORM_CHANGE,
  index,
  materialKey,
  materialValue
});

export const clearRfoForm = () => ({ type: types.CLEAR_RFO_FORM });

export const addMaterial = () => ({ type: types.ADD_MATERIAL }); // Add empty material

export const deleteMaterial = index => ({
  type: types.DELETE_MATERIAL,
  index
});

export const addRfoToView = rfo => ({ type: types.RFO_VIEW, payload: rfo });

export const addRfoToEditView = ({ payload }, regions) => ({
  type: types.RFO_EDIT_VIEW,
  payload,
  regions
});

export const clearRfoView = () => ({ type: types.CLEAR_RFO_VIEW });

export const addFiles = attachments => ({ type: types.ADD_FILES, attachments });

export const deleteFile = fileId => ({ type: types.DELETE_FILE, fileId });

export const deleteFiles = () => ({ type: types.DELETE_FILES });

export const addRegion = region => ({ type: types.ADD_REGION, region });

export const toggleRegion = region => ({ type: types.TOGGLE_REGION, region });

export const deleteRegion = region => ({ type: types.DELETE_REGION, region });

export const addSubService = service => ({ type: types.ADD_SUBSERVICE, service });

export const deleteSubService = service => ({ type: types.DELETE_SUBSERVICE, service });

export const deleteAllSubServices = () => ({ type: types.DELETE_ALL_SUBSERVICES });

export const setLoadingRfos = status => ({ type: types.LOADING_RFOS, status });

export const setLoadingMapRfos = status => ({ type: types.LOADING_MAP_RFOS, status });

export const setLoadingRfo = status => ({ type: types.LOADING_RFO, status });

export const setRfoNotFound = value => ({ type: types.RFO_NOT_FOUND, value });

export const updateRfoList = (rfos, continuationToken) => ({
  type: types.UPDATE_RFO_LIST,
  rfos: rfos
});

export const appendRfoList = (rfos, continuationToken) => ({
  type: types.APPEND_RFO_LIST,
  rfos: rfos
});

export const updateMapRfoList = mapList => ({ type: types.UPDATE_MAP_RFO_LIST, mapList: mapList });

export const setRfoHasChanges = status => ({ type: types.RFO_FORM_HAS_CHANGES, status });
