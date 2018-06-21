import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import registerServiceWorker from "./registerServiceWorker"
import App from "./components/App"
import "./index.css"
import configureStore from "./configureStore"

async function init() {
  const store = await configureStore()
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  )
  registerServiceWorker()
}

init()
