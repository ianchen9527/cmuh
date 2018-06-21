import { CHANGE_LANGUAGE } from "../../constants/actionTypes"
import { handleActions } from "redux-actions"
import { initialState } from "./initialState"

const reducerMap = new Map([
  [
    CHANGE_LANGUAGE,
    (state, action) => {
      return state.set("current", action.current)
    }
  ]
])

const language = handleActions(reducerMap, initialState)
export default language
