import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { onLogIn, onLogOut } from "../../../actions/authentication"
import { onChangeState } from "../../../actions/state"
import Footer from "../../presentational/Footer"
import Header from "../../container/Header"
import { HOME_STATE } from "../../../constants/state"

class Home extends Component {
  componentDidMount() {
    this.props.onChangeState(HOME_STATE)
  }

  getLoginState() {
    return this.props.isLoading
      ? "loading"
      : this.props.isLoggedIn
        ? "login"
        : "logout"
  }

  render() {
    return (
      <div>
        <Header />
        <p>mock</p>
        <p>mock</p>
        <p>mock</p>
        <p>mock</p>
        <p>login state: {this.getLoginState()}</p>
        <button onClick={this.props.onLogIn}>log in</button>
        <button onClick={this.props.onLogOut}>log out</button>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.get("authentication").get("isLoading"),
  isLoggedIn: state.get("authentication").get("isLoggedIn")
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onLogIn, onLogOut, onChangeState }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
