import _ from 'lodash';
import { FETCH_POSTS, DELETE_POST } from '../actions/index';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, ..._.mapKeys(action.payload.data, 'id') };
    case DELETE_POST:
      return _.omit(state, action.payload.data.id);
    default:
      return state;
  }
}
