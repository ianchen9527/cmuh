import React, { Component } from "react"
import NavigationsText from "../NavigationsText"
import LinkWrapper from "../LinkWrapper"
import { connect } from "react-redux"
import { REDEEM_STATE } from "../../../../../constants/state"
import TogglableLinkWrapper from "../TogglableLinkWrapper"
import dictionaries from "./assets/dictionaries"

class RedeemLink extends Component {
  constructor() {
    super()
    this.dictionaries = dictionaries
  }

  getText(key) {
    return this.dictionaries[this.props.language][key]
  }

  redeemHref() {
    return "/coupon"
  }

  render() {
    return (
      <TogglableLinkWrapper reverse>
        <LinkWrapper
          to={this.redeemHref()}
          focus={this.props.isFocus.toString()}
        >
          <NavigationsText>{this.getText("REDEEM")}</NavigationsText>
        </LinkWrapper>
      </TogglableLinkWrapper>
    )
  }
}

const mapStateToProps = state => ({
  language: state.getIn(["language", "current"]),
  isFocus: state.getIn(["state", "current"]) === REDEEM_STATE
})

export default connect(mapStateToProps)(RedeemLink)
