import React from "react";
import { connect } from "react-redux";
import { addMember, saveTeamData } from "../../store/actions/SaveTeam";
import { findTeam, resetFindTeam } from "../../store/actions/TeamDetail";
import { getRouteDetail } from "../../store/actions/RouteDetail";
import { saveUserData } from "../../store/actions/UserProfile";
import JoinTeam from "./JoinTeam";

const JoinTeamContainer = (props) => {
  return <JoinTeam {...props} />;
};

const mapStateToProps = ({ TeamDetail,RouteDetail,UserProfile }) => {
  return {
    loading: TeamDetail?.loading,
    teamFound:TeamDetail?.teamFound,
    teamDetail:TeamDetail?.data,
    routeDetail:RouteDetail.data,
    user:UserProfile.data,
    err:TeamDetail?.err,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserData:(data) => dispatch(saveUserData(data)),
    addMember:(data) => dispatch(addMember(data)),
    findTeam: (code) => dispatch(findTeam(code)),
    resetFindTeam: ()=> dispatch(resetFindTeam()),
    getRouteDetail: (id) => {
      dispatch(getRouteDetail(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinTeamContainer);
