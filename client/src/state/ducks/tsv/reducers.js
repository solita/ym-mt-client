import { combineReducers } from 'redux';
import * as types from './types';
import produce from 'immer';

/* State Shape
{
    form: {
    },
    general: {
    },
    requestView: {
      form: {}
    }
    status: {
      formHasChanges: false
    }
}
*/

const initialFormState = {};

const form = (state = initialFormState, action) => {
  switch (action.type) {
    case types.ADD_CONTRACT_TO_VIEW:
      return produce(state, draft => {
        draft.contract_draft = action.contract;
        return draft;
      });

    case types.HANDLE_TSV_FORM_CHANGE:
      const { key, value } = action;

      return produce(state, draft => {
        draft[key] = value;
        return draft;
      });

    case types.ADD_CONTRACT_DRAFT:
      return produce(state, draft => {
        draft.contract_draft = {
          tsvId: action.tsvId,
          ContractName: '',
          ContractNumber: '',
          ContractReference: '',
          WasteDescription: '',
          ServiceCode: '',
          ServicePriceEurPerTonne: '',
          ServiceStartDate: '',
          ServiceEndDate: '',
          ServiceDescription: '',
          ContractEndDate: '',
          ContractTerms: '',
          ContractWasImported: action.isImport,
          Attachments: []
        };
        return draft;
      });

    case types.ADD_FILES:
      return produce(state, draft => {
        if (draft.contract_draft.Attachments) {
          draft.contract_draft.Attachments = state.contract_draft.Attachments.concat(
            action.attachments
          );
        } else {
          draft.contract_draft.Attachments = action.attachments;
        }
        return draft;
      });

    case types.DELETE_FILE:
      return produce(state, draft => {
        draft.contract_draft.Attachments = state.contract_draft.Attachments.filter(
          item => item.id !== action.fileId
        );
        return draft;
      });

    case types.HANDLE_CONTRACT_CHANGE:
      const contract_key = action.key;
      const contract_value = action.value;
      return produce(state, draft => {
        draft.contract_draft[contract_key] = contract_value;
        return draft;
      });

    case types.CLEAR_TSV_FORM:
      return initialFormState;

    default:
      return state;
  }
};

const initialGeneralState = {};

const general = (state = initialGeneralState, action) => {
  switch (action.type) {
    case types.TSV_POPULATE_FACILITIES:
      return produce(state, draft => {
        draft.facilities = action.payload;
        return draft;
      });

    case types.ADD_TSV_NEEDED_DATA_TO_TSV:
      return produce(state, draft => {
        draft.data = action.payload;
        return draft;
      });

    case types.CLEAR_TSV_GENERAL:
      return initialGeneralState;

    case types.LOADING_TSV:
      return produce(state, draft => {
        draft.loadingTsv = action.status;
        return draft;
      });

    case types.FETCH_CONTRACTS:
      return produce(state, draft => {
        if (draft.contracts && action.loadingMore) {
          draft.contracts = state.contracts.concat(action.contracts);
        } else {
          draft.contracts = action.contracts;
        }
        draft.contracts_continuationtoken = action.continuationToken;
        return draft;
      });

    default:
      return state;
  }
};

const initialrequestViewState = {
  form: {}
};

const requestView = (state = initialrequestViewState, action) => {
  switch (action.type) {
    case types.ADD_RFO_TO_TSV:
      return produce(state, draft => {
        draft.payload = action.payload;
        return draft;
      });
    case types.ADD_TSV_REQUEST_TO_REQUEST_VIEW:
      return produce(state, draft => {
        draft.payload = action.payload;
        return draft;
      });

    case types.HANDLE_TSV_VIEW_FORM_CHANGE:
      const { key, value } = action;
      return produce(state, draft => {
        draft.form[key] = value;
        return draft;
      });

    case types.CLEAR_TSV_VIEW:
      return initialrequestViewState;

    default:
      return state;
  }
};

const initialStatusState = {
  formHasChanges: false
};

const status = (state = initialStatusState, action) => {
  switch (action.type) {
    case types.TSV_FORM_HAS_CHANGES:
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
  general,
  requestView,
  status
});

export default offerReducer;
