import { select } from "redux-saga/effects"
import { getNow } from "../time"

export function* isStoreExisted(...args) {
  const state = yield select()
  return state.getIn(args) !== undefined
}

export function* isStoreExpired(ttl, ...args) {
  const state = yield select()
  args.unshift("updatedAt")
  const updatedAt = state.getIn(args) ? state.getIn(args) : 0
  return getNow() - updatedAt > ttl
}
