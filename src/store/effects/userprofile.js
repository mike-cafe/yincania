import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import {
  getUsernamesSuccess,
  getUsernamesFailure,
} from "../actions/TeamDetail";
import { GET_USER_PROFILE } from "../types";

import { db } from "../../utils/init-firebase";
import { getDoc, doc } from "firebase/firestore";
import { MAX_RETRY_COUNT, RETRY_INTERVAL } from "../constants";
import { getUserProfileFailure, getUserProfileSuccess } from "../actions/UserProfile";
import { LocalStorage } from "../LocalStorage";

const getUserProfileData = async (request) => {
  const id = localStorage.getItem(LocalStorage.USER_ID);
  const docRef = doc(db, "users", id);
  const docData = await getDoc(docRef);
  if (docData.exists) {
    return docData.data();
  } else {
    return null;
  }
};

function* getUserProfile(id) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getUserProfileData,
      id
    );
    if (data) yield put(getUserProfileSuccess(data));
  } catch (error) {
    yield put(getUserProfileFailure(error));
  }
}
export default function* callUserProfile() {
  yield takeEvery(GET_USER_PROFILE, getUserProfile);
}

