import {
  REQUEST_CATEGORIES,
  REQUEST_CATEGORIES_SUCCESS
} from "../../constants/actionTypes"

export const onRequestCategories = libraryName => {
  return {
    type: REQUEST_CATEGORIES,
    payload: { libraryName: libraryName }
  }
}

export const onRequestCategoriesSuccess = (libraryName, categories) => {
  return {
    type: REQUEST_CATEGORIES_SUCCESS,
    payload: { libraryName: libraryName, categories: categories }
  }
}
