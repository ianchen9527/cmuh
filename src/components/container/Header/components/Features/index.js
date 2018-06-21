import React, { Component } from "react"
import { connect } from "react-redux"
import NavigationsWrapper from "../NavigationsWrapper"
import NavigationsRow from "../NavgiationRow"
import DownloadAppLink from "../DownloadAppLink"
import RedeemLink from "../RedeemLink"
import GiftingLink from "../GiftingLink"
import SubscribeLink from "../SubscribeLink"

class Features extends Component {
  render() {
    return (
      <NavigationsWrapper>
        <NavigationsRow reverse>
          <SubscribeLink />
          <GiftingLink />
          <RedeemLink />
          <DownloadAppLink />
        </NavigationsRow>
        <NavigationsRow />
      </NavigationsWrapper>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.getIn(["authentication", "isLoggedIn"])
})

export default connect(mapStateToProps)(Features)
