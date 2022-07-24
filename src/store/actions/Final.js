import {
    GET_FINAL_DETAIL,
    GET_FINAL_DETAIL_SUCCESS,
    GET_FINAL_DETAIL_FAILURE,
  } from "../types";
  

  export const getFinalDetail = (docRef) => {
    return {
      type: GET_FINAL_DETAIL,
      payload: docRef
    };
  };

  export const getFinalDetailSuccess = (data) => {
    return {
      type: GET_FINAL_DETAIL_SUCCESS,
      payload: data,
    };
  };
  
  export const getFinalDetailFailure = (error) => {
    return {
      type: GET_FINAL_DETAIL_FAILURE,
      payload: error,
    };
  };
  
  