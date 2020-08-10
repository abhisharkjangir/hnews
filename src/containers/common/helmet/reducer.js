import { fromJS } from 'immutable';
import { SET_INFO } from './constants';

const initialState = fromJS({
  data: fromJS({}),
});

const helmetReducer = (state = initialState, { type, data }) => {
  switch (type) {
    case SET_INFO:
      return state.set('data', fromJS(data));
    default:
      return state;
  }
};

export default helmetReducer;
