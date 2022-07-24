import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { getFinalDetailSuccess,getFinalDetailFailure } from "../actions/Final";
import { GET_FINAL_DETAIL } from "../types";

import { getDoc } from "firebase/firestore";
import { MAX_RETRY_COUNT, RETRY_INTERVAL } from "../constants";

const getFinalData = async (docRef) => {  
  const docData = await getDoc(docRef);

  if (docData.exists) {
    return docData.data();
  } else {
    return null;
  }
};

function* getFinal(payload) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getFinalData,
      payload.payload
    );
    if (data) yield put(getFinalDetailSuccess(data));
  } catch (error) {
    yield put(getFinalDetailFailure(error));
  }
}
export function* callFinal() {
  yield takeEvery(GET_FINAL_DETAIL, getFinal);
}

export default function* rootSaga() {
  yield all([fork(callFinal)]);
}
