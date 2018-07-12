import { put, takeEvery } from "redux-saga/effects"
import firebase from "../../firebase"
import {
  SAVE_MEDICAL_RECORD,
  FETCH_MEDICAL_RECORD
} from "../../constants/actionTypes"
import {
  onSaveMedicalRecordSuccess,
  onSaveMedicalRecordFail,
  onFetchMedicalRecordSuccess,
  onFetchMedicalRecordFail
} from "../../actions/medicalRecord"

export function* saveMedicalRecord(action) {
  try {
    const medicalRecordRef = yield firebase
      .database()
      .ref(`medicalRecords/${action.payload.medicalRecord.id}`)
    yield medicalRecordRef.set(action.payload.medicalRecord)
    const medicalRecordSnapshot = yield medicalRecordRef.once("value")
    yield put(onSaveMedicalRecordSuccess(medicalRecordSnapshot.val()))
  } catch (error) {
    yield put(onSaveMedicalRecordFail(error.message))
  }
}

export function* watchSaveMedicalRecord() {
  yield takeEvery(SAVE_MEDICAL_RECORD, saveMedicalRecord)
}

export function* fetchMedicalRecord(action) {
  try {
    const medicalRecordSnapshot = yield firebase
      .database()
      .ref(`medicalRecords/${action.payload.id}`)
      .once("value")
    yield put(onFetchMedicalRecordSuccess(medicalRecordSnapshot.val()))
  } catch (error) {
    yield put(onFetchMedicalRecordFail(error.message))
  }
}

export function* watchFetchMedicalRecord() {
  yield takeEvery(FETCH_MEDICAL_RECORD, fetchMedicalRecord)
}
