import React from "react";
import { connect } from "react-redux";
import { getUserProfile, saveUserData } from "../../store/actions/UserProfile";
import Tutorial from "./Tutorial";

const TutorialContainer = (props) => <Tutorial {...props} />;

const mapStateToProps = ({ UserProfile }) => {
  return {
    loading: UserProfile?.loading,
    user: UserProfile?.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: () => {
      dispatch(getUserProfile());
    },
    saveUserData: (formData) => {
      dispatch(saveUserData({ ...formData }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorialContainer);
