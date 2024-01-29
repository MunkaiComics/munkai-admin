import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./index";

// eslint-disable-next-line react/prop-types
export const RequireAuth = ({ children }) => {
  const location = useLocation();

  return isAuthenticated() ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};
