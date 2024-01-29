import { authConstant } from "../constants";

let user = JSON.parse(localStorage.getItem("munkai_admin_user"));
const initialState = user
  ? { loggedIn: true, user }
  : {
      loggingIn: false,
      loggedIn: false,
    };

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
      return {
        loggingIn: true,
        loggedIn: false,
        user: action.user,
      };

    case authConstant.LOGIN_SUCCESS:
      localStorage.setItem("munkai_admin_user", JSON.stringify(action.user));
      return {
        loggingIn: false,
        loggedIn: true,
        user: action.user,
      };

    case authConstant.LOGIN_FAILURE:
      return {
        loggingIn: false,
        loggedIn: false,
        error: action.error,
      };

    case authConstant.LOGOUT:
      return {
        loggingIn: false,
        loggedIn: false,
      };

    default:
      return state;
  }
};
