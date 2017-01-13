import { FETCH_POST, FETCH_POSTS } from '../actions/index';

const INITIAL_STATE = {
  all: [],
  post: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, post: action.payload.data };
    case FETCH_POSTS:
      return { all: action.payload.data, post: null };
    default:
      return state;
  }
}
