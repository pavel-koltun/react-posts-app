import React, { Component } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import { createPost } from '../actions';
import Header from './header';

const FIELDS = {
  title: {
    type: 'input',
    name: 'title',
    label: 'Title',
    requiredMessage: 'Title cannot be empty.',
  },
  categories: {
    type: 'input',
    name: 'categories',
    label: 'Categories',
    requiredMessage: 'Please enter categories for the post.',
  },
  content: {
    type: 'textarea',
    name: 'content',
    label: 'Contents',
    requiredMessage: 'Post content cannot be empty.',
  },
};

class PostsNew extends Component {

  static renderField(field) {
    const { input, name, label, type, meta: { touched, invalid, error } } = field;

    return (
      <div className={`form-group ${touched && invalid ? 'has-danger' : ''}`}>
        <label htmlFor={name}>{label}</label>
        <field.fieldType
          id={name} type={type} {...input}
          className={`form-control ${touched && invalid ? 'form-control-danger' : ''}`}
        />
        <div className="col-form-label">{touched && error ? error : ''}</div>
      </div>
    );
  }

  constructor(args) {
    super(args);

    ['onSubmit']
      .forEach((method) => { this[method] = this[method].bind(this); });
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <Header />
        <form onSubmit={handleSubmit(this.onSubmit)} className="content-container">
          <h3>Create A New Post</h3>
          {_.map(FIELDS, value => (
            <Field
              type="text" key={value.label} name={value.name} label={value.label}
              fieldType={value.type}
              component={PostsNew.renderField}
            />
          ))}
          <button type="submit" className="btn btn-outline-primary">Submit</button>
          <Link to="/" className="btn btn-outline-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

PostsNew.contextTypes = {
  router: React.PropTypes.object,
};

PostsNew.propTypes = {
  createPost: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
};

const validate = (values) => {
  const errors = {};

  _.each(FIELDS, (configuration, field) => {
    if (!values[field]) {
      errors[field] = configuration.requiredMessage;
    }
  });

  return errors;
};

const PostsNewForm = reduxForm({
  form: 'PostsNewForm',
  validate,
})(PostsNew);

export default connect(null, { createPost })(PostsNewForm);
