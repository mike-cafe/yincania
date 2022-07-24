import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import {
  getTeamDetailSuccess,
  getTeamDetailFailure,
  getUsernamesSuccess,
  getUsernamesFailure,
} from "../actions/TeamDetail";
import { GET_TEAM_DETAIL, GET_USERNAMES } from "../types";

import { db } from "../../utils/init-firebase";
import { getDoc, doc } from "firebase/firestore";
import { MAX_RETRY_COUNT, RETRY_INTERVAL } from "../constants";

const getTeamDetailData = async (request) => {
  const docRef = doc(db, "teams", request.payload);
  const docData = await getDoc(docRef);

  if (docData.exists) {
    return docData.data();
  } else {
    return null;
  }
};

function* getTeamDetail(id) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getTeamDetailData,
      id
    );
    if (data) yield put(getTeamDetailSuccess(data));
  } catch (error) {
    yield put(getTeamDetailFailure(error));
  }
}
export function* callTeamDetail() {
  yield takeEvery(GET_TEAM_DETAIL, getTeamDetail);
}


const getUsernamesData = async (members) =>{
  let teamUsernames = []
  const docData = await getDoc(members[0]);
  return teamUsernames
}


function* getUsernames(members) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getUsernamesData,
      members
    );
    if (data) yield put(getUsernamesSuccess(data));
  } catch (error) {
    yield put(getUsernamesFailure(error));
  }
}
export function* callUsernames() {
  yield takeEvery(GET_USERNAMES, getUsernames);
}

export default function* rootSaga() {
  yield all([fork(callTeamDetail)]);
}
