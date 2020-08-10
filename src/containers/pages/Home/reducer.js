import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import {
  FETCHING_NEWS,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_ERROR,
} from './constants';

const newsInitialState = fromJS({
  isFetching: false,
  data: fromJS(null),
  error: null,
});

export const newsReducer = (
  state = newsInitialState,
  { type, data, error }
) => {
  switch (type) {
    case FETCHING_NEWS:
      return state.set('isFetching', true);
    case FETCH_NEWS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('data', fromJS(data))
        .set('error', null);
    case FETCH_NEWS_ERROR:
      return state
        .set('isFetching', false)
        .set('data', null)
        .set('error', error);
    default:
      return state;
  }
};

const homeReducer = combineReducers({ news: newsReducer });

export default homeReducer;
