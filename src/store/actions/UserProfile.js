import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  REMOVE_TEAM,
  REMOVE_TEAM_SUCCESS,
  REMOVE_TEAM_FAILURE,
  SAVE_USER_DATA,
  SAVE_USER_DATA_SUCCESS,
  SAVE_USER_DATA_FAILURE,
  RESET_USER_DATA
} from "../types";

export const getUserProfile = (payload) => {
  return {
    type: GET_USER_PROFILE,
    payload: payload,
  };
};

export const getUserProfileSuccess = (data) => {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    payload: data,
  };
};

export const getUserProfileFailure = (error) => {
  return {
    type: GET_USER_PROFILE_FAILURE,
    payload: error,
  };
};

export const removeTeam = (payload) => {
  return {
    type: REMOVE_TEAM,
    payload: payload,
  };
};

export const removeTeamSuccess = (data) => {
  return {
    type: REMOVE_TEAM_SUCCESS,
    payload: data,
  };
};

export const removeTeamFailure = (error) => {
  return {
    type: REMOVE_TEAM_FAILURE,
    payload: error,
  };
};


export const saveUserData = (payload) => {
  return {
    type: SAVE_USER_DATA,
    payload: payload,
  };
};

export const saveUserDataSuccess = (data) => {
  return {
    type: SAVE_USER_DATA_SUCCESS,
    payload: data,
  };
};

export const saveUserDataFailure = (error) => {
  return {
    type: SAVE_USER_DATA_FAILURE,
    payload: error,
  };
};

export const resetUserData = () =>{
  return {
    type:RESET_USER_DATA,
    payload:{}
  }
}