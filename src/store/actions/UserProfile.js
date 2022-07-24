import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
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
