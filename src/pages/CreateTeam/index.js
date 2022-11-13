import React from "react";
import { connect } from "react-redux";
import { saveTeamData } from "../../store/actions/SaveTeam";
import { resetToast } from "../../store/actions/UserFeedback";
import { saveUserData } from "../../store/actions/UserProfile";
import CreateTeam from "./CreateTeam";

const CreateTeamContainer = (props) => {
  return <CreateTeam {...props} />;
};

const mapStateToProps = ({ TeamDetail }) => {
  return {
    loading: TeamDetail?.loading,
    teamDetail: TeamDetail?.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveTeamData: (formData) => {
      dispatch(saveTeamData(formData));
    },
    addUserRoute: (payload) =>{
      dispatch(
        saveUserData({
          uid: payload.owner,
          newRoute: {id:payload.route,team:payload.team},
        })
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTeamContainer);
