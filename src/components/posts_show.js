import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchPost, deletePost } from '../actions/index';
import Header from './header';

class PostsShow extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(args) {
    super(args);

    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDelete() {
    this.props.deletePost(this.props.params.id)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {

    const { post } = this.props;

    if (!post) {
      return (
        <div>
          <Header />
          <div className="content-container">
            Loading...
          </div>
        </div>
      );
    }

    return (
      <div>
        <Header>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto"></ul>
            <div className="form-inline">
              <button className="btn btn-outline-danger my-2 my-sm-0"
                onClick={this.onDelete}>
                Delete
              </button>
            </div>
          </div>
        </Header>
        <div className="content-container">
          <h3>{post.title}</h3>
          <h5>Categories: {post.categories}</h5>
          <p>{post.content}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
