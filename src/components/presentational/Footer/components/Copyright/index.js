import React, { Component } from "react"
import styled from "styled-components"
import media from "../../../../../utilities/media"

const CopyrightWrapper = styled.div`
  font-size: 12px;
  line-height: 1.25;
  text-align: left;
  color: #ffffff;

  ${media.desktop`text-align: center;`}

  ${media.tablet`
    height: 15px;
    margin-top: 20px;
  `}

  ${media.mobile`
    margin-top: 28px
    font-size: 16px;
    font-weight: 300;
    line-height: 1.5;
  `}
`

class Copyright extends Component {
  getCurrentYear() {
    return new Date().getFullYear()
  }

  render() {
    return (
      <CopyrightWrapper>
        Copyright © 2011-{this.getCurrentYear()}, Kono Digital Inc. All Rights
        Reserved.
      </CopyrightWrapper>
    )
  }
}

export default Copyright
