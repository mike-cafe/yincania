import React from "react";
import { connect } from "react-redux";
import { getRouteDetail,getFinalDetail } from "../../store/actions/RouteDetail";
import { getUserProfile } from "../../store/actions/UserProfile";
import RutasDetail from "./RutasDetail";

const RutasDetailContainer = (props) => {
  return <RutasDetail {...props} />;
};

const mapStateToProps = ({RouteDetail, Final,UserProfile}) => {
  return {
    loading: RouteDetail?.loading,
    detail: RouteDetail?.data,
    final: Final?.data,
    error: RouteDetail?.error,
    user: UserProfile?.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRouteDetail: (id) => {
      dispatch(getRouteDetail(id));
    },
    getFinalDetail: (docRef)=>{
      dispatch(getFinalDetail(docRef));
    },
    getUserProfile:()=>{
      dispatch(getUserProfile());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RutasDetailContainer);
