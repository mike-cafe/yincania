import React from "react";
import { connect } from "react-redux";
import { getTeamDetail,getUsernames } from "../../store/actions/TeamDetail";
import TeamDetail from "./TeamDetail";

const TeamDetailContainer = (props) => {
  return <TeamDetail {...props} />;
};

const mapStateToProps = ({ TeamDetail }) => {
  return {
    loading: TeamDetail?.loading,
    teamDetail: TeamDetail?.data,
    usernames: TeamDetail?.usernames,
    error: TeamDetail?.error,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailContainer);
