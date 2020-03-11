import {
  handleRfoFormChange,
  handleMaterialFormChange,
  clearRfoForm,
  addMaterial,
  deleteMaterial,
  addRfoToView,
  addRfoToEditView,
  clearRfoView,
  addFiles,
  deleteFile,
  deleteFiles,
  addRegion,
  toggleRegion,
  deleteRegion,
  addSubService,
  deleteSubService,
  deleteAllSubServices,
  setLoadingRfo,
  setLoadingRfos,
  setLoadingMapRfos,
  setRfoNotFound,
  updateRfoList,
  appendRfoList,
  updateMapRfoList,
  setRfoHasChanges
} from './actions';
import { updateContinuationToken } from '../search/actions';
import { getRaw } from '../../../services/ApiService';
import * as API_ENDPOINTS from '../../../services/endpoints';
import qs from 'qs';
import { getJsonData } from '../../../services/ApiService';

const fetchRfos = (queryParams = {}, append = false) => dispatch => {
  dispatch(setLoadingRfos(true));
  if (append === false) {
    dispatch(setLoadingMapRfos(true));
  }
  const config = {
    params: queryParams,
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' })
  };

  getRaw(API_ENDPOINTS.FETCH_RFOS, config)
    .then(result => {
      dispatch(append ? appendRfoList(result.data) : updateRfoList(result.data));
      dispatch(updateContinuationToken(result.headers['tietoalusta-continuation-token']));
    })
    .catch(error => console.log(error))
    .finally(() => {
      dispatch(setLoadingRfos(false));
    });
  if (append === false) {
    getJsonData(API_ENDPOINTS.FETCH_RFOS_TO_MAP, config)
      .then(result => dispatch(updateMapRfoList(result)))
      .catch(error => console.log(error))
      .finally(() => {
        dispatch(setLoadingMapRfos(false));
      });
  }
};

const fetchRfoForEdit = (id, regions) => dispatch => {
  dispatch(setLoadingRfo(true));
  const fetchUrl = API_ENDPOINTS.FETCH_RFOS + '/' + id;

  getJsonData(fetchUrl)
    .then(data => dispatch(addRfoToEditView(data, regions)))
    .catch(error => {
      const { response } = error;

      if (response && response.status === 404) {
        dispatch(setRfoNotFound(true));
      }

      console.log(error);
    })
    .finally(() => dispatch(setLoadingRfo(false)));
};

const fetchRfoToView = id => dispatch => {
  dispatch(setLoadingRfo(true));
  const fetchUrl = API_ENDPOINTS.FETCH_RFOS + '/' + id;

  getJsonData(fetchUrl)
    .then(data => dispatch(addRfoToView(data)))
    .catch(error => {
      const { response } = error;

      if (response && response.status === 404) {
        dispatch(setRfoNotFound(true));
      }

      console.log(error);
    })
    .finally(() => dispatch(setLoadingRfo(false)));
};

export {
  handleRfoFormChange,
  handleMaterialFormChange,
  clearRfoForm,
  addMaterial,
  deleteMaterial,
  addRfoToView,
  clearRfoView,
  addFiles,
  deleteFile,
  deleteFiles,
  addRegion,
  toggleRegion,
  deleteRegion,
  addSubService,
  deleteAllSubServices,
  deleteSubService,
  setLoadingRfo,
  setLoadingRfos,
  setRfoNotFound,
  updateRfoList,
  updateMapRfoList,
  fetchRfos,
  fetchRfoToView,
  fetchRfoForEdit,
  setRfoHasChanges
};
