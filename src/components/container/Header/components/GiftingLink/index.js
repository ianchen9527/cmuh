import React, { Component } from "react"
import NavigationsText from "../NavigationsText"
import LinkWrapper from "../LinkWrapper"
import { connect } from "react-redux"
import {
  GIFTING_WELCOME_STATE,
  GIFTING_PLANS_STATE
} from "../../../../../constants/state"
import TogglableLinkWrapper from "../TogglableLinkWrapper"
import dictionaries from "./assets/dictionaries"

class GiftingLink extends Component {
  constructor() {
    super()
    this.dictionaries = dictionaries
  }

  getText(key) {
    return this.dictionaries[this.props.language][key]
  }

  giftingHref() {
    if (this.props.isLoggedIn) {
      return "/gifting_plans"
    } else {
      return "/gifting_welcome"
    }
  }

  render() {
    return (
      <TogglableLinkWrapper reverse>
        <LinkWrapper
          to={this.giftingHref()}
          focus={this.props.isFocus.toString()}
        >
          <NavigationsText>{this.getText("GIFTING")}</NavigationsText>
        </LinkWrapper>
      </TogglableLinkWrapper>
    )
  }
}

const isValidState = state => {
  return state === GIFTING_PLANS_STATE || state === GIFTING_WELCOME_STATE
}

const mapStateToProps = state => ({
  language: state.getIn(["language", "current"]),
  isLoggedIn: state.getIn(["authentication", "isLoggedIn"]),
  isFocus: isValidState(state.getIn(["state", "current"]))
})

export default connect(mapStateToProps)(GiftingLink)
