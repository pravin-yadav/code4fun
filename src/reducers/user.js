import { USER_LOG_OUT_SUCCESS, USER_LOGGED_IN_ERROR, USER_LOGGED_IN_SUCCESS, USER_SIGNED_UP_SUCCESS } from '../actions/actionTypes';

export const initialState = {
  created: false,
  isLoggedIn: false,
  errors: {},
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_SIGNED_UP_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        ...payload,
        created: true,
      };
    }
    case USER_LOGGED_IN_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        ...payload,
        isLoggedIn: true,
      };
    }

    case USER_LOGGED_IN_ERROR: {
      const { payload } = action;
      const { data } = payload || {};
      const { errors } = data || {};
      return {
        errors,
        isLoggedIn: false,
      };
    }

    case USER_LOG_OUT_SUCCESS: {
      return {};
    }

    default:
      return state;
  }
}
