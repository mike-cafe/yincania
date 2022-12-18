import React from "react";
import { connect } from "react-redux";
import { getUserProfile, saveUserData } from "../../store/actions/UserProfile";
import UserProfile from "./UserProfile";

const UserProfileContainer = (props) => <UserProfile {...props} />

const mapStateToProps = ({ UserProfile }) => {
  return {
    loading: UserProfile?.loading,
    userProfile: UserProfile?.data,
    error: UserProfile?.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: () => {
      dispatch(getUserProfile());
    },
    saveUserProfile: (payload) => dispatch(saveUserData(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
