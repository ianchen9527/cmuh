import React, { Component } from "react"
import NavigationsText from "../NavigationsText"
import LinkWrapper from "../LinkWrapper"
import { connect } from "react-redux"
import {
  CREDIT_CARD_PLANS_STATE,
  PRICE_STATE
} from "../../../../../constants/state"
import TogglableLinkWrapper from "../TogglableLinkWrapper"
import dictionaries from "./assets/dictionaries"

class SubscribeLink extends Component {
  constructor() {
    super()
    this.dictionaries = dictionaries
  }

  getText(key) {
    return this.dictionaries[this.props.language][key]
  }

  subscribeHref() {
    if (this.props.isLoggedIn) {
      return "/credit_card_plans"
    } else {
      return "/price"
    }
  }

  render() {
    return (
      <TogglableLinkWrapper reverse>
        <LinkWrapper
          to={this.subscribeHref()}
          focus={this.props.isFocus.toString()}
        >
          <NavigationsText>{this.getText("SUBSCRIBE")}</NavigationsText>
        </LinkWrapper>
      </TogglableLinkWrapper>
    )
  }
}

const isValidState = state => {
  return state === CREDIT_CARD_PLANS_STATE || state === PRICE_STATE
}

const mapStateToProps = state => ({
  language: state.getIn(["language", "current"]),
  isLoggedIn: state.getIn(["authentication", "isLoggedIn"]),
  isFocus: isValidState(state.getIn(["state", "current"]))
})

export default connect(mapStateToProps)(SubscribeLink)
