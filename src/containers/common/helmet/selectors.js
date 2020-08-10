import { createSelector } from 'reselect';
import { HELMET_STATE_KEY } from './constants';

export const helmetState = state => state.get(HELMET_STATE_KEY);

export const getHelmetData = () =>
  createSelector(helmetState, state => state.get('data').toJS());
