import React, { Component } from "react"
import styled from "styled-components"

import normalBtnImage from "./assets/images/normal.svg"
import pressedBtnImage from "./assets/images/pressed.svg"

const ToggleButtonWrapper = styled.div`
  height: 48px;
  width: 48px;
  border-radius: 24px;
  background-image: url(${normalBtnImage});
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 0.2s;

  &:active {
    background-image: url(${pressedBtnImage});
  }

  &.toggled {
    transform: rotate(-90deg);
  }
`

class ToggleButton extends Component {
  render() {
    return (
      <ToggleButtonWrapper
        onClick={this.props.onClick}
        className={this.props.isToggle ? "toggled" : ""}
      />
    )
  }
}

export default ToggleButton
