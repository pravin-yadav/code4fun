import api from '../api/index';
import {
  USER_LOG_OUT_SUCCESS,
  USER_LOGGED_IN_ERROR,
  USER_LOGGED_IN_SUCCESS,
  USER_SIGNED_UP_ERROR,
  USER_SIGNED_UP_SUCCESS,
} from './actionTypes';

export const signup = data => dispatch => {
  api.user
    .signup(data)
    .then(user => {
      dispatch({ type: USER_SIGNED_UP_SUCCESS, payload: user.data });
      window.location.href = '/';
    })
    .catch(error => {
      dispatch({ type: USER_SIGNED_UP_ERROR, payload: error });
    });
};

export const login = (data, history) => dispatch => {
  api.user
    .login(data)
    .then(res => {
      localStorage.userJWT = res.data.profile.token;
      dispatch({ type: USER_LOGGED_IN_SUCCESS, payload: res.data });
      history.push('/dashboard');
    })
    .catch(error => {
      dispatch({ type: USER_LOGGED_IN_ERROR, payload: error.response });
    });
};

export const logout = history => dispatch => {
  dispatch({ type: USER_LOG_OUT_SUCCESS });
  localStorage.removeItem('userJWT');
  return history.push('/');
};
