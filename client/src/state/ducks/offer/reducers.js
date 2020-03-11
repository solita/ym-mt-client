import { combineReducers } from 'redux';
import * as types from './types';
import produce from 'immer';

/* State Shape
{
    form: {
      subService: []
    },
    view: {
      form: {}
    },
    status: {      
      loadingOffer: false,
      offerNotFound: false,
      formHasChanges: false
    }
}
*/

const initialFormState = {
  attachments: [],
  subService: []
};

const form = (state = initialFormState, action) => {
  switch (action.type) {
    case types.HANDLE_OFFER_FORM_CHANGE:
      const { key, value } = action;

      return produce(state, draft => {
        draft[key] = value;
        return draft;
      });

    case types.CLEAR_OFFER_FORM:
      return initialFormState;

    case types.ADD_SUBSERVICE:
      const { service } = action;
      return produce(state, draft => {
        draft.subService = state.subService.includes(service.id)
          ? state.subService.filter(s => s !== service.id)
          : state.subService.concat([service.id]);
        return draft;
      });

    case types.DELETE_SUBSERVICE: {
      const { service } = action;
      return produce(state, draft => {
        draft.subService = state.subService.filter(s => s !== service.id);
        return draft;
      });
    }

    case types.DELETE_ALL_SUBSERVICES:
      return produce(state, draft => {
        draft.subService = [];
        return draft;
      });

    case types.ADD_FILES:
      const { attachments } = action;

      return produce(state, draft => {
        draft.attachments = state.attachments.concat(attachments);
        return draft;
      });

    case types.DELETE_FILE:
      const { fileId } = action;

      return produce(state, draft => {
        draft.attachments = state.attachments.filter(attachment => attachment.id !== fileId);
        return draft;
      });

    default:
      return state;
  }
};

const initialViewState = { form: {} };

const view = (state = initialViewState, action) => {
  switch (action.type) {
    case types.OFFER_VIEW:
      return produce(state, draft => {
        const { payload } = action;
        draft.payload = payload;
        return draft;
      });

    case types.CLEAR_OFFER_VIEW:
      return initialViewState;

    case types.HANDLE_VIEW_FORM_CHANGE:
      const { key, value } = action;
      return produce(state, draft => {
        draft.form[key] = value;
        return draft;
      });

    default:
      return state;
  }
};

const initialStatusState = {
  loadingOffer: false,
  offerNotFound: false,
  formHasChanges: false
};

const status = (state = initialStatusState, action) => {
  switch (action.type) {
    case types.LOADING_OFFER:
      return produce(state, draft => {
        draft.loadingOffer = action.status;
        return draft;
      });

    case types.OFFER_NOT_FOUND:
      return produce(state, draft => {
        draft.offerNotFound = action.status;
        return draft;
      });

    case types.OFFER_FORM_HAS_CHANGES:
      return produce(state, draft => {
        draft.formHasChanges = action.status;
        return draft;
      });

    default:
      return state;
  }
};

const offerReducer = combineReducers({
  form,
  view,
  status
});

export default offerReducer;
