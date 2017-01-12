import React from 'react';
import { Link } from 'react-router';

export default function(props) {
  return (
    <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
      <button className="navbar-toggler navbar-toggler-right" type="button"
        data-toggle="collapse" data-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link to="/" className="navbar-brand">Posts App</Link>
      {props.children}
    </nav>
  )
}
