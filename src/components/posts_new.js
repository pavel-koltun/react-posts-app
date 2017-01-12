import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import { createPost } from '../actions/index';
import Header from './header';

const FIELDS = {
  title: {
    type: 'input',
    name: 'title',
    label: 'Title',
    requiredMessage: 'Title cannot be empty.'
  },
  categories: {
    type: 'input',
    name: 'categories',
    label: 'Categories',
    requiredMessage: 'Please enter categories for the post.'
  },
  content: {
    type: 'textarea',
    name: 'content',
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

  renderField(field) {
    const {input, name, label, type, meta: { touched, invalid, error } } = field;

    return (
      <div className={`form-group ${touched && invalid ? 'has-danger' : ''}`}>
        <label>{label}</label>
        <field.fieldType type={type} {...input}
          className={`form-control ${touched && invalid ? 'form-control-danger' : ''}`} />
        <div className="col-form-label">{touched && error ? error : ''}</div>
      </div>
    );
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <div>
        <Header />
        <form onSubmit={handleSubmit(this.onSubmit)} className="content-container">
          <h3>Create A New Post</h3>
          {_.map(FIELDS, (value, key) => {
            return (
              <Field type="text" key={value.label} name={value.name} label={value.label}
                fieldType={value.type}
                component={this.renderField} />
            );
          })}
          <button type="submit" className="btn btn-outline-primary">Submit</button>
          <Link to="/" className="btn btn-outline-danger">Cancel</Link>
        </form>
      </div>
    );
  };
};

const validate = (values) => {
  const errors = {};

  _.each(FIELDS, (configuration, field) => {
    if (!values[field]) {
      errors[field] = configuration.requiredMessage;
    }
  });

  return errors;
}

const PostsNewForm = reduxForm({
  form: 'PostsNewForm',
  validate
})(PostsNew);

export default connect(null, { createPost })(PostsNewForm);
