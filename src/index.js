/* eslint-disable no-unused-vars */
import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import App from './containers/app';
import createStore from './store';
import rootSaga from './rootSaga';
import './styles/basscss.css';
import './styles/common.css';
// Create a store and get back itself and its history object
const { store, history } = createStore();

// Run Saga through store object
store.runSaga(rootSaga);

const Application = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

// Root Node
const rootNode = document.getElementById('root');

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./containers/app/index', () => {
    render(<Application />, rootNode);
  });
}

if (rootNode.hasChildNodes()) {
  // If it's an SSR, we use hydrate to get fast page loads by just
  // attaching event listeners after the initial render
  hydrate(<Application />, rootNode);
} else {
  // If we're not running on the server, just render like normal
  render(<Application />, rootNode);
}
