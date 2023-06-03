import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { getBarGameSuccess, getBarGameFailure, saveAnswerSuccess } from "../actions/BarGame";
import { GET_BAR_GAME, SAVE_ANSWER } from "../types";

import { db } from "../../utils/init-firebase";
import { collection, getDoc, doc, setDoc, arrayUnion } from "firebase/firestore";
import { MAX_RETRY_COUNT, RETRY_INTERVAL } from "../constants";
import { getTeamDetailFailure, getTeamDetailSuccess } from "../actions/TeamDetail";

const getBarGameData = async (id) => {
  const docRef = doc(collection(db, "barGames"),id);
  const docData = await getDoc(docRef);
  if (docData.exists) {
    return docData.data();
  } else {
    return null;
  }
};

const saveAnswerData = async (data) =>{
  const team = data.team;
  const game = data.game;

  const docRef = doc(collection(db, "teams"),team);
  const docData = await getDoc(docRef);
  let teamGames;
  
  if(docData.exists){
    teamGames = [...docData.data().routeGames];
    const gamePos = teamGames.findIndex((g)=>game===g.barGame.id);
    if (gamePos>-1)
      teamGames[gamePos].status = "completed";
      if(gamePos<6)
        teamGames[gamePos+1].status = "consumable";
    const docData2 = await setDoc(doc(db,"teams",team),{
      routeGames:teamGames
    },{merge:true}).then(
      ()=>getDoc(doc(db,"teams",team))
    )
    if(docData2.exists){
      return docData2.data();
    }else{
      return null
    }
  }else{
    return null
  }

}

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

function* saveAnswer(payload) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      saveAnswerData,
      payload.payload
    );
    if (data) {
      yield put(getTeamDetailSuccess(data))
      yield put(saveAnswerSuccess())
    };
  } catch (error) {
    yield put(getTeamDetailFailure(error));
  }
}

export function* callBarGame() {
  yield takeEvery(GET_BAR_GAME, getBarGame);
}

export function* callSaveAnswer() {
  yield takeEvery(SAVE_ANSWER, saveAnswer);
}

export default function* rootSaga() {
  yield all([fork(callBarGame),fork(callSaveAnswer)]);
}
