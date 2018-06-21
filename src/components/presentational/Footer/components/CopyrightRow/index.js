import React, { Component } from "react"
import styled from "styled-components"

import AppIcons from "../AppIcons"
import Copyright from "../Copyright"
import LanguageSelector from "../LanguageSelector"

import media from "../../../../../utilities/media"

const CopyrightRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  ${media.desktop`
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-end;
  `};
`

class CopyrightRow extends Component {
  render() {
    return (
      <CopyrightRowWrapper>
        <AppIcons />
        <Copyright />
        <LanguageSelector />
      </CopyrightRowWrapper>
    )
  }
}

export default CopyrightRow
