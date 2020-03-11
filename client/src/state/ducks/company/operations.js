import { updateCompanyList, setLoadingCompanies, updateCompany } from './actions';
import * as API_ENDPOINTS from '../../../services/endpoints';
import qs from 'qs';
import { getJsonData } from '../../../services/ApiService';

const fetchCompanies = (queryParams = {}) => dispatch => {
  dispatch(setLoadingCompanies(true));
  const config = {
    params: queryParams,
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' })
  };

  getJsonData(API_ENDPOINTS.FETCH_COMPANIES, config)
    .then(result => dispatch(updateCompanyList(result)))
    .catch(error => console.log(error))
    .finally(() => {
      dispatch(setLoadingCompanies(false));
    });
};

export { updateCompanyList, setLoadingCompanies, fetchCompanies, updateCompany };
