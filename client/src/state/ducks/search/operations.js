import { doDelete, getJsonData } from '../../../services/ApiService';
import * as API_ENDPOINTS from '../../../services/endpoints';
import { addToastNotification, ToastTypes } from '../../../services/ToastService';
import {
  addSavedSearch,
  addSearchTerm,
  deleteSearchTerm,
  handleGenericChange,
  removeSavedSearchFromList,
  setLoadingSavedSearches,
  setSearch,
  toggleSearchTerm,
  updateSavedSearchList
} from './actions';

const fetchSavedSearches = () => dispatch => {
  dispatch(setLoadingSavedSearches(true));
  getJsonData(API_ENDPOINTS.FETCH_SAVED_SEARCHES)
    .then(result => dispatch(updateSavedSearchList(result)))
    .catch(error => console.log(error))
    .finally(() => {
      dispatch(setLoadingSavedSearches(false));
    });
};

const removeSavedSearch = (
  savedSearchId = null,
  successNotification,
  failureNotification
) => dispatch => {
  const url = API_ENDPOINTS.REMOVE_SAVED_SEARCH + savedSearchId;
  doDelete(url)
    .then(res => {
      dispatch(removeSavedSearchFromList(savedSearchId));

      addToastNotification(successNotification, ToastTypes.SUCCESS);
    })
    .catch(err => {
      addToastNotification(failureNotification, ToastTypes.WARNING);
    })
    .finally(() => {});
};

export {
  addSearchTerm,
  deleteSearchTerm,
  toggleSearchTerm,
  handleGenericChange,
  fetchSavedSearches,
  addSavedSearch,
  setSearch,
  removeSavedSearch
};
