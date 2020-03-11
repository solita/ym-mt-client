import { combineReducers } from 'redux';
import * as types from './types';
import produce from 'immer';

export const initialViewState = {
  list: []
};

const view = (state = initialViewState, action) => {
  switch (action.type) {
    case types.UPDATE_COMPANY_LIST:
      return produce(state, draft => {
        draft.list = action.companies;
      });

    case types.UPDATE_COMPANY:
      return produce(state, draft => {
        const company = action.company;
        const companyListIndex = state.list.findIndex(f => f.id === company.id);
        if (companyListIndex < 0) {
          draft.list = state.list.concat([company]);
        } else {
          let newList = Array.from(state.list);
          newList[companyListIndex] = company;
          draft.list = newList;
        }
      });

    default:
      return state;
  }
};

export const initialStatusState = {
  loadingCompanies: false
};

const status = (state = initialStatusState, action) => {
  switch (action.type) {
    case types.LOADING_COMPANIES:
      return produce(state, draft => {
        draft.loadingCompanies = action.status;
      });
    default:
      return state;
  }
};

const companyReducer = combineReducers({
  view,
  status
});

export default companyReducer;
