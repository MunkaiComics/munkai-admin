import { authenticate, signout } from "../../components/auth";
import { authConstant } from "../constants";
import { history } from "../../helpers/history";
import { getAuthUser, signin } from "../../remote/auth";

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(request({ email }));
    signin({ email, password }).then((data) => {
      if (data) {
        if (data.error) {
          dispatch(failure(data.message));
        } else {
          authenticate(data.token);
          console.log("data", data);
          dispatch(getAuth());
        }
      } else {
        dispatch(failure("Something went wrong."));
      }
    });
  };

  function request(user) {
    return { type: authConstant.LOGIN_REQUEST, user };
  }

  function success(user) {
    return { type: authConstant.LOGIN_SUCCESS, user };
  }

  function failure(error) {
    return { type: authConstant.LOGIN_FAILURE, error };
  }
};

export const getAuth = () => {
  return (dispatch) => {
    getAuthUser().then((data) => {
      if (data) {
        if (data.error) {
          dispatch(failure(data.error));
        } else {
          dispatch(success(data.data));
          history.push("/");
        }
      }
    });
  };
  function success(user) {
    if (typeof window !== "undefined") {
      console.log("success", user);
      localStorage.setItem("munkai_last_logged_in_email", user?.email);
    }
    return { type: authConstant.LOGIN_SUCCESS, user };
  }

  function failure(error) {
    return { type: authConstant.LOGIN_FAILURE, error };
  }
};

export const logout = () => {
  signout();
  return { type: authConstant.LOGOUT };
};
