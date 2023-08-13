import {
    GET_TAPA_DETAIL,
    GET_TAPA_DETAIL_FAILURE,
    GET_TAPA_DETAIL_SUCCESS,
    UPDATE_TAPA
  } from "../types";
  
  const INIT_STATE = {
    data: null,
    loading: false,
    error:null,
  };
  
  const TapasDetail = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_TAPA_DETAIL:
        return { ...state, loading: true };
      case UPDATE_TAPA:
        return { ...state, loading: true };
      case GET_TAPA_DETAIL_SUCCESS:
        return { ...state, loading: false, data: action.payload,error:null };
      case GET_TAPA_DETAIL_FAILURE:
        return { ...state, loading: false, error: action.payload,data:null };
      default:
        return { ...state };
    }
  };
  
  export default TapasDetail;
  