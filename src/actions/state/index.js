import { CHANGE_STATE } from "../../constants/actionTypes"

export const onChangeState = (state) => ({
  type: CHANGE_STATE,
  payload: {
    state: state
  }
})
