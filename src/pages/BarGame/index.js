import React from "react";
import { connect } from "react-redux";
import { getBarGame } from "../../store/actions/BarGame"

import BarGame from "./BarGame";

const BarGameContainer = (props) => {
  return <BarGame {...props} />;
};

const mapStateToProps = ({BarGame}) => {
  return {
    loading: BarGame?.loading,
    game: BarGame?.data,
    error: BarGame?.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBarGameData: (data) => {
      dispatch(getBarGame(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarGameContainer);
