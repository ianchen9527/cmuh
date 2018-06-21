import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import LinksGroup from "../LinksGroup"
import ToggleButton from ".././../../ToggleButton"

import dictionary from "../NavigationRow/assets/dictionary"
import media from "../../../../../utilities/media"

const NavigationGroupWrapper = styled.div`
  width: 140px;
  font-size: 14px;
  margin-bottom: 40px;

  ${media.mobile`width: 100%; margin: 0;`};
`

const NavigationTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.mobile`height: 48px;`};
`

const TitleWrapper = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #b5ad97;

  ${media.mobile`font-size: 16px;`};
`

const ToggleButtonWrapper = styled.div`
  display: none;
  ${media.mobile`display: block;`};
`

class NavigationGroup extends Component {
  constructor(props) {
    super(props)
    this.state = { isToggle: false }
    this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this)
  }

  getText(key) {
    return dictionary[this.props.currentLanguage][key]
  }

  handleToggleButtonClick() {
    this.setState({ isToggle: !this.isToggle() })
  }

  isToggle() {
    return this.state.isToggle
  }

  render() {
    return (
      <NavigationGroupWrapper>
        <NavigationTitle>
          <TitleWrapper>{this.getText(this.props.groupName)}</TitleWrapper>
          <ToggleButtonWrapper>
            <ToggleButton
              onClick={this.handleToggleButtonClick}
              isToggle={this.isToggle()}
            />
          </ToggleButtonWrapper>
        </NavigationTitle>
        <LinksGroup links={this.props.links} isToggle={this.isToggle()} />
      </NavigationGroupWrapper>
    )
  }
}

const mapStateToProps = state => ({
  currentLanguage: state.get("language").get("current")
})

export default connect(mapStateToProps)(NavigationGroup)
