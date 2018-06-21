import { LOG_IN, LOG_OUT, LOG_IN_SUCCESS } from "../../constants/actionTypes"
import { handleActions } from "redux-actions"
import { initialState } from "./initialState"

const reducerMap = new Map([
  [
    LOG_IN,
    state => {
      return state.set("isLoading", true)
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
      return state.set("isLoggedIn", false).set("isLoading", false)
    }
  ]
])

const authentication = handleActions(reducerMap, initialState)
export default authentication
