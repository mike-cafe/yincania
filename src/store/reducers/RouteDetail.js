import {
  GET_ROUTE_DETAIL,
  GET_ROUTE_DETAIL_FAILURE,
  GET_ROUTE_DETAIL_SUCCESS,
} from "../types";

const INIT_STATE = {
  data: null,
  loading: false,
};

const RouteDetail = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROUTE_DETAIL:
      return { ...state, loading: true };
    case GET_ROUTE_DETAIL_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_ROUTE_DETAIL_FAILURE:
      return { ...state, isError: true, loading: false, err: action.payload };
    default:
      return { ...state };
  }
};

export default RouteDetail;
