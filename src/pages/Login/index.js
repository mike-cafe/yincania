import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import {
  reSendEmail,
  reSendEmailSuccess,
  reSendEmailFailure,
  resetSignInStates,
  signIn,
  signInSuccess,
  signInFailure,
  googleSignIn,
  googleSignInSuccess,
  googleSignInFailure,
  userData,
  verifyToken,
} from "./../../store/actions/SignIn";

const LoginContainer = (props) => {
  return <Login {...props} />;
};

const mapStateToProps = ({ SignUp, SignIn }) => {
  return {
    emailSent: SignIn?.emailSent,
    error: SignIn?.error,
    signInResponse: SignIn?.response,
    user: SignIn?.user,
    loading: SignIn?.loading,
    tokenVerified: SignIn?.tokenVerified,
    userHasWorkSpace: SignIn?.userHasWorkSpace,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (userData) => {
      dispatch(signIn(userData));
    },
    signInSuccess: (userData) => {
      dispatch(signInSuccess(userData));
    },
    signInFailure: (userData) => {
      dispatch(signInFailure(userData));
    },
    reSendEmail: (userData) => {
      dispatch(reSendEmail(userData));
    },
    reSendEmailSuccess: (userData) => {
      dispatch(reSendEmailSuccess(userData));
    },
    reSendEmailFailure: (userData) => {
      dispatch(reSendEmailFailure(userData));
    },
    resetSignInStates: () => {
      dispatch(resetSignInStates());
    },
    googleSignIn: (data) => {
      dispatch(googleSignIn(data));
    },
    googleSignInSuccess: (data) => {
      dispatch(googleSignInSuccess(data));
    },
    googleSignInFailure: (data) => {
      dispatch(googleSignInFailure(data));
    },
    userData: (data) => {
      dispatch(userData(data));
    },
    verifyToken: (data) => {
      dispatch(verifyToken(data));
    },
    // logout: () => {
    //   dispatch(logout());
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
