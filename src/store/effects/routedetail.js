import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { getRouteDetailSuccess,getRouteDetailFailure } from "../actions/RouteDetail";
import { GET_ROUTE_DETAIL } from "../types";

import { db } from "../../utils/init-firebase";
import { getDoc, doc } from "firebase/firestore";
import { MAX_RETRY_COUNT, RETRY_INTERVAL } from "../constants";

const getRouteDetailData = async (request) => {  
  const docRef = doc(db, "routes", request.payload);
  const docData = await getDoc(docRef);

  if (docData.exists) {
    return docData.data();
  } else {
    return null;
  }
};

function* getRouteDetail(id) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getRouteDetailData,
      id
    );
    if (data) yield put(getRouteDetailSuccess(data));
  } catch (error) {
    yield put(getRouteDetailFailure(error));
  }
}
export function* callRouteDetail() {
  yield takeEvery(GET_ROUTE_DETAIL, getRouteDetail);
}

export default function* rootSaga() {
  yield all([fork(callRouteDetail)]);
}
