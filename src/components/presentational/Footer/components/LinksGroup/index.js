import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

import dictionary from "../NavigationRow/assets/dictionary"
import media from "../../../../../utilities/media"

const LinksWrapper = styled.div`
  width: 100%;

  ${media.mobile`
    transition: max-height .5s ease-out;
    max-height: 300px;
    overflow: hidden;

    &.hide {
      transition: max-height .5s ease-out;
      max-height: 0;
    }
  `};
`

const LinkWrapper = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;

  ${media.mobile`
    width: 100%;
    margin-top: 20px;
    display: block;
    &:last-child { margin-bottom: 20px; }
  `};
`

const InternalLink = styled(Link)`
  font-size: 14px;
  font-weight: 300;
  line-height: 1.21;
  text-decoration: none;
  color: #ffffff;

  ${media.mobile`
    font-size: 16px;
    line-height: 1.5;
  `};
`

const ExternalLink = styled.a`
  font-size: 14px;
  font-weight: 300;
  line-height: 1.21;
  text-decoration: none;
  color: #ffffff;

  ${media.mobile`
    font-size: 16px;
    line-height: 1.5;
  `};
`

class LinksGroup extends Component {
  constructor(props) {
    super(props)
    this.renderLink = this.renderLink.bind(this)
  }

  getText(key) {
    return dictionary[this.props.currentLanguage][key]
  }

  renderLink(link) {
    const linkElement = link.external ? (
      <ExternalLink href={link.to} target="_blank">
        {this.getText(link.text)}
      </ExternalLink>
    ) : (
      <InternalLink to={link.to}>{this.getText(link.text)}</InternalLink>
    )

    return <LinkWrapper key={link.text}>{linkElement}</LinkWrapper>
  }

  render() {
    return (
      <LinksWrapper className={this.props.isToggle ? "" : "hide"}>
        {this.props.links.map(this.renderLink)}
      </LinksWrapper>
    )
  }
}

const mapStateToProps = state => ({
  currentLanguage: state.get("language").get("current")
})

export default connect(mapStateToProps)(LinksGroup)
