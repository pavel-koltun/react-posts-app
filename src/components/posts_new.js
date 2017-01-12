import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

import { createPost } from '../actions/index';
import Header from './header';

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(args) {
    super(args);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {

    const { fields: { title, categories, content }, handleSubmit } = this.props;

    const isValid = (field) => !(field.touched && field.invalid);

    return (
      <div>
        <Header />
        <form onSubmit={handleSubmit(this.onSubmit)} className="content-container">
          <h3>Create A New Post</h3>

          <div className={`form-group ${!isValid(title) ? 'has-danger' : ''}`}>
            <label>Title</label>
            <input type="text" className={`form-control ${!isValid(title) ? 'form-control-danger' : ''}`} {...title} />
            <div className="col-form-label">
              {title.touched ? title.error : ''}
            </div>
          </div>

          <div className={`form-group ${!isValid(categories) ? 'has-danger' : ''}`}>
            <label>Categories</label>
            <input type="text" className={`form-control ${!isValid(categories) ? 'form-control-danger' : ''}`} {...categories} />
            <div className="col-form-label">
              {categories.touched ? categories.error : ''}
            </div>
          </div>

          <div className={`form-group ${!isValid(content) ? 'has-danger' : ''}`}>
            <label>Content</label>
            <textarea className={`form-control ${!isValid(content) ? 'form-control-danger' : ''}`} {...content}/>
            <div className="col-form-label">
              {content.touched ? content.error : ''}
            </div>
          </div>

          <button type="submit" className="btn btn-outline-primary">Submit</button>
          <Link to="/" className="btn btn-outline-danger">Cancel</Link>
        </form>
      </div>
    );
  };
};

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username.';
  }

  if (!values.categories) {
    errors.categories = 'Enter categories.';
  }

  if (!values.content) {
    errors.content = 'Enter some content.';
  }

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: [
    'title',
    'categories',
    'content'
  ],
  validate
}, null, { createPost })(PostsNew);
