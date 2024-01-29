import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const RequirePermission = ({ children, permission }) => {
  const location = useLocation();
  const permissions = useSelector(
    (state) => state.authentication.user.permissions
  );
  console.log(permissions);

  function checkPermission() {
    if (!permissions || !Array.isArray(permissions)) return false;
    for (const perm of permissions) {
      if (perm.name === permission) return true;
    }
    return false;
  }

  return checkPermission() ? (
    children
  ) : (
    <Navigate to='/dashboard' state={{ from: location }} replace />
  );
};
