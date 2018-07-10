import { put, takeEvery } from "redux-saga/effects"
import firebase from "../../firebase"
import { SAVE_MEDICAL_RECORD } from "../../constants/actionTypes"
import {
  onSaveMedicalRecordSuccess,
  onSaveMedicalRecordFail
} from "../../actions/medicalRecord"

export function* saveMedicalRecord(action) {
  try {
    const medicalRecordRef = yield firebase
      .database()
      .ref(`medicalRecords/${action.payload.id}`)
      .set({ name: "123" })
    put(onSaveMedicalRecordSuccess(medicalRecordRef.id))
  } catch (error) {
    console.log(error)
    yield put(onSaveMedicalRecordFail(error.message))
  }
}

export function* watchSaveMedicalRecord() {
  yield takeEvery(SAVE_MEDICAL_RECORD, saveMedicalRecord)
}
