import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { ADD_MEMBER, REMOVE_USER, SAVE_TEAM_DATA } from "../types";
import { db } from "../../utils/init-firebase";
import {
  doc,
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  increment,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { MAX_RETRY_COUNT, RETRY_INTERVAL } from "../constants";
import {
  getTeamDetailFailure,
  getTeamDetailSuccess,
  resetTeamStates,
} from "../actions/TeamDetail";
import { showToast } from "../actions/UserFeedback";
import reduxSaga from "redux-saga";
import { saveUserData } from "../actions/UserProfile";

const saveDataApi = async (payload) => {
  const { navigate, ...rest } = payload;
  if (rest) {
    const docRef = await addDoc(collection(db, "teams"), {
      ...rest,
      members: [rest.owner],
      started: Timestamp.now(),
      memberCounter: 1,
    });
    return {
      ...rest,
      members: [rest.owner],
      started: Timestamp.now(),
      memberCounter: 1,
      teamId: docRef.id,
    };
  } else {
    return null;
  }
};

const addMemberApi = async (payload) => {
  const member = payload.member;
  const team = payload.team;
  try {
    await updateDoc(doc(db, "teams", team.teamId), {
      members: arrayUnion(member),
    });
    return {
      ...team,
      members: [...team.members, member],
    };
  } catch (e) {
    return null;
  }
};

const removeUserApi = async (payload) => {
  const teamMembers = payload.members;
  const user = payload.user;
  const userPos = teamMembers.findIndex((r) => user === r);
  if (userPos != -1) teamMembers.splice(userPos, 1);
  try {
    const updatedData = await updateDoc(doc(db, "teams", payload.id), {
      members: teamMembers,
    });
    return { routeId: payload.route };
  } catch (e) {
    return e;
  }
};

function* saveData({ payload }) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      saveDataApi,
      payload
    );
    if (data) {
      yield put(getTeamDetailSuccess(data));
      yield put(
        showToast({
          title: "Equipo creado con éxito",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      );
      payload.navigate(
        `/app/view/team/${data.teamId}?routeId=${payload.route}`
      );
    }
  } catch (error) {
    yield put(getTeamDetailFailure(error));
  }
}

function* removeUser({ payload }) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      removeUserApi,
      payload
    );
    if (data) {
      yield put(resetTeamStates());
      yield put(
        showToast({
          title: "Has abandonado el equipo",
          status: "info",
          duration: 4000,
          isClosable: true,
        })
      );
      payload.navigate(`/app/detail/${data.routeId}`);
    }
  } catch (error) {
    yield put(getTeamDetailFailure(error));
  }
}

function* addMember({ payload }) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      addMemberApi,
      payload
    );
    if (data) {
      yield put(getTeamDetailSuccess(data));
      yield put(resetTeamStates());
      yield put(
        saveUserData({
          uid: payload.member,
          newRoute: {
            id: payload.route,
            team: payload.team.teamId,
          },
        })
      );
      yield put(
        showToast({
          title: "Te has unido al equipo",
          status: "success",
          duration: 4000,
          isClosable: true,
        })
      );
      payload.navigate(
        `/app/view/team/${data.teamId}?routeId=${payload.route}`
      );
    }
  } catch (error) {
    yield put(getTeamDetailFailure(error));
  }
}

export function* callSaveData() {
  yield takeEvery(SAVE_TEAM_DATA, saveData);
}

export function* callAddMember() {
  yield takeEvery(ADD_MEMBER, addMember);
}

export function* callRemoveUser() {
  yield takeEvery(REMOVE_USER, removeUser);
}

export default function* rootSaga() {
  yield all([fork(callSaveData), fork(callRemoveUser), fork(callAddMember)]);
}
