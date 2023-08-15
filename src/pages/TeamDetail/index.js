import React from "react";
import { connect } from "react-redux";
import { getTeamDetail,getUsernames } from "../../store/actions/TeamDetail";
import { getRouteDetail } from "../../store/actions/RouteDetail";
import { removeUser } from "../../store/actions/SaveTeam";
import { removeTeam } from "../../store/actions/UserProfile";

import TeamDetail from "./TeamDetail";

const TeamDetailContainer = (props) => {
  return <TeamDetail {...props} />;
};

const mapStateToProps = ({ TeamDetail,UserProfile,RouteDetail }) => {
  return {
    loading:    TeamDetail?.loading,
    teamDetail: TeamDetail?.data,
    userData:   UserProfile?.data,
    usernames:  TeamDetail?.usernames,
    routeDetail:RouteDetail?.data,
    error:      TeamDetail?.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTeamDetail: (id) => {
      dispatch(getTeamDetail(id));
    },
    getUsernames: (members) => {
      dispatch(getUsernames(members));
    },
    removeTeam: (payload) => {
      dispatch(removeTeam(payload));
    },
    removeUser: (payload) => {
      dispatch(removeUser(payload));
    },
    getRouteDetail: (id) => {
      dispatch(getRouteDetail(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailContainer);
