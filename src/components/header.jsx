import React from 'react';
import { Link } from 'react-router';

const Header = props => (
  <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
    <button
      className="navbar-toggler navbar-toggler-right" type="button"
      data-toggle="collapse" data-target="#navbar"
      aria-controls="navbar"
      aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <Link to="/" className="navbar-brand">Posts App</Link>
    {props.children}
  </nav>
);

Header.propTypes = {
  children: React.PropTypes.element,
};

Header.defaultProps = {
  children: null,
};

export default Header;
