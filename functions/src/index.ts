import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {
  Timestamp,
  FieldPath,
  CollectionReference,
  DocumentReference,
} from "firebase-admin/firestore";

admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const addTeamRoute = functions
    .region("europe-west3")
    .firestore.document("teams/{docId}")
    .onCreate((snap, context) => {
      const docData = snap.data();
      const routeId = docData.route;
      return db
          .doc(`routes/${routeId}`)
          .get()
          .then((docSnap) => {
            const routeData = docSnap.data();
            functions.logger.info(routeData);
            const shuffledStages = routeData?.stages.sort(
                () => Math.random() - 0.5
            );
            functions.logger.info(shuffledStages);
            const stageObjects = [...shuffledStages, routeData?.final].map(
                (stage, idx) => {
                  return {
                    ...stage,
                    pos: idx + 1,
                    status: idx != 0 ? "hidden" : "playable",
                  };
                }
            );
            functions.logger.info(snap.ref.id.substring(0, 5));
            stageObjects[0].startTime = routeData?.date;
            return snap.ref.update({
              routeGames: stageObjects,
              code: snap.ref.id.substring(0, 5),
            });
          });
    });

export const disableUser = functions
    .region("europe-west3")
    .https.onCall((data, context) => {
      const uid: string | undefined = context.auth?.uid;
      if (!uid) {
        return new functions.https.HttpsError("unauthenticated", "No user");
      }
      try {
        return auth.updateUser(uid, {disabled: true});
      } catch (e: any) {
        functions.logger.error("An internal error" + e);
        throw new functions.https.HttpsError("internal", e);
      }
    });

export const createTapa = functions
    .region("europe-west3")
    .https.onCall((data, context) => {
      const uid = context.auth?.uid;
      if (!uid) {
        return new functions.https.HttpsError("unauthenticated", "No user");
      }
      const team = data.team;
      const game = data.game;
      const bar = data.bar;
      let tapasRef: CollectionReference;
      let barRef: DocumentReference;
      try {
        tapasRef = db.collection("tapas");
        barRef = db.doc("/bars/" + bar);
      } catch (e: any) {
        functions.logger.error("References not found" + e);
        throw new functions.https.HttpsError("invalid-argument", e);
      }

      try {
        return tapasRef
            .where("team", "==", team)
            .where("game", "==", game)
            .get()
            .then((snapshot) => {
              if (snapshot.empty) {
                const now = new Date();
                const expiration = new Date();
                expiration.setDate(now.getDate() + 1);
                const expStamp = Timestamp.fromDate(expiration);
                return barRef.get().then((snap) => {
                  return tapasRef
                      .add({
                        ...data,
                        code: snap.get("code"),
                        consumed: false,
                        expiration: expStamp,
                      })
                      .then((ref) => ref.id);
                });
              } else {
                return snapshot.docs[0].id;
              }
            });
      } catch (e: any) {
        functions.logger.error("An internal error" + e);
        throw new functions.https.HttpsError("internal", e);
      }
    });

export const retrieveTapa = functions
    .region("europe-west3")
    .https.onCall((data, context) => {
      const code: string = data.code;
      const id: string = data.id;
      try {
        return db
            .collection("tapas")
            .where(FieldPath.documentId(), "==", id)
            .where("code", "==", code)
            .get()
            .then((snap) => {
              if (snap.empty) {
                functions.logger.error("Not available");
                throw new functions.https.HttpsError("invalid-argument", "");
              } else {
                return snap.docs[0].data();
              }
            })
            .catch((e: any) => {
              functions.logger.error("An internal error" + e);
              throw new functions.https.HttpsError("internal", e);
            });
      } catch (e: any) {
        functions.logger.error("An internal error" + e);
        throw new functions.https.HttpsError("internal", e);
      }
    });

export const updateTapa = functions
    .region("europe-west3")
    .https.onCall((data, context) => {
      const id = data.id;

      return db
          .doc("/tapas/" + id)
          .set({consumed: true}, {merge: true})
          .then((snap) => {
            return db
                .doc("/tapas/" + id)
                .get()
                .then((ref) => ref.data());
          })
          .catch((e) => {
            functions.logger.error("An internal error" + e);
            throw new functions.https.HttpsError("internal", e);
          });
    });

