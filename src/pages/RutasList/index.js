import React from "react";
import { connect } from "react-redux";
import { getRoutesData } from "../../store/actions/Routes";
import { getUserProfile } from "../../store/actions/UserProfile";
import RutasList from "./RutasList";

const RutasListContainer = (props) => {
  return <RutasList {...props} />;
};

const mapStateToProps = ({Routes,UserProfile}) => {
  return {
    loading: Routes?.loading || UserProfile?.loading,
    routes: Routes?.data,
    error: Routes?.error,
    userProfile: UserProfile?.data,
    userProfileError: UserProfile?.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoutesData: (routesData) => {
      dispatch(getRoutesData(routesData));
    },
    getUserProfile: () => {
      dispatch(getUserProfile());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RutasListContainer);
