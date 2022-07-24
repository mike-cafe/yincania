import { GET_ROUTES, GET_ROUTES_SUCCESS, GET_ROUTES_FAILURE } from "../types";

const INIT_STATE = {
  data: null,
  loading: false,
};

const Routes = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROUTES:
      return { ...state, loading: true };
    case GET_ROUTES_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_ROUTES_FAILURE:
      return { ...state, isError: true, loading: false, err: action.payload };
    default:
      return { ...state };
  }
};

export default Routes;
