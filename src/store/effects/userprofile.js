import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import {
  getUsernamesSuccess,
  getUsernamesFailure,
} from "../actions/TeamDetail";
import { GET_USER_PROFILE, REMOVE_TEAM, SAVE_USER_DATA } from "../types";

import { db } from "../../utils/init-firebase";
import { getDoc, doc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { MAX_RETRY_COUNT, RETRY_INTERVAL } from "../constants";
import {
  getUserProfileFailure,
  getUserProfileSuccess,
  removeTeamFailure,
  removeTeamSuccess,
} from "../actions/UserProfile";
import { LocalStorage } from "../LocalStorage";
import { showToast } from "../actions/UserFeedback";

const getUserProfileData = async (request) => {
  const id = localStorage.getItem(LocalStorage.USER_ID);
  const docRef = doc(db, "users", id);
  const docData = await getDoc(docRef);
  if (docData.exists()) {
    return docData.data();
  } else {
    return null;
  }
};

const saveUserData = async (action) => {
  const uid = action.payload.uid;
  const docRef = doc(db, "users", uid);
  try {
    const docData = await setDoc(
      docRef,
      {
        ...action.payload,
        newRoute: null,
        routes: arrayUnion(action.payload.newRoute || {}),
      },
      { merge: true }
    ).then(() => getDoc(docRef));
    return docData.data();
  } catch (e) {
    return null;
  }
};

const remoteTeamData = async (action) => {
  const userRoutes = action.payload.routes;
  const routeId = action.payload.route;
  const user = action.payload.user;
  const routePos = userRoutes.findIndex((r) => routeId === r.id);
  if (routePos != -1) userRoutes.splice(routePos, 1);
  try {
    const updatedData = await updateDoc(doc(db, "users", user), {
      routes: userRoutes,
    });
    return updatedData;
  } catch (e) {
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
    if (data) {
      yield put(getUserProfileSuccess(data));
    }
  } catch (error) {
    yield put(getUserProfileFailure(error));
  }
}

function* saveUserProfileData(payload) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      saveUserData,
      payload
    );
    if (data) {
      yield put(
        showToast({
          title: "Datos de usuario actualizados",
          status: "success",
          duration: 4500,
          isClosable: true,
        })
      );
      yield put(getUserProfileSuccess(data));
    }
  } catch (error) {
    yield put(getUserProfileFailure(error));
  }
}

function* removeTeam(action) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      remoteTeamData,
      action
    );
    if (data) {
      yield put(removeTeamSuccess(data));
      action.payload.navigate(`/app/detail/${action.payload.route}`);
    }
  } catch (error) {
    yield put(removeTeamFailure(error));
  }
}

export function* callUserProfile() {
  yield takeEvery(GET_USER_PROFILE, getUserProfile);
}

export function* callSaveUserProfileData() {
  yield takeEvery(SAVE_USER_DATA, saveUserProfileData);
}

export function* callRemoveTeam() {
  yield takeEvery(REMOVE_TEAM, removeTeam);
}

export default function* rootSaga() {
  yield all([
    fork(callUserProfile),
    fork(callRemoveTeam),
    fork(callSaveUserProfileData),
  ]);
}
