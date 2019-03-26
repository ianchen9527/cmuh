import { put, takeEvery } from "redux-saga/effects"
import firebase from "../../firebase"
import {
  SAVE_MEDICINE,
  FETCH_MEDICINES
} from "../../constants/actionTypes"
import {
  onSaveMedicineSuccess,
  onSaveMedicineFail,
  onFetchMedicinesSuccess,
  onFetchMedicinesFail
} from "../../actions/medicine"

export function* saveMedicine(action) {
  try {
    const ref = yield firebase
      .database()
      .ref(`medicines/${action.payload.id}`)
    yield ref.set(action.payload.name)
    const snapshot = yield firebase
      .database()
      .ref(`medicines`)
      .once("value")
    yield put(onSaveMedicineSuccess(snapshot.val()))
  } catch (error) {
    yield put(onSaveMedicineFail(error.message))
  }
}

export function* watchSaveMedicine() {
  yield takeEvery(SAVE_MEDICINE, saveMedicine)
}

export function* fetchMedicines() {
  try {
    const snapshot = yield firebase
      .database()
      .ref(`medicines`)
      .once("value")
    yield put(onFetchMedicinesSuccess(snapshot.val()))
  } catch (error) {
    yield put(onFetchMedicinesFail(error.message))
  }
}

export function* watchFetchMedicines() {
  yield takeEvery(FETCH_MEDICINES, fetchMedicines)
}
