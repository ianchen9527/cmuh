import React, { Component } from "react"

import FooterWrapper from "./components/FooterWrapper"
import CopyrightRow from "./components/CopyrightRow"
import NavigationRow from "./components/NavigationRow"

class Footer extends Component {
  render() {
    return (
      <FooterWrapper>
        <NavigationRow />
        <CopyrightRow />
      </FooterWrapper>
    )
  }
}

export default Footer
