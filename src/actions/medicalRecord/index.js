import {
  SAVE_MEDICAL_RECORD,
  SAVE_MEDICAL_RECORD_SUCCESS,
  SAVE_MEDICAL_RECORD_FAIL,
  FETCH_MEDICAL_RECORD,
  FETCH_MEDICAL_RECORD_SUCCESS,
  FETCH_MEDICAL_RECORD_FAIL
} from "../../constants/actionTypes"

export const onSaveMedicalRecord = medicalRecord => {
  return {
    type: SAVE_MEDICAL_RECORD,
    payload: { medicalRecord: medicalRecord }
  }
}

export const onSaveMedicalRecordSuccess = medicalRecord => {
  return {
    type: SAVE_MEDICAL_RECORD_SUCCESS,
    payload: { body: medicalRecord }
  }
}

export const onSaveMedicalRecordFail = errorMessage => {
  return {
    type: SAVE_MEDICAL_RECORD_FAIL,
    payload: { errorMessage: errorMessage }
  }
}

export const onFetchMedicalRecord = id => {
  return {
    type: FETCH_MEDICAL_RECORD,
    payload: { id: id }
  }
}

export const onFetchMedicalRecordSuccess = medicalRecord => {
  return {
    type: FETCH_MEDICAL_RECORD_SUCCESS,
    payload: { body: medicalRecord }
  }
}

export const onFetchMedicalRecordFail = errorMessage => {
  return {
    type: FETCH_MEDICAL_RECORD_FAIL,
    payload: { errorMessage: errorMessage }
  }
}
