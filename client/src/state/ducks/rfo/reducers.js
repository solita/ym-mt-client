import { combineReducers } from 'redux';
import { without, indexOf } from 'ramda';
import * as types from './types';
import produce from 'immer';
import { mapRfoDataToForm } from '../../../components/RequestForOffer/rfo-utils';

const initialFormState = {
  materials: [],
  attachments: [],
  regions: [],
  subService: []
};

const form = (state = initialFormState, action) => {
  switch (action.type) {
    case types.HANDLE_RFO_FORM_CHANGE:
      const { key, value } = action;

      return produce(state, draft => {
        draft[key] = value;
        return draft;
      });

    case types.HANDLE_MATERIAL_FORM_CHANGE:
      const { index, materialKey, materialValue } = action;

      return produce(state, draft => {
        draft.materials[index][materialKey] = materialValue;
        return draft;
      });

    case types.CLEAR_RFO_FORM:
      return initialFormState;

    case types.ADD_MATERIAL:
      return produce(state, draft => {
        draft.materials = state.materials.concat({ useTsv: true });
        return draft;
      });

    case types.DELETE_MATERIAL:
      return produce(state, draft => {
        draft.materials.splice(action.index, 1);
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

    case types.DELETE_FILES:
      return produce(state, draft => {
        draft.attachments = [];
        return draft;
      });

    case types.ADD_REGION:
      const { region } = action;

      return produce(state, draft => {
        draft.regions = state.regions.concat(region);
        return draft;
      });

    case types.TOGGLE_REGION: {
      const { region } = action;

      return produce(state, draft => {
        if (indexOf(region)(state.regions) > -1) {
          draft.regions = without([region], state.regions);
        } else {
          draft.regions = draft.regions.concat([region]);
        }
        return draft;
      });
    }

    case types.DELETE_REGION: {
      const { region } = action;

      return produce(state, draft => {
        draft.regions = without([region], state.regions);
        return draft;
      });
    }

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

    case types.RFO_EDIT_VIEW:
      return produce(state, draft => {
        draft = mapRfoDataToForm(action.payload, action.regions);

        return draft;
      });

    default:
      return state;
  }
};

const initialViewState = {
  single: {},
  list: [],
  mapList: []
};

const view = (state = initialViewState, action) => {
  switch (action.type) {
    case types.RFO_VIEW:
      return produce(state, draft => {
        draft.single = action.payload;
      });

    case types.CLEAR_RFO_VIEW:
      return produce(state, draft => {
        draft.single = {};
      });

    case types.UPDATE_RFO_LIST:
      return produce(state, draft => {
        draft.list = action.rfos;
      });

    case types.APPEND_RFO_LIST:
      return produce(state, draft => {
        draft.list = draft.list.concat(action.rfos);
      });

    case types.UPDATE_MAP_RFO_LIST:
      return produce(state, draft => {
        draft.mapList = action.mapList;
      });

    default:
      return state;
  }
};

const initialStatusState = {
  loadingRfos: false,
  loadingRfo: false,
  rfoNotFound: false,
  loadingMapRfos: false,
  formHasChanges: false
};

const status = (state = initialStatusState, action) => {
  switch (action.type) {
    case types.LOADING_RFOS:
      return produce(state, draft => {
        draft.loadingRfos = action.status;
      });

    case types.LOADING_RFO:
      return produce(state, draft => {
        draft.loadingRfo = action.status;
      });

    case types.LOADING_MAP_RFOS:
      return produce(state, draft => {
        draft.loadingMapRfos = action.status;
      });

    case types.RFO_NOT_FOUND:
      return produce(state, draft => {
        draft.rfoNotFound = action.value;
      });

    case types.RFO_FORM_HAS_CHANGES:
      return produce(state, draft => {
        draft.formHasChanges = action.status;
      });

    default:
      return state;
  }
};

const rfoReducer = combineReducers({
  form,
  view,
  status
});

export default rfoReducer;
