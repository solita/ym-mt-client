import { generalOperations } from '../state/ducks/general';
import * as ToastTypes from './ToastTypes';

let ToastStore = undefined;

export const initToastService = store => {
  ToastStore = store;
};

export const addToastNotification = (text, level) => {
  if (ToastStore) {
    if (level === ToastTypes.SUCCESS) {
      ToastStore.dispatch(generalOperations.addSuccess({ content: text }));
    }
    if (level === ToastTypes.WARNING) {
      ToastStore.dispatch(generalOperations.addWarning({ content: text }));
    }
  }
};

export { ToastTypes };
