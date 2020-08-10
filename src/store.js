import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';
import isServer from './utils/isServer';
import createRootReducer from './rootReducer';

export default his => {
  // Create a history depending on the environment
  const history = his
    ? // eslint-disable-next-line no-param-reassign
      (his.location.search = '?server=true')
    : createBrowserHistory();

  const enhancers = [];

  // Dev tools are helpful
  if (process.env.NODE_ENV === 'development' && !isServer) {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const sagaMiddleware = createSagaMiddleware();
  const middleware = [routerMiddleware(history), sagaMiddleware];
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  // Do we have preloaded state available? Great, save it.
  // eslint-disable-next-line no-underscore-dangle
  const initialState = !isServer ? window.__PRELOADED_STATE__ : {};
  delete initialState.router;
  // Delete it once we have it stored in a variable
  if (!isServer) {
    // eslint-disable-next-line no-underscore-dangle
    delete window.__PRELOADED_STATE__;
  }

  // Create the store
  const store = createStore(
    createRootReducer(history),
    fromJS(initialState),
    composedEnhancers
  );
  store.runSaga = sagaMiddleware.run;

  return {
    store,
    history,
  };
};
