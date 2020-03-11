import * as types from './types';
import produce from 'immer';
import {
  compose,
  assoc,
  omit,
  map,
  flatten,
  prop,
  concat,
  curry,
  sortBy,
  toLower,
  either
} from 'ramda';

export const pickRegionsAndAssocType = map(
  compose(
    assoc('configurationType', 'Region'),
    omit(['municipalities'])
  )
);

export const pickMunicipalities = compose(
  flatten,
  map(prop('municipalities'))
);

export const municipalitiesFromConfigurations = pickMunicipalities;

export const municipalitiesAndRegionsFromConfigurations = curry(regionsAndMunicipalities => {
  return concat(
    pickRegionsAndAssocType(regionsAndMunicipalities),
    pickMunicipalities(regionsAndMunicipalities)
  );
});

export const sortMunicipalities = values =>
  sortBy(
    compose(
      toLower,
      either(prop('nameFi'), prop('regionNameFi'))
    )
  )(values);

const initialState = {
  isTouchDevice: false,
  location: {
    municipalities: [],
    regions: [],
    regionsAndMunicipalities: []
  },
  regionsFetched: false,
  loadingRegions: false,
  loadingConfigurations: false,
  configurations: {
    municipalities: [],
    services: [],
    materials: [],
    units: [],
    industries: [],
    ewcs: []
  },
  configurationsFetched: false,
  notifications: []
};

const general = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CONFIGURATIONS: {
      const { payload } = action;
      return produce(state, draft => {
        draft.configurations = payload;
        draft.location.municipalities = sortMunicipalities(
          pickMunicipalities(draft.configurations.municipalities)
        );
        draft.location.regions = sortMunicipalities(
          pickRegionsAndAssocType(draft.configurations.municipalities)
        );
        draft.location.regionsAndMunicipalities = sortMunicipalities(
          municipalitiesAndRegionsFromConfigurations(draft.configurations.municipalities)
        );
        draft.configurationsFetched = true;
        return draft;
      });
    }

    case types.DETECT_TOUCH:
      return produce(state, draft => {
        draft.isTouchDevice = action.payload;
        return draft;
      });

    case types.LOADING_CONFIGURATIONS:
      return produce(state, draft => {
        draft.loadingConfigurations = action.status;
      });

    case types.ADD_NOTIFICATION:
      return produce(state, draft => {
        draft.notifications.push(action.notification);
      });

    case types.DELETE_NOTIFICATION:
      return produce(state, draft => {
        draft.notifications = draft.notifications.filter(notification => {
          return notification.id !== action.id;
        });
      });

    default:
      return state;
  }
};

export default general;
