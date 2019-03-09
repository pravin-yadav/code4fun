import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} render={props => (!isAuthenticated ? <Redirect to={{ pathname: '/' }} push /> : <Component {...props} />)} />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const selector = state => {
  const { user } = state;
  const { profile } = user || {};
  const { token } = profile || {};
  return {
    isAuthenticated: !!token,
  };
};

export default withRouter(connect(selector)(PrivateRoute));
