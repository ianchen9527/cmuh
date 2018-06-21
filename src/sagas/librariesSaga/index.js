import { put, takeEvery, call } from "redux-saga/effects"
import { onRequestCategoriesSuccess } from "../../actions/categories"
import { REQUEST_CATEGORIES } from "../../constants/actionTypes"
import FetchCategoriesApi from "../../apis/FetchCategoriesApi"
import { isStoreExisted, isStoreExpired } from "../../utilities/storeCheck"
import { CATEGORIES_TTL } from "../../constants/ttl"

export function* fetchCategories(action) {
  try {
    const libraryName = action.payload.libraryName
    const isExisted = yield* isStoreExisted(
      "libraries",
      libraryName,
      "categories"
    )
    const isExpired = yield* isStoreExpired(
      CATEGORIES_TTL,
      "libraries",
      libraryName,
      "categories"
    )
    if (isExisted && !isExpired) {
      return
    }
    const fetchCategoriesApi = new FetchCategoriesApi({
      libraryName: libraryName
    })
    const response = yield call(fetchCategoriesApi.call)
    const categories = response.data.categories
    yield put(onRequestCategoriesSuccess(libraryName, categories))
  } catch (e) {
    console.log(e)
  }
}

export function* watchRequestCategoties() {
  yield takeEvery(REQUEST_CATEGORIES, fetchCategories)
}
