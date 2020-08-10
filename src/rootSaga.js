import { all } from 'redux-saga/effects';
import homeSaga from './containers/pages/Home/saga';

const callSagas = sagas => {
  const calledSagaList = [];
  sagas.forEach(saga => {
    calledSagaList.push(saga());
  });
  return calledSagaList;
};

export default function* rootSaga() {
  yield all([...callSagas([homeSaga])]);
}
