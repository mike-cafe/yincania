import React from "react";
import { connect } from "react-redux";
import {
  getRouteDetail,
  getFinalDetail,
} from "../../store/actions/RouteDetail";
import { getTeamDetail } from "../../store/actions/TeamDetail";
import { getUserProfile } from "../../store/actions/UserProfile";
import RutasFinished from "./RutasFinished";

const RutasFinishedContainer = (props) => {
  return <RutasFinished {...props} />;
};

const mapStateToProps = ({ RouteDetail, Final, UserProfile,TeamDetail }) => {
  return {
    loading: RouteDetail?.loading,
    detail: RouteDetail?.data,
    final: Final?.data,
    user: UserProfile?.data,
    team:TeamDetail?.data,
    error: RouteDetail?.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRouteDetail: (id) => {
      dispatch(getRouteDetail(id));
    },
    getFinalDetail: (docRef) => {
      dispatch(getFinalDetail(docRef));
    },
    getTeamDetail: (id) => {
      dispatch(getTeamDetail(id));
    },
    getUserProfile: (data) => {
      dispatch(getUserProfile(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RutasFinishedContainer);
