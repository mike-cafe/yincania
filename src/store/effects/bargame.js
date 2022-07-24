import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { getBarGameSuccess, getBarGameFailure } from "../actions/BarGame";
import { GET_BAR_GAME } from "../types";

import { db } from "../../utils/init-firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { MAX_RETRY_COUNT, RETRY_INTERVAL } from "../constants";

const getBarGameData = async (data) => {
  
  const docSnap = query(
    collection(db, "barGames"),
    where("route", "==", data.routeID),
    where("bar", "==", data.barID)
  );
  
  const docData = await getDocs(docSnap);
  
  if (!docData.empty) {
    return docData.docs[0].data();
  } else {
    return null;
  }
};

function* getBarGame(payload) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getBarGameData,
      payload.payload
    );
    if (data) yield put(getBarGameSuccess(data));
  } catch (error) {
    yield put(getBarGameFailure(error));
  }
}
export function* callBarGame() {
  yield takeEvery(GET_BAR_GAME, getBarGame);
}

export default function* rootSaga() {
  yield all([fork(callBarGame)]);
}
