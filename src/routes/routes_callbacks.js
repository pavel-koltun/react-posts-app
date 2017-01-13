import store from '../store';
import { fetchPost, fetchPosts } from '../actions';

export const onPostShowEnter = (nextState) => {
  store.dispatch(fetchPost(nextState.params.id));
};

export const onPostsIndexEnter = () => {
  store.dispatch(fetchPosts());
};
