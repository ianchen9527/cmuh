import { put, takeEvery } from "redux-saga/effects"
import {
  onLogInSuccess,
  onLogOutSuccess,
  onLogInFail
} from "../../actions/authentication"
import { LOG_IN, LOG_OUT } from "../../constants/actionTypes"
import firebase from "../../firebase"

export function* login(action) {
  try {
    yield firebase
      .auth()
      .signInWithEmailAndPassword(action.payload.email, action.payload.password)
    yield put(onLogInSuccess())
  } catch (error) {
    yield put(onLogInFail(error.message))
  }
}

export function* watchLogIn() {
  yield takeEvery(LOG_IN, login)
}

export function* logout() {
  try {
    yield firebase.auth().signOut()
    yield put(onLogOutSuccess())
  } catch (error) {
    console.log(error)
  }
}

export function* watchLogOut() {
  yield takeEvery(LOG_OUT, logout)
}
