import { CHANGE_SEARCH_KEY } from "../../constants/actionTypes"
import { handleActions } from "redux-actions"
import { initialState } from "./initialState"

const reducerMap = new Map([
  [
    CHANGE_SEARCH_KEY,
    (state, action) => {
      return state.set("key", action.payload.key)
    }
  ]
])

const search = handleActions(reducerMap, initialState)
export default search
