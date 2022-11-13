import {
    SAVE_TEAM_DATA,
    SAVE_TEAM_DATA_SUCCESS,
    SAVE_TEAM_DATA_FAILURE,
    REMOVE_USER,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_FAILURE,
    ADD_MEMBER,
    ADD_MEMBER_SUCCESS,
    ADD_MEMBER_FAILURE,
  } from "../types";
  
  export const saveTeamData = (data) => ({
    type: SAVE_TEAM_DATA,
    payload: data,
  });

  export const saveTeamDataSuccess = (data) => ({
    type: SAVE_TEAM_DATA_SUCCESS,
    payload: data,
  });

  export const saveTeamDataFailure = (error) => ({
    type: SAVE_TEAM_DATA_FAILURE,
    payload: error,
  });

  export const addMember = (data) => ({
    type: ADD_MEMBER,
    payload: data,
  });

  export const addMemberSuccess = (data) => ({
    type: ADD_MEMBER_SUCCESS,
    payload: data,
  });

  export const addMemberFailure = (error) => ({
    type: ADD_MEMBER_FAILURE,
    payload: error,
  });

  export const removeUser = (data) => ({
    type: REMOVE_USER,
    payload: data,
  });

  export const removeUserSuccess = (data) => ({
    type: REMOVE_USER_SUCCESS,
    payload: data,
  });

  export const removeUserFailure = (error) => ({
    type: REMOVE_USER_FAILURE,
    payload: error,
  });

