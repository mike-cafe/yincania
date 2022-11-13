import {
  GET_BAR_GAME,
  GET_BAR_GAME_SUCCESS,
  GET_BAR_GAME_FAILURE,
  SAVE_ANSWER,
  SAVE_ANSWER_SUCCESS,
  RESET_GAME
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

export const saveAnswer = (payload) => {
  return {
    type: SAVE_ANSWER,
    payload: payload
  };
};

export const saveAnswerSuccess = (payload) => {
  return {
    type: SAVE_ANSWER_SUCCESS,
    payload: payload
  };
};

export const resetGame = () => {
  return {
    type: RESET_GAME
  };
};
