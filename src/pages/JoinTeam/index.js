import React from "react";
import { connect } from "react-redux";
import { addMember, saveTeamData } from "../../store/actions/SaveTeam";
import { findTeam, resetFindTeam } from "../../store/actions/TeamDetail";
import { saveUserData } from "../../store/actions/UserProfile";
import JoinTeam from "./JoinTeam";

const JoinTeamContainer = (props) => {
  return <JoinTeam {...props} />;
};

const mapStateToProps = ({ TeamDetail }) => {
  return {
    loading: TeamDetail?.loading,
    teamFound:TeamDetail?.teamFound,
    teamDetail:TeamDetail?.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserData:(data) => dispatch(saveUserData(data)),
    addMember:(data) => dispatch(addMember(data)),
    findTeam: (code) => dispatch(findTeam(code)),
    resetFindTeam: ()=> dispatch(resetFindTeam())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinTeamContainer);
