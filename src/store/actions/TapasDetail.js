import {
  GET_TAPA_DETAIL,
  GET_TAPA_DETAIL_SUCCESS,
  GET_TAPA_DETAIL_FAILURE,
  UPDATE_TAPA,
} from "../types";

export const getTapaDetail = (payload) => {
  return {
    type: GET_TAPA_DETAIL,
    payload: payload,
  };
};

export const getTapaDetailSuccess = (payload) => {
  return {
    type: GET_TAPA_DETAIL_SUCCESS,
    payload: payload,
  };
};

export const getTapaDetailFailure = (payload) => {
  return {
    type: GET_TAPA_DETAIL_FAILURE,
    payload: payload,
  };
};

export const updateTapa = (id) => {
  return {
    type: UPDATE_TAPA,
    id: id,
  };
};