import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import * as reducers from './ducks';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore(initialState = {}) {
  const rootReducer = combineReducers(reducers);
  return createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(thunk)));
}

const store = configureStore();

export default store;
