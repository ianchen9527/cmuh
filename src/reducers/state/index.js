import { CHANGE_STATE } from "../../constants/actionTypes"
import { handleActions } from "redux-actions"
import { initialState } from "./initialState"

const reducerMap = new Map([
  [
    CHANGE_STATE,
    (state, action) => {
      return state.set("current", action.payload.state)
    }
  ]
])

const state = handleActions(reducerMap, initialState)
export default state
