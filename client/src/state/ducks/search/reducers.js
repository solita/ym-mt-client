import * as types from './types';
import produce from 'immer';
import { without } from 'ramda';

export const initialState = {
  text: '',
  location: [],
  rfoType: [],
  service: [],
  classification: [],
  savedSearches: [],
  loadingSavedSearches: false,
  savedSearchesFetched: false
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_SEARCH_TERM: {
      const { term, value } = action;

      return produce(state, draft => {
        draft[term] = draft[term].concat([value]);
      });
    }

    case types.DELETE_SEARCH_TERM: {
      const { term, value } = action;

      return produce(state, draft => {
        draft[term] = without([value], draft[term]);
      });
    }

    case types.TOGGLE_SEARCH_TERM: {
      const { term, value } = action;

      return produce(state, draft => {
        if (state[term].indexOf(value) > -1) {
          draft[term] = without([value], state[term]);
        } else {
          draft[term] = state[term].concat([value]);
        }
      });
    }

    case types.HANDLE_GENERIC_CHANGE: {
      const { key, value } = action;
      return produce(state, draft => {
        draft[key] = value;
        return draft;
      });
    }

    case types.UPDATE_SAVED_SEARCH_LIST: {
      const { savedSearches } = action;
      return produce(state, draft => {
        draft.savedSearches = savedSearches;
        draft.savedSearchesFetched = true;
        return draft;
      });
    }

    case types.SET_LOADING_SAVED_SEARCHES: {
      const { status } = action;
      return produce(state, draft => {
        draft.loadingSavedSearches = status;
        return draft;
      });
    }

    case types.REMOVE_SAVED_SEARCH_FROM_LIST: {
      const { savedSearchId } = action;
      return produce(state, draft => {
        draft.savedSearches = state.savedSearches.filter(ss => ss.id !== savedSearchId);
        return draft;
      });
    }

    case types.ADD_SAVED_SEARCH_TO_LIST: {
      const { savedSearch } = action;
      return produce(state, draft => {
        draft.savedSearches = state.savedSearches.concat([savedSearch]);
        return draft;
      });
    }

    case types.SET_SEARCH: {
      const { searchState } = action;
      return produce(state, draft => {
        draft.text = searchState.text || '';
        draft.location = searchState.location || [];
        draft.rfoType = searchState.rfoType || [];
        draft.service = searchState.service || [];
        draft.classification = searchState.classification || [];
        return draft;
      });
    }

    case types.UPDATE_CONTINUATION_TOKEN: {
      const { continuationToken } = action;
      return produce(state, draft => {
        draft.continuationToken = continuationToken || '';
        return draft;
      });
    }

    default:
      return state;
  }
};

export default search;
