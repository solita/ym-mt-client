import { combineReducers } from 'redux';
import * as types from './types';
import produce from 'immer';

const initialViewState = {
  single: {},
  list: [],
  continuationToken: ''
};

const view = (state = initialViewState, action) => {
  switch (action.type) {
    case types.UPDATE_EVENT_LIST:
      return produce(state, draft => {
        draft.list = action.events;
        draft.continuationToken = action.continuationToken;
      });
    case types.APPEND_EVENT_LIST:
      return produce(state, draft => {
        draft.list = state.list.concat(action.events);
        draft.continuationToken = action.continuationToken;
      })

    default:
      return state;
  }
};

const initialStatusState = {
  loadingEvents: false
};

const status = (state = initialStatusState, action) => {
  switch (action.type) {
    case types.LOADING_EVENTS:
      return produce(state, draft => {
        draft.loadingEvents = action.status;
      });

    default:
      return state;
  }
};

const eventReducer = combineReducers({
  view,
  status
});

export default eventReducer;
