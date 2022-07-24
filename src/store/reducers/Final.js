import {
    GET_FINAL_DETAIL,
    GET_FINAL_DETAIL_FAILURE,
    GET_FINAL_DETAIL_SUCCESS,
  } from "../types";
  
  const INIT_STATE = {
    data: null,
    loading: false,
  };
  
  const Final = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_FINAL_DETAIL:
        return { ...state, loading: true };
      case GET_FINAL_DETAIL_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case GET_FINAL_DETAIL_FAILURE:
        return { ...state, isError: true, loading: false, err: action.payload };
      default:
        return { ...state };
    }
  };
  
  export default Final;
  