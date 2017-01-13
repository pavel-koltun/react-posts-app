import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

import Header from './header';

class PostsIndex extends Component {

  renderPosts() {
    return _.map(this.props.posts, post => (
      <Link
        to={`posts/${post.id}`} key={post.id}
        className="list-group-item list-group-item-action justify-content-between">
        <strong>{post.title}</strong>
        <span className="badge badge-default badge-pill">{post.categories}</span>
      </Link>
    ));
  }

  render() {
    return (
      <div>
        <Header>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto" />
            <div className="form-inline">
              <Link to="posts/new" className="btn btn-outline-success my-2 my-sm-0">
                Add a Post
              </Link>
            </div>
          </div>
        </Header>
        <div className="container content-container">
          <h3>Index</h3>
          <div className="list-group">
            {this.renderPosts()}
          </div>
        </div>
      </div>
    );
  }
}

PostsIndex.propTypes = {
  posts: React.PropTypes.shape().isRequired,
};

export default connect(state => ({
  posts: state.posts,
}))(PostsIndex);
