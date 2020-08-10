import {
  FETCH_NEWS,
  FETCHING_NEWS,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_ERROR,
} from './constants';

export const fetchNews = payload => ({ type: FETCH_NEWS, payload });
export const fetchingNews = () => ({ type: FETCHING_NEWS });
export const fetchNewsSucees = data => ({
  type: FETCH_NEWS_SUCCESS,
  data,
});
export const fetchNewsError = error => ({
  type: FETCH_NEWS_ERROR,
  error,
});
