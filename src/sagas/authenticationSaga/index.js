import { delay } from "redux-saga"
import { put, takeEvery } from "redux-saga/effects"
import { onLogInSuccess } from "../../actions/authentication"
import { LOG_IN } from "../../constants/actionTypes"

export function* login() {
  yield delay(2000)
  yield put(onLogInSuccess())
}

export function* watchLogIn() {
  yield takeEvery(LOG_IN, login)
}
