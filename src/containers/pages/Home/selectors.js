import { createSelector } from 'reselect';
import { HOME_STATE_KEY } from './constants';
export const homeState = state => state.get(HOME_STATE_KEY);
export const newsState = createSelector(homeState, hs => hs.get('news'));

export const selectNews = () =>
  createSelector(newsState, ns => {
    return {
      isFetching: ns.get('isFetching'),
      data: ns.get('data').toJS(),
      error: ns.get('error'),
    };
  });
