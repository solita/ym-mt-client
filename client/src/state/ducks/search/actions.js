import * as types from './types';

export const addSearchTerm = (term, value) => ({ type: types.ADD_SEARCH_TERM, term, value });
export const deleteSearchTerm = (term, value) => ({ type: types.DELETE_SEARCH_TERM, term, value });
export const toggleSearchTerm = (term, value) => ({ type: types.TOGGLE_SEARCH_TERM, term, value });
export const handleGenericChange = (key, value) => ({
  type: types.HANDLE_GENERIC_CHANGE,
  key,
  value
});
export const setSearch = searchState => ({ type: types.SET_SEARCH, searchState });
export const setLoadingSavedSearches = status => ({
  type: types.SET_LOADING_SAVED_SEARCHES,
  status
});
export const removeSavedSearchFromList = savedSearchId => ({
  type: types.REMOVE_SAVED_SEARCH_FROM_LIST,
  savedSearchId
});
export const addSavedSearch = savedSearch => ({
  type: types.ADD_SAVED_SEARCH_TO_LIST,
  savedSearch
});
export const updateSavedSearchList = savedSearches => ({
  type: types.UPDATE_SAVED_SEARCH_LIST,
  savedSearches
});

export const updateContinuationToken = continuationToken => ({
  type: types.UPDATE_CONTINUATION_TOKEN,
  continuationToken
});
