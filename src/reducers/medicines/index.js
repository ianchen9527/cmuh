import {
  SAVE_MEDICINE,
  SAVE_MEDICINE_SUCCESS,
  SAVE_MEDICINE_FAIL,
  FETCH_MEDICINES,
  FETCH_MEDICINES_SUCCESS,
  FETCH_MEDICINES_FAIL
} from "../../constants/actionTypes"
import { handleActions } from "redux-actions"
import { initialState } from "./initialState"

const reducerMap = new Map([
  [
    SAVE_MEDICINE,
    state => {
      return state.set("isLoading", true).set("errorMessage", "")
    }
  ],
  [
    SAVE_MEDICINE_SUCCESS,
    (state, action) => {
      return state.set("body", action.payload).set("isLoading", false)
    }
  ],
  [
    SAVE_MEDICINE_FAIL,
    (state, action) => {
      return state
        .set("errorMessage", action.payload.message)
        .set("isLoading", false)
    }
  ],
  [
    FETCH_MEDICINES,
    state => {
      return state.set("isLoading", true).set("errorMessage", "")
    }
  ],
  [
    FETCH_MEDICINES_SUCCESS,
    (state, action) => {
      return state.set("isLoading", false).set("body", action.payload)
    }
  ],
  [
    FETCH_MEDICINES_FAIL,
    (state, action) => {
      return state
        .set("errorMessage", action.payload.message)
        .set("isLoading", false)
    }
  ]
])

const medicines = handleActions(reducerMap, initialState)
export default medicines
