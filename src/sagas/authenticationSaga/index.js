import { put, takeEvery } from "redux-saga/effects"
import { onLogInSuccess } from "../../actions/authentication"
import { LOG_IN } from "../../constants/actionTypes"
import firebase from "../../firebase"

export function* login(action) {
  console.log(action)
  firebase
    .auth()
    .signInWithEmailAndPassword(action.payload.email, action.payload.password)
    .then(res => {
      console.log("success", res)
    })
    .catch(err => {
      console.log("error", err)
    })

  yield put(onLogInSuccess())
}

export function* watchLogIn() {
  yield takeEvery(LOG_IN, login)
}
