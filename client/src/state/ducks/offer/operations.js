import {
  handleOfferFormChange,
  clearOfferForm,
  addSubService,
  deleteSubService,
  deleteAllSubServices,
  addFiles,
  deleteFile,
  addOfferToView,
  clearOfferView,
  setLoadingOffer,
  offerNotFound,
  handleViewFormChange,
  setOfferHasChanges
} from './actions';
import * as API_ENDPOINTS from '../../../services/endpoints';
import { getJsonData } from '../../../services/ApiService';

const fetchOfferToView = id => dispatch => {
  dispatch(setLoadingOffer(true));
  const fetchUrl = API_ENDPOINTS.FETCH_OFFER + '/' + id;

  getJsonData(fetchUrl)
    .then(data => dispatch(addOfferToView(data)))
    .catch(error => {
      const { response } = error;

      if (response && response.status === 404) {
        dispatch(offerNotFound(true));
      }

      console.log(error);
    })
    .finally(() => dispatch(setLoadingOffer(false)));
};

export {
  handleOfferFormChange,
  clearOfferForm,
  addSubService,
  deleteSubService,
  deleteAllSubServices,
  addFiles,
  deleteFile,
  addOfferToView,
  clearOfferView,
  fetchOfferToView,
  setLoadingOffer,
  offerNotFound,
  handleViewFormChange,
  setOfferHasChanges
};
