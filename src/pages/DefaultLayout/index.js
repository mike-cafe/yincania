import React from "react";
import { connect } from "react-redux";
import { getUserProfile } from "../../store/actions/UserProfile";
import DefaultLayout from "./DefaultLayout";

const DefaultLayoutContainer = (props) => {
  return <DefaultLayout {...props} />;
};

const mapStateToProps = ({UserProfile}) => {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayoutContainer);
