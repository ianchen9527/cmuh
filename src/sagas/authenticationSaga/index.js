import { delay } from "redux-saga"
import { put, takeEvery, call } from "redux-saga/effects"
import { onLogInSuccess } from "../../actions/authentication"
import { LOG_IN } from "../../constants/actionTypes"
import firebase from "../../firebase"

export function* login() {
  const email = "ianchen9527@gmail.com"
  const password = "ian770624"

  firebase.auth().onAuthStateChanged(function(user) {
    console.log(user.displayName)
  })
  firebase.auth().signInWithEmailAndPassword(email, password)

  yield put(onLogInSuccess())
}

export function* watchLogIn() {
  yield takeEvery(LOG_IN, login)
}
