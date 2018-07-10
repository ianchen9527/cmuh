import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from "../container/Login"
import Home from "../container/Home"
import CreateMedicalRecord from "../container/CreateMedicalRecord"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route
            path="/create-medical-record"
            component={CreateMedicalRecord}
          />
        </div>
      </Router>
    )
  }
}

export default App
