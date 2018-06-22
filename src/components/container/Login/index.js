import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { onLogIn, onLogOut } from "../../../actions/authentication"
import { onChangeState } from "../../../actions/state"
import { LOGIN_STATE } from "../../../constants/state"

class Login extends Component {
  componentDidMount() {
    this.props.onChangeState(LOGIN_STATE)
  }

  render() {
    return (
      <div>
        <button onClick={this.props.onLogIn}>log in</button>
        <button onClick={this.props.onLogOut}>log out</button>
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
)(Login)
