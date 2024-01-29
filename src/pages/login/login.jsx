import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import "./login.css";
import Logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../../components/auth";
import { Navigate } from "react-router-dom";
import { login } from "../../redux/actions";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [values, setValues] = useState({
    email:
      (typeof window !== "undefined" &&
        localStorage.getItem("munkai_last_logged_in_email")) ||
      "",
    password: "",
    error: {
      email: null,
      password: null,
    },
    redirectToReferrer: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const redirectUser = () => {
    if (isAuthenticated()) {
      return <Navigate to={"/"} />;
    }
  };

  const { email, password, errors } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    if (!password || !email) {
      let errors = {};
      if (!email) {
        errors = { ...errors, email: "email can't be empty" };
      } else {
        errors = { ...errors, password: "password can't be empty" };
      }
      return setValues({ ...values, errors: errors });
    }
    setValues({ ...values, loading: true });
    dispatch(login(email, password));
  };
  const [errorToastOpen, setErrorToastOpen] = useState(false);

  useEffect(() => {
    setErrorToastOpen(!!state.authentication.error);
  }, [state.authentication.error, setErrorToastOpen]);

  return (
    <div>
      {redirectUser()}
      {state.authentication.error && (
        <Snackbar
          open={errorToastOpen}
          autoHideDuration={5000}
          anchorOrigin={{horizontal: "left", vertical: "top"}}
          onClose={() => {
            setErrorToastOpen(false);
          }}>
          <Alert
            onClose={() => {
              setErrorToastOpen(false);
            }}
            severity='error'
            sx={{ width: "100%" }}>
            {state.authentication.error}
          </Alert>
        </Snackbar>
      )}
      <div className='wrapper'>
        <div className='logo'>
          <img src={Logo} alt='' />
        </div>
        <div className='text-center mt-4 name'>Sign into your account</div>
        <form className='p-3 mt-3' onSubmit={clickSubmit}>
          <div className='form-field d-flex align-items-center'>
            <span className='fas fa-user'></span>
            <input
              type='text'
              name='email'
              id='email'
              placeholder='Email'
              value={email}
              onChange={handleChange("email")}
            />
          </div>
          <div className='form-field d-flex align-items-center'>
            <span className='fas fa-key'></span>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={handleChange("password")}
            />
          </div>

          <button className='login-btn'>Login </button>
        </form>
        <div className='password text-center fs-6'>
          <a href='#'>Forget password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
