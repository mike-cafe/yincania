import {
    GET_BAR_GAME,
    GET_BAR_GAME_SUCCESS,
    GET_BAR_GAME_FAILURE,
  } from "../types";

const INIT_STATE = {
  data: null,
  loading: false,
};

const BarGame = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BAR_GAME:
      return { ...state, loading: true };
    case GET_BAR_GAME_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_BAR_GAME_FAILURE:
      return { ...state, isError: true, loading: false, err: action.payload };
    default:
      return { ...state };
  }
};

export default BarGame;
