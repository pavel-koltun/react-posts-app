import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Header from './header';

class PostsIndex extends Component {

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <Link to={`posts/${post.id}`} key={post.id}
          className="list-group-item list-group-item-action justify-content-between">
          <strong>{post.title}</strong>
          <span className="badge badge-default badge-pill">{post.categories}</span>
        </Link>
      );
    });
  }

  render() {
    return (
      <div>
        <Header>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto"></ul>
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
};

export default connect(state => {
  return {
    posts: state.posts.all
  }
})(PostsIndex);
