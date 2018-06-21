import React, { Component } from "react"
import { connect } from "react-redux"
import HeaderWrapper from "./components/HeaderWrapper"
import Logo from "./components/Logo"
import Navigations from "./components/Navigations"
import Features from "./components/Features"

class Header extends Component {
  logoHref() {
    return "/home"
  }

  render() {
    return (
      <HeaderWrapper>
        <Navigations />
        <Logo href={this.logoHref()} />
        <Features />
      </HeaderWrapper>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.get("authentication").get("isLoggedIn")
})

export default connect(mapStateToProps)(Header)
