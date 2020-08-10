import { takeLatest, put, call } from 'redux-saga/effects';
import { FETCH_NEWS } from './constants';

import apiService from '../../../utils/apiService';
import { fetchNewsSucees, fetchNewsError } from './actions';
import objectToQueryString from '../../../utils/objectToQueryString';

function* fetchNews(action) {
  const { payload } = action;

  try {
    const { data, status } = yield call(apiService, {
      method: 'GET',
      url: 'search',
      appendUrl: objectToQueryString(payload),
    });
    if (status === 200) {
      const dataCopy = { ...data };
      dataCopy.hits = dataCopy.hits.filter(h => h.title !== null);
      return yield put(fetchNewsSucees(dataCopy));
    }
    return yield put(fetchNewsError(data));
  } catch (error) {
    return yield put(fetchNewsError(error));
  }
}

function* homeSaga() {
  yield takeLatest(FETCH_NEWS, fetchNews);
}

export default homeSaga;
