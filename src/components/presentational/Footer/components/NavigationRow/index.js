import React, { Component } from "react"
import styled from "styled-components"

import NavigationGroup from "../NavigationGroup"

import media from "../../../../../utilities/media"
import footerLinks from "./assets/footerLinks"

const NavigationRowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;

  ${media.mobile`flex-direction: column;`};
`

class NavigationRow extends Component {
  renderNavigationGroup(linksGroup) {
    return (
      <NavigationGroup
        groupName={linksGroup.groupName}
        links={linksGroup.links}
        key={linksGroup.groupName}
      />
    )
  }

  render() {
    return (
      <NavigationRowWrapper>
        {footerLinks.map(this.renderNavigationGroup)}
      </NavigationRowWrapper>
    )
  }
}

export default NavigationRow