export const changeFieldName = functions
    .region("europe-west3")
    .https.onCall((data, context) => {
      return db
          .doc("/routes/r6plJzPYmR3seW6Yst0t")
          .get()
          .then((snap) => {
            const routeData = snap.data();
            return db.collection("/routes").add({
              stages: routeData?.status,
              ...routeData,
              status: "open",
            });
          })
          .catch((e) => {
            functions.logger.error("An internal error" + e);
            throw new functions.https.HttpsError("internal", e);
          });
    });

export const achieveGame = functions
    .region("europe-west3")
    .firestore.document("tapas/{docId}")
    .onUpdate((snap, context) => {
      const docData = snap.after.data();
      const isConsumed = docData.consumed;
      const barGame = docData.game;
      const team = docData.team;
      return db
          .doc(`teams/${team}`)
          .get()
          .then((docSnap) => {
            const docData = docSnap.data();
            if (!docData) {
              throw new functions.https.HttpsError("failed-precondition", "");
            }
            const gamesData = [...docData.routeGames];
            const gamePos = gamesData.findIndex(
                (res: any) => res.barGame.id === barGame
            );
            if (isConsumed && gamePos > -1) {
              gamesData[gamePos] = {
                ...gamesData[gamePos],
                status: "completed",
                finishTime: Timestamp.now(),
              };
              if (gamePos < 6) {
                gamesData[gamePos + 1] = {
                  ...gamesData[gamePos + 1],
                  status: "playable",
                  startTime: Timestamp.now(),
                };
              }
              return docSnap.ref.set(
                  {
                    routeGames: gamesData,
                  },
                  {merge: true}
              );
            } else {
              return docSnap.data();
            }
          });
    });

export const computeResults = functions
    .region("europe-west3")
    .firestore.document("routes/{docId}")
    .onUpdate((snap, context) => {
    // check whether route changed to "finished"
      const dataAfter = snap.after.data();
      const dataBefore = snap.before.data();
      if (dataAfter.status === dataBefore.status) return null;

      if (dataAfter.status !== "finished") return null;

      // retrieve all teams that participated in the route
      const routeId: string = snap.after.id;
      return db
          .collection("teams")
          .where("route", "==", routeId)
          .get()
          .then((snaps) => {
            // transform into array of results
            return Promise.all(snaps.docs.map((doc) => {
              const teamData = doc.data();
              return db.collection("teams").doc(doc.id).set({
                routeFinished: true,
                hasCompleted: hasTeamFinished(teamData.routeGames),
              }, {merge: true})
                  .catch(
                      (e)=>new functions.https.HttpsError("internal", e.message)
                  )
                  .then(
                      ()=>{
                        return {
                          id: doc.id,
                          name: teamData.name,
                          shield: teamData.shield,
                          warcry: teamData.warcry,
                          time: getTeamTime(teamData),
                          hasFinished: hasTeamFinished(teamData.routeGames),
                        };
                      }
                  );
            }))
                .catch((e) => {
                  return new functions.https.HttpsError("internal", e.message);
                })
                .then(
                    (res)=>{
                      return snap.after.ref.set(
                          {
                            board: res,
                          },
                          {merge: true}
                      );
                    }
                );
            // write the data into the route under field "board"
          });
    });

/**
 * @param {any} teamData an object with time information.
 * @return {Number} duration of time.
 * */
function getTeamTime(teamData: any) {
  const startTime = Math.min.apply(
      null,
      teamData.routeGames.map((route: any) => route.startTime)
  );
  const finishTime = Math.max.apply(
      null,
      teamData.routeGames.map((route: any) => route.finishTime)
  );
  if (!finishTime || !startTime) return null;
  return Number(((finishTime - startTime) / 60).toFixed(1));
}

/**
 * @param {any} routeGamesData an object with time information.
 * @return {boolean} if it has finished or not.
 * */
function hasTeamFinished(routeGamesData: any) {
  const allFinishTimes =
    routeGamesData.map((route: any) => route.finishTime).length != 7;
  const allCompleted = routeGamesData.some(
      (route: any) => route.status != "completed"
  );
  if (allFinishTimes || allCompleted) {
    return false;
  } else {
    return true;
  }
}
