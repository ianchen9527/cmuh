import React, { Component } from "react"
import HeaderWrapper from "./components/HeaderWrapper"
import MainLogo from "./components/MainLogo"

class Header extends Component {
  render() {
    return (
      <HeaderWrapper>
        <MainLogo />
      </HeaderWrapper>
    )
  }
}

export default Header
