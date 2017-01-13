import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import PostReducer from './reducer_post';
import PostsReducer from './reducer_posts';

export default combineReducers({
  post: PostReducer,
  posts: PostsReducer,
  form: formReducer,
});
