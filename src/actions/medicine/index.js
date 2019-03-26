import {
  SAVE_MEDICINE,
  SAVE_MEDICINE_SUCCESS,
  SAVE_MEDICINE_FAIL,
  FETCH_MEDICINES,
  FETCH_MEDICINES_SUCCESS,
  FETCH_MEDICINES_FAIL
} from "../../constants/actionTypes"

export const onSaveMedicine = medicine => {
  return {
    type: SAVE_MEDICINE,
    payload: medicine
  }
}

export const onSaveMedicineSuccess = medicines => {
  return {
    type: SAVE_MEDICINE_SUCCESS,
    payload: medicines,
  }
}

export const onSaveMedicineFail = errorMessage => {
  return {
    type: SAVE_MEDICINE_FAIL,
    payload: { errorMessage: errorMessage }
  }
}

export const onFetchMedicines = () => {
  return {
    type: FETCH_MEDICINES,
  }
}

export const onFetchMedicinesSuccess = medicines => {
  return {
    type: FETCH_MEDICINES_SUCCESS,
    payload: medicines
  }
}

export const onFetchMedicinesFail = errorMessage => {
  return {
    type: FETCH_MEDICINES_FAIL,
    payload: { errorMessage: errorMessage }
  }
}
