import {
  LOG_IN,
  LOG_OUT,
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  LOG_IN_FAIL,
  CLEAR_AUTHENTICATION_ERROR
} from "../../constants/actionTypes"
import { handleActions } from "redux-actions"
import { initialState } from "./initialState"

const reducerMap = new Map([
  [
    LOG_IN,
    state => {
      return state.set("isLoading", true).set("errorMessage", "")
    }
  ],
  [
    LOG_IN_SUCCESS,
    state => {
      return state.set("isLoggedIn", true).set("isLoading", false)
    }
  ],
  [
    LOG_OUT,
    state => {
      return state.set("isLoading", true)
    }
  ],
  [
    LOG_OUT_SUCCESS,
    state => {
      return state.set("isLoggedIn", false).set("isLoading", false)
    }
  ],
  [
    LOG_IN_FAIL,
    (state, action) => {
      return state.set("errorMessage", action.payload.message)
    }
  ],
  [
    CLEAR_AUTHENTICATION_ERROR,
    state => {
      return state.set("errorMessage", "")
    }
  ]
])

const authentication = handleActions(reducerMap, initialState)
export default authentication
