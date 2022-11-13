import React from "react";
import { connect } from "react-redux";
import { getBarGame, resetGame, saveAnswer } from "../../store/actions/BarGame"

import BarGame from "./BarGame";

const BarGameContainer = (props) => {
  return <BarGame {...props} />;
};

const mapStateToProps = ({BarGame}) => {
  return {
    loading: BarGame?.loading,
    game: BarGame?.data,
    saved:BarGame?.saved,
    error: BarGame?.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBarGameData: (id) => {
      dispatch(getBarGame(id));
    },
    saveAnswer:(data)=>{
      dispatch(saveAnswer(data))
    },
    resetGame:()=>{
      dispatch(resetGame())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarGameContainer);
