import React from "react";
import { connect } from "react-redux";
import { resetToast } from "../../store/actions/UserFeedback";
import { getUserProfile } from "../../store/actions/UserProfile";
import DefaultLayout from "./DefaultLayout";

const DefaultLayoutContainer = (props) => {
  return <DefaultLayout {...props} />;
};

const mapStateToProps = ({UserProfile,UserFeedback}) => {
  return {
    loading: UserProfile?.loading,
    userProfile: UserProfile?.data,
    userFeedback:UserFeedback?.toast,
    error: UserProfile?.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: () => {
      dispatch(getUserProfile());
    },
    resetToast: ()=>dispatch(resetToast())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayoutContainer);
