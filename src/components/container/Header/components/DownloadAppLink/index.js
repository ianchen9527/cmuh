import React, { Component } from "react"
import NavigationsText from "../NavigationsText"
import { connect } from "react-redux"
import { DOWNLOAD_APP_STATE } from "../../../../../constants/state"
import TogglableMenu from "../TogglableMenu"
import dictionaries from "./assets/dictionaries"
import TogglableLinkWrapper from "../TogglableLinkWrapper"
import MenuColumn from "../MenuColumn"
import DownloadAppLinkWrapper from "../DownloadAppLinkWrapper"

class DownloadAppLink extends Component {
  constructor() {
    super()
    this.dictionaries = dictionaries
    this.state = {
      menuStatus: "off"
    }
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
  }

  getText(key) {
    console.log(this.dictionaries)
    return this.dictionaries[this.props.language][key]
  }

  onMouseEnter(e) {
    this.setState({ menuStatus: "on" })
  }

  onMouseOut(e) {
    this.setState({ menuStatus: "off" })
  }

  render() {
    return (
      <TogglableLinkWrapper
        reverse
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseOut}
      >
        <DownloadAppLinkWrapper>
          <NavigationsText>{this.getText("DOWNLOAD_APP")}</NavigationsText>
        </DownloadAppLinkWrapper>
        <TogglableMenu status={this.state.menuStatus}>
          <MenuColumn>
            <NavigationsText>ios</NavigationsText>
          </MenuColumn>
        </TogglableMenu>
      </TogglableLinkWrapper>
    )
  }
}

const mapStateToProps = state => ({
  language: state.getIn(["language", "current"]),
  isFocus: state.getIn(["state", "current"]) === DOWNLOAD_APP_STATE
})

export default connect(mapStateToProps)(DownloadAppLink)
