import {
  detectTouch,
  addConfigurations,
  setLoadingConfigurations,
  addNotification,
  deleteNotification
} from './actions';
import * as API_ENDPOINTS from '../../../services/endpoints';
import { getJsonData } from '../../../services/ApiService';
import { assoc } from 'ramda';
import { uuid } from '../../../utils/common-utils';

const fetchConfigurations = () => dispatch => {
  dispatch(setLoadingConfigurations(true));

  getJsonData(API_ENDPOINTS.FETCH_CONFIGURATIONS)
    .then(result => {
      dispatch(addConfigurations(result));
    })
    .catch(error => console.log(error))
    .finally(() => {
      dispatch(setLoadingConfigurations(false));
    });
};

const addWarning = notification => dispatch => {
  const idForNotification = uuid();
  const notificationWithLevel = assoc('level', 'WARNING', notification);
  const notificationWithId = assoc('id', idForNotification, notificationWithLevel);
  dispatch(addNotification(notificationWithId));

  setTimeout(() => {
    dispatch(deleteNotification(idForNotification));
  }, 5000);
};

const addSuccess = notification => dispatch => {
  const idForNotification = uuid();
  const notificationWithLevel = assoc('level', 'SUCCESS', notification);
  const notificationWithId = assoc('id', idForNotification, notificationWithLevel);
  dispatch(addNotification(notificationWithId));

  setTimeout(() => {
    dispatch(deleteNotification(idForNotification));
  }, 5000);
};

export { detectTouch, fetchConfigurations, addWarning, addSuccess };
