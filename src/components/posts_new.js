import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

import { createPost } from '../actions/index';
import Header from './header';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title',
    requiredMessage: 'Title cannot be empty.'
  },
  categories: {
    type: 'input',
    label: 'Categories',
    requiredMessage: 'Please enter categories for the post.'
  },
  content: {
    type: 'textarea',
    label: 'Contents',
    requiredMessage: 'Post content cannot be empty.'
  }
}

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(args) {
    super(args);

    ['onSubmit', 'renderField']
      .forEach((method) => this[method] = this[method].bind(this));
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        this.context.router.push('/');
      });
  }

  renderField(fieldConfiguration, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`} key={field}>
        <label>{fieldConfiguration.label}</label>
        <fieldConfiguration.type type="text"
          className={`form-control ${fieldHelper.touched && fieldHelper.invalid ? 'form-control-danger' : ''}`}
          {...fieldHelper} />
        <div className="col-form-label">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render() {

    return (
      <div>
        <Header />
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="content-container">
          <h3>Create A New Post</h3>
          {_.map(FIELDS, this.renderField)}
          <button type="submit" className="btn btn-outline-primary">Submit</button>
          <Link to="/" className="btn btn-outline-danger">Cancel</Link>
        </form>
      </div>
    );
  };
};

function validate(values) {
  const errors = {};

  _.each(FIELDS, (configuration, field) => {
    if (!values[field]) {
      errors[field] = configuration.requiredMessage;
    }
  });

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: _.keys(FIELDS),
  validate
}, null, { createPost })(PostsNew);
