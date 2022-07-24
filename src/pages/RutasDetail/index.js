import React from "react";
import { connect } from "react-redux";
import { getRouteDetail,getFinalDetail } from "../../store/actions/RouteDetail";
import RutasDetail from "./RutasDetail";

const RutasDetailContainer = (props) => {
  return <RutasDetail {...props} />;
};

const mapStateToProps = ({RouteDetail, Final}) => {
  return {
    loading: RouteDetail?.loading,
    detail: RouteDetail?.data,
    final: Final?.data,
    error: RouteDetail?.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRouteDetail: (id) => {
      dispatch(getRouteDetail(id));
    },
    getFinalDetail: (docRef)=>{
      dispatch(getFinalDetail(docRef));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RutasDetailContainer);
