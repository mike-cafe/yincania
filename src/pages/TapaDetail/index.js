import React from "react";
import { connect } from "react-redux";
import { getTapaDetail, updateTapa } from "../../store/actions/TapasDetail";
import TapaDetail from "./TapaDetail";

const TapaDetailContainer = (props) => {
  return <TapaDetail {...props} />;
};

const mapStateToProps = ({ TapasDetail }) => {
  return {
    tapa: TapasDetail?.data,
    loading: TapasDetail?.loading,
    error: TapasDetail?.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTapaDetail: (data) => {
      dispatch(getTapaDetail(data));
    },
    updateTapa: (id) => {
      dispatch(updateTapa({id:id,change:"served"}));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TapaDetailContainer);
