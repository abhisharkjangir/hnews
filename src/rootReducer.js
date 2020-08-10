import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { fromJS } from 'immutable';

// Helmet
import { HELMET_STATE_KEY } from './containers/common/helmet/constants';
import helmetReducer from './containers/common/helmet/reducer';
// Home
import { HOME_STATE_KEY } from './containers/pages/Home/constants';
import homeReducer from './containers/pages/Home/reducer';

const createRootReducer = history =>
  combineReducers({
    router: fromJS(connectRouter(history)),
    [HELMET_STATE_KEY]: helmetReducer,
    [HOME_STATE_KEY]: homeReducer,
  });

export default createRootReducer;
