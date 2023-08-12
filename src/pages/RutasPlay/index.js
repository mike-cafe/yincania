import React from "react";
import { connect } from "react-redux";
import { getRouteDetail,getFinalDetail } from "../../store/actions/RouteDetail";
import RutasPlay from "./RutasPlay";
import { getTeamDetail } from "../../store/actions/TeamDetail";
import { getUserProfile } from "../../store/actions/UserProfile";
import { updateTapa } from "../../store/actions/TapasDetail";

const RutasPlayContainer = (props) => {
  return <RutasPlay {...props} />;
};

const mapStateToProps = ({RouteDetail, UserProfile,TeamDetail,TapasDetail}) => {
  return {
    loading: RouteDetail?.loading,
    detail: RouteDetail?.data,
    error: RouteDetail?.error,
    user: UserProfile?.data,
    team:TeamDetail?.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRouteDetail: (id) => {
      dispatch(getRouteDetail(id));
    },
    getTeamDetail: (id) => {
      dispatch(getTeamDetail(id));
    },
    getUserProfile: (data) => {
      dispatch(getUserProfile(data));
    },
    updateTapa: (id) => {
      dispatch(updateTapa({id:id,change:"confirmed"}));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RutasPlayContainer);
