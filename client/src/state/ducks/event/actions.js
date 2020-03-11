import * as types from './types';

export const updateEventList = (events, continuationToken) => ({ type: types.UPDATE_EVENT_LIST, events: events, continuationToken: continuationToken });
export const appendEventList = (events, continuationToken) => ({ type: types.APPEND_EVENT_LIST, events: events, continuationToken: continuationToken });
export const setLoadingEvents = status => ({ type: types.LOADING_EVENTS, status });
