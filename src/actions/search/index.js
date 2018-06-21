import { CHANGE_SEARCH_KEY } from "../../constants/actionTypes"

export const onChangeSerchKey = key => {
  return {
    type: CHANGE_SEARCH_KEY,
    payload: { key: key }
  }
}
