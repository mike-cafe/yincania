import { MAX_RETRY_COUNT, RETRY_INTERVAL } from "../constants";
import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import {
  getTapaDetailSuccess,
  getTapaDetailFailure,
} from "../actions/TapasDetail";
import { GET_TAPA_DETAIL, UPDATE_TAPA } from "../types";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../utils/init-firebase";

const getTapasDetailData = async (request) => {
  const retrieveTapaCallable = httpsCallable(functions, "retrieveTapa");
  const tapaData = await retrieveTapaCallable({
    id: request.payload.id,
    code: request.payload.code,
  });

  if (tapaData) {
    return tapaData.data;
  } else {
    return null;
  }
};

const updateTapaData = async (id) => {
  const updateTapaCallable = httpsCallable(functions, "updateTapa");

  const tapaData = await updateTapaCallable(id);

  if (tapaData) {
    return tapaData.data;
  } else {
    return null;
  }
};


function* getTapasDetail(payload) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getTapasDetailData,
      payload
    );
    if (data) yield put(getTapaDetailSuccess(data));
  } catch (error) {
    yield put(getTapaDetailFailure(error));
  }
}

function* updateTapa(id) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      updateTapaData,
      id
    );
    if (data) yield put(getTapaDetailSuccess(data));
  } catch (error) {
    yield put(getTapaDetailFailure(error));
  }
}

export function* callTapaDetail() {
  yield takeEvery(GET_TAPA_DETAIL, getTapasDetail);
}

export function* callUpdateTapa() {
  yield takeEvery(UPDATE_TAPA, updateTapa);
}

export default function* rootSaga() {
  yield all([fork(callTapaDetail), fork(callUpdateTapa)]);
}
