import React, { Component } from "react"
import styled from "styled-components"

import media from "../../../../../utilities/media"

const FooterOuterWrapper = styled.div`
  width: 100%;
  background-color: #574f39;
  padding: 40px 0;

  ${media.mobile`padding-top: 30px;`};
`

const FooterInnerWrapper = styled.div`
  margin: 0 auto;

  ${media.desktop`width: 940px;`}
  ${media.tablet`width: 460px;`}
  ${media.mobile`
    width: 100%;
    min-width: 320px;
    padding: 0 20px;
    box-sizing: border-box;
  `}
`

class FooterWrapper extends Component {
  render() {
    return (
      <FooterOuterWrapper>
        <FooterInnerWrapper>{this.props.children}</FooterInnerWrapper>
      </FooterOuterWrapper>
    )
  }
}

export default FooterWrapper
