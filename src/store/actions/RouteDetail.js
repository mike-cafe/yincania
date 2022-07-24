import {
    GET_ROUTE_DETAIL,
    GET_ROUTE_DETAIL_FAILURE,
    GET_ROUTE_DETAIL_SUCCESS,
    GET_FINAL_DETAIL,
    GET_FINAL_DETAIL_SUCCESS,
    GET_FINAL_DETAIL_FAILURE,
  } from "../types";
  
  export const getRouteDetail = (payload) => {
    return {
      type: GET_ROUTE_DETAIL,
      payload: payload
    };
  };
  
  export const getFinalDetail = (docRef) => {
    return {
      type: GET_FINAL_DETAIL,
      payload: docRef
    };
  };

  export const getRouteDetailSuccess = (data) => {
    return {
      type: GET_ROUTE_DETAIL_SUCCESS,
      payload: data,
    };
  };
  
  export const getRouteDetailFailure = (error) => {
    return {
      type: GET_ROUTE_DETAIL_FAILURE,
      payload: error,
    };
  };
  