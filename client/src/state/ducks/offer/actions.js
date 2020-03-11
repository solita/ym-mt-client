import * as types from './types';

export const handleOfferFormChange = (key, value) => ({
  type: types.HANDLE_OFFER_FORM_CHANGE,
  key,
  value
});

export const clearOfferForm = () => ({ type: types.CLEAR_OFFER_FORM });

export const addSubService = service => ({ type: types.ADD_SUBSERVICE, service });

export const deleteSubService = service => ({ type: types.DELETE_SUBSERVICE, service });

export const deleteAllSubServices = () => ({ type: types.DELETE_ALL_SUBSERVICES });

export const addFiles = attachments => ({ type: types.ADD_FILES, attachments });

export const deleteFile = fileId => ({ type: types.DELETE_FILE, fileId });

export const addOfferToView = offer => ({ type: types.OFFER_VIEW, payload: offer });

export const clearOfferView = () => ({ type: types.CLEAR_OFFER_VIEW });

export const setLoadingOffer = status => ({ type: types.LOADING_OFFER, status });

export const offerNotFound = status => ({ type: types.OFFER_NOT_FOUND, status });

export const handleViewFormChange = (key, value) => ({
  type: types.HANDLE_VIEW_FORM_CHANGE,
  key,
  value
});

export const setOfferHasChanges = status => ({ type: types.OFFER_FORM_HAS_CHANGES, status });
