import React, { Component } from "react"
import HeaderWrapper from "./components/HeaderWrapper"
import MainLogo from "./components/MainLogo"
import { Button } from "semantic-ui-react"
import ButtonWrapper from "./components/ButtonWrapper"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { onLogOut } from "../../../actions/authentication"

class Header extends Component {
  render() {
    return (
      <HeaderWrapper>
        <MainLogo />
        <ButtonWrapper hide={this.props.isLoggedIn ? 1 : 0}>
          <Button onClick={this.props.onLogOut}>登出</Button>
        </ButtonWrapper>
      </HeaderWrapper>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.get("authentication").get("isLoggedIn")
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onLogOut }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
