import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} render={props => (!isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard' }} push />)} />
);

PublicRoute.propTypes = {
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

export default withRouter(connect(selector)(PublicRoute));
