import React, { useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../components/auth";
import { logout } from "../../redux/actions";

const Logout = () => {
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.authentication.loggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(logout());
    } else {
      navigate("/");
    }
  }, [dispatch, navigate, isAuthenticated]);

  return <LoadingOverlay ></LoadingOverlay>;
};

export default Logout;
