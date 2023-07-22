import React from "react";
import { connect } from "react-redux";
import Signup from "./Signup";
import {
  signUp,
  signUpSuccess,
  signUpFailure,
  getAlreadyEmail,
} from "./../../store/actions/SignUp";
import {
  signIn,
  signInSuccess,
  signInFailure,
  userData,
} from "./../../store/actions/SignIn";
import {
  resetUserData,
  saveUserData,
} from "./../../store/actions/UserProfile";

const SignupContainer = (props) => {
  return <Signup {...props} />;
};

const mapStateToProps = ({ SignUp,UserProfile }) => {
  return {
    userToken: SignUp?.response?.token,
    loading: SignUp?.loading,
    emailAlreadyTaken: SignUp?.emailTaken,
    signUpResponse: SignUp?.response,
    userProfile:UserProfile?.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (userData) => {
      dispatch(signUp(userData));
    },
    signInSuccess: (user) => {
      dispatch(signInSuccess(user));
    },
    signInFailure: (userData) => {
      dispatch(signInFailure(userData));
    },
    getAlreadyEmail: (userData) => {
      dispatch(getAlreadyEmail(userData));
    },
    saveUserData:(userProfile)=>{
      dispatch(saveUserData(userProfile))
    },
    userData: (data) => {
      dispatch(userData(data));
    },
    resetUser: ()=>{
      dispatch(resetUserData());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
