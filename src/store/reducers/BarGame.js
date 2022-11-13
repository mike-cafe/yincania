import {
    GET_BAR_GAME,
    GET_BAR_GAME_SUCCESS,
    GET_BAR_GAME_FAILURE,
    SAVE_ANSWER,
    SAVE_ANSWER_SUCCESS,
    RESET_GAME
  } from "../types";

const INIT_STATE = {
  data: null,
  loading: false,
  saved:false,
};

const BarGame = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BAR_GAME:
      return { ...state, loading: true };
    case GET_BAR_GAME_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_BAR_GAME_FAILURE:
      return { ...state, isError: true, loading: false, err: action.payload };
    case SAVE_ANSWER:
      return { ...state, loading: true };
    case SAVE_ANSWER_SUCCESS:
      return { ...state, loading: false,saved:true };
    case RESET_GAME:
      return INIT_STATE;
    default:
      return { ...state };
  }
};

export default BarGame;
