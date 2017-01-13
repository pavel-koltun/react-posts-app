import { FETCH_POST, FETCH_POSTS, DELETE_POST } from '../actions';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, ...action.payload.data };
    case DELETE_POST:
    case FETCH_POSTS:
      return null;
    default:
      return state;
  }
}
