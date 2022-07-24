import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import {
  getUsernamesSuccess,
  getUsernamesFailure,
} from "../actions/TeamDetail";
import { GET_USERNAMES } from "../types";

import { db } from "../../utils/init-firebase";
import {
  getDoc,
  doc,
  documentId,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { MAX_RETRY_COUNT, RETRY_INTERVAL } from "../constants";

const getUsernamesData = async (members) => {
  const q = query(
    collection(db, "usernames"),
    where(documentId(), "in", members.payload),
  )
  const docsData = await getDocs(q);
  if (!docsData.empty) {
    let usernames = [];
    docsData.forEach((oneUsername)=>{
        usernames.push(oneUsername.data().username)
    });
    return usernames
  } else {
    return null;
  }
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
  yield all([fork(callUsernames)]);
}
