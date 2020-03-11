import { updateEventList, appendEventList, setLoadingEvents } from './actions';

import * as API_ENDPOINTS from '../../../services/endpoints';
import { getRaw } from '../../../services/ApiService';
import { userSelectors } from '../../ducks/user';
import { replace } from 'ramda';

const fetchEvents = (fetchUrl, dispatch, append, getState) => {
  dispatch(setLoadingEvents(true));

  const state = getState();
  const businessId = userSelectors.getOwnBusinessId(state.userState.user);
  const url = replace('{0}', businessId, fetchUrl);
  getRaw(url)
    .then(result => {
      dispatch(
        append
          ? appendEventList(result.data, result.headers['tietoalusta-continuation-token'])
          : updateEventList(result.data, result.headers['tietoalusta-continuation-token'])
      );
    })
    .catch(error => console.log(error))
    .finally(() => {
      dispatch(setLoadingEvents(false));
    });
};

const fetchAllEvents = () => (dispatch, getState) => {
  fetchEvents(API_ENDPOINTS.FETCH_ALL_EVENTS, dispatch, false, getState);
};

const fetchMoreEvents = () => (dispatch, getState) => {
  const state = getState();
  const ct = state.eventState.view.continuationToken;
  if (ct) {
    fetchEvents(
      API_ENDPOINTS.FETCH_ALL_EVENTS + '&continuationToken=' + encodeURIComponent(ct),
      dispatch,
      true,
      getState
    );
  }
};

const fetchNewEvents = () => (dispatch, getState) => {
  fetchEvents(API_ENDPOINTS.FETCH_NEW_EVENTS, dispatch, false, getState);
};

export { updateEventList, setLoadingEvents, fetchAllEvents, fetchNewEvents, fetchMoreEvents };
