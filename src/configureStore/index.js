import { createStore, applyMiddleware, compose } from "redux"
import { autoRehydrate, persistStore } from "redux-persist-immutable"
import createSagaMiddleware from "redux-saga"
import reducer from "../reducers"
import rootSaga from "../sagas"
import blacklist from "../blacklist"

export default function configureStore() {
  return new Promise((resolve, reject) => {
    try {
      const sagaMiddleware = createSagaMiddleware()
      const store = createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__(),
        compose(
          autoRehydrate(),
          applyMiddleware(sagaMiddleware)
        )
      )

      sagaMiddleware.run(rootSaga)
      persistStore(store, { blacklist: blacklist }, () => resolve(store))
    } catch (e) {
      reject(e)
    }
  })
}
