import React from "react";
import { connect } from "react-redux";
import { getTeamDetail,getUsernames } from "../../store/actions/TeamDetail";
import { removeUser } from "../../store/actions/SaveTeam";
import { removeTeam } from "../../store/actions/UserProfile";

import TeamDetail from "./TeamDetail";

const TeamDetailContainer = (props) => {
  return <TeamDetail {...props} />;
};

const mapStateToProps = ({ TeamDetail,UserProfile }) => {
  return {
    loading:    TeamDetail?.loading,
    teamDetail: TeamDetail?.data,
    userData:   UserProfile?.data,
    usernames:  TeamDetail?.usernames,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailContainer);
