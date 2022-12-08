import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import {
  getTeamDetailSuccess,
  getTeamDetailFailure,
  getUsernamesSuccess,
  getUsernamesFailure,
  findTeamFailure,
  findTeamSuccess,
} from "../actions/TeamDetail";
import { FIND_TEAM, GET_TEAM_DETAIL, GET_USERNAMES } from "../types";

import { db } from "../../utils/init-firebase";
import {
  getDoc,
  doc,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { MAX_RETRY_COUNT, RETRY_INTERVAL } from "../constants";

const getTeamDetailData = async (request) => {
  const docRef = doc(db, "teams", request.payload);
  const docData = await getDoc(docRef);

  if (docData.exists) {
    return {...docData.data(),id:request.payload};
  } else {
    return null;
  }
};

const findTeamApi = async (request) => {
  const teamsRef = collection(db, "teams");
  const q = query(teamsRef, where("code", "==", request.payload));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.error("empty!");
    return null;
  } else if (querySnapshot.size > 1) {
    console.error("more than one!");
    return null;
  } else {
    return {
      teamId: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };
  }
};

function* findTeam(code) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      findTeamApi,
      code
    );
    if (data) {
      yield put(findTeamSuccess(data));
      yield put(getTeamDetailSuccess(data));
    }else{
      yield put(findTeamFailure({message:"not found"}));
    }
  } catch (error) {
    yield put(findTeamFailure(error));
  }
}

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

export function* callFindTeam() {
  yield takeEvery(FIND_TEAM, findTeam);
}

const getUsernamesData = async (members) => {
  let teamUsernames = [];
  const docData = await getDoc(members[0]);
  return teamUsernames;
};

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
  yield all([fork(callTeamDetail), fork(callFindTeam)]);
}
