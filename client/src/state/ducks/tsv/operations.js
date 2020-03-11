import {
  handleTsvFormChange,
  clearTsvForm,
  addRfoToTsv,
  populateFacilities,
  setLoadingTsv,
  addTsvNeededDataToTsv,
  clearTsvGeneral,
  setTsvHasChanges,
  addTsvRequestToRequestView,
  handleTsvViewFormChange,
  clearTsvView
} from './actions';
import * as API_ENDPOINTS from '../../../services/endpoints';
import { replace } from 'ramda';
import { getJsonData } from '../../../services/ApiService';

const clearTsv = () => dispatch => {
  dispatch(clearTsvForm());
  dispatch(clearTsvGeneral());
  dispatch(setTsvHasChanges(false));
};

const fetchTsvNeededData = rfoId => dispatch => {
  const fetchUrl = replace('{0}', rfoId, API_ENDPOINTS.FETCH_TSV_NEEDED_DATA_FOR_RFO);

  getJsonData(fetchUrl)
    .then(data => dispatch(addTsvNeededDataToTsv(data)))
    .catch(error => {
      console.log(error);
    });
};

const fetchTsvToView = id => dispatch => {
  dispatch(setLoadingTsv(true));
  const fetchUrl = replace('{0}', id, API_ENDPOINTS.FETCH_TSV_REQUEST);
  getJsonData(fetchUrl)
    .then(data => {
      dispatch(addRfoToTsv(data));
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => dispatch(setLoadingTsv(false)));
};

const fetchTsvRequest = tsvId => dispatch => {
  dispatch(setLoadingTsv(true));
  const fetchUrl = replace('{0}', tsvId, API_ENDPOINTS.FETCH_TSV_REQUEST);

  getJsonData(fetchUrl)
    .then(data => dispatch(addTsvRequestToRequestView(data)))
    .catch(error => {
      console.log(error);
    })
    .finally(() => dispatch(setLoadingTsv(false)));
};

export {
  handleTsvFormChange,
  fetchTsvNeededData,
  clearTsvForm,
  addRfoToTsv,
  clearTsv,
  populateFacilities,
  fetchTsvToView,
  addTsvNeededDataToTsv,
  clearTsvGeneral,
  setTsvHasChanges,
  addTsvRequestToRequestView,
  fetchTsvRequest,
  handleTsvViewFormChange,
  clearTsvView
};
