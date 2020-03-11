import axios from 'axios';
import { userManager, getUser } from './AuthService';
import { lensPath, set } from 'ramda';

const authHeaderLens = lensPath(['headers', 'Authorization']);

const configWithAuthHeaders = (config, access_token) =>
  set(authHeaderLens, `Bearer ${access_token}`)(config);

const requestOnSuccess = config =>
  getUser(userManager)
    .then(user => {
      if (user) {
        const { access_token } = user;
        const configWithAuth = configWithAuthHeaders(config, access_token);
        return configWithAuth;
      }
      return config;
    })
    .catch(err => {
      console.log(err);
    });

const requestOnError = error => {
  return Promise.reject(error);
};

axios.interceptors.request.use(requestOnSuccess, requestOnError);

const getRaw = (url, config = {}) => {
  return axios.get(url, config);
};

const getJsonData = (url, config = {}) => getRaw(url, config).then(result => result.data);

const postJson = (url, payload) => axios.post(url, payload);

const doDelete = url => axios.delete(url);

const putJson = (url, payload) => axios.put(url, payload);

const createCancelToken = () => {
  const CancelToken = axios.CancelToken;
  return CancelToken.source();
};

// const getWithCancelToken = () => {
//   // @TODO: Implementation
// }

// const postWithCancelToken = () => {
//   // @TODO: Implementation
// }

// const getAuthenticated = (url, token) => {
//   // @TODO: Implementation
// };

export {
  getRaw,
  getJsonData,
  postJson,
  configWithAuthHeaders,
  doDelete,
  putJson,
  createCancelToken
};
