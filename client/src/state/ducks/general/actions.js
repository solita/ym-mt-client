import * as types from './types';

export const detectTouch = mobile => ({ type: types.DETECT_TOUCH, payload: mobile });
export const addConfigurations = regions => ({ type: types.ADD_CONFIGURATIONS, payload: regions });
export const setLoadingConfigurations = status => ({ type: types.LOADING_CONFIGURATIONS, status });
export const addNotification = notification => ({ type: types.ADD_NOTIFICATION, notification });
export const deleteNotification = id => ({ type: types.DELETE_NOTIFICATION, id });
