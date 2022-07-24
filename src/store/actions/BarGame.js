import {
  GET_BAR_GAME,
  GET_BAR_GAME_SUCCESS,
  GET_BAR_GAME_FAILURE,
} from "../types";

export const getBarGame = (payload) => {
  return {
    type: GET_BAR_GAME,
    payload: payload
  };
};

export const getBarGameSuccess = (data) => {
  return {
    type: GET_BAR_GAME_SUCCESS,
    payload: data,
  };
};

export const getBarGameFailure = (error) => {
  return {
    type: GET_BAR_GAME_FAILURE,
    payload: error,
  };
};
