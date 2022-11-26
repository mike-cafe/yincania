import {
  GET_TEAM_DETAIL,
  GET_TEAM_DETAIL_SUCCESS,
  GET_TEAM_DETAIL_FAILURE,
  GET_USERNAMES,
  GET_USERNAMES_SUCCESS,
  GET_USERNAMES_FAILURE,
  FIND_TEAM,
  FIND_TEAM_SUCCESS,
  FIND_TEAM_FAILURE,
  RESET_FIND_TEAM
} from "../types";

export const resetTeamStates = () => ({
  type: "RESET_TEAM_STATE",
});

export const getTeamDetail = (payload) => {
  return {
    type: GET_TEAM_DETAIL,
    payload: payload,
  };
};

export const getTeamDetailSuccess = (data) => {
  return {
    type: GET_TEAM_DETAIL_SUCCESS,
    payload: data,
  };
};

export const getTeamDetailFailure = (error) => {
  return {
    type: GET_TEAM_DETAIL_FAILURE,
    payload: error,
  };
};

export const getUsernames = (payload) => {
  return {
    type: GET_USERNAMES,
    payload: payload,
  };
};

export const getUsernamesSuccess = (data) => {
  return {
    type: GET_USERNAMES_SUCCESS,
    payload: data,
  };
};

export const getUsernamesFailure = (error) => {
  return {
    type: GET_USERNAMES_FAILURE,
    payload: error,
  };
};

export const findTeam = (payload) => {
  return {
    type: FIND_TEAM,
    payload: payload,
  };
};

export const findTeamSuccess = (data) => {
  return {
    type: FIND_TEAM_SUCCESS,
    payload: data,
  };
};

export const findTeamFailure = (error) => {
  return {
    type: FIND_TEAM_FAILURE,
    payload: error,
  };
};

export const resetFindTeam = () => {
  return {
    type: RESET_FIND_TEAM,
  };
};