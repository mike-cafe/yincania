import {
    GET_ROUTES,
    GET_ROUTES_SUCCESS,
    GET_ROUTES_FAILURE,
  } from "../types";

  export const getRoutesData = () => {
    return {
      type: GET_ROUTES,
      payload: {},
    };
  }
  
  export const getRoutesDataSuccess = (data) => {
    return {
      type: GET_ROUTES_SUCCESS,
      payload: data,
    };
  }
  
  export const getRoutesDataFailure = (error) => {
    return {
      type: GET_ROUTES_FAILURE,
      payload: error,
    };
  };
  