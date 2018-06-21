import React, { Component } from "react"
import NavigationsText from "../NavigationsText"
import LinkWrapper from "../LinkWrapper"
import { connect } from "react-redux"
import {
  HOME_STATE,
  MY_FOLLOW_STATE,
  MY_COLLECT_STATE,
  RECENT_READS_STATE
} from "../../../../../constants/state"
import TogglableMenu from "../TogglableMenu"
import dictionaries from "./assets/dictionaries"
import TogglableLinkWrapper from "../TogglableLinkWrapper"
import MenuColumn from "../MenuColumn"

class HomeLink extends Component {
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
    return this.dictionaries[this.props.language][key]
  }

  homeHref() {
    return "/home"
  }

  myFollowHref() {
    return "/my_follow"
  }

  myCollectHref() {
    return "/my_collect"
  }

  recentReadsHref() {
    return "/recent_reads"
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
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseOut}
      >
        <LinkWrapper
          to={this.homeHref()}
          focus={this.props.isFocusOnHome.toString()}
        >
          <NavigationsText>{this.getText("HOME")}</NavigationsText>
        </LinkWrapper>
        <TogglableMenu status={this.state.menuStatus}>
          <MenuColumn>
            <LinkWrapper
              to={this.myFollowHref()}
              focus={this.props.isFocusOnMyFollow.toString()}
            >
              <NavigationsText>{this.getText("MY_FOLLOW")}</NavigationsText>
            </LinkWrapper>
            <LinkWrapper
              to={this.myCollectHref()}
              focus={this.props.isFocusOnMyCollect.toString()}
            >
              <NavigationsText>{this.getText("MY_COLLECT")}</NavigationsText>
            </LinkWrapper>
            <LinkWrapper
              to={this.recentReadsHref()}
              focus={this.props.isFocusOnRecentReads.toString()}
            >
              <NavigationsText>{this.getText("RECENT_READS")}</NavigationsText>
            </LinkWrapper>
          </MenuColumn>
        </TogglableMenu>
      </TogglableLinkWrapper>
    )
  }
}

const mapStateToProps = state => ({
  language: state.getIn(["language", "current"]),
  isFocusOnHome: state.getIn(["state", "current"]) === HOME_STATE,
  isFocusOnMyFollow: state.getIn(["state", "current"]) === MY_FOLLOW_STATE,
  isFocusOnMyCollect: state.getIn(["state", "current"]) === MY_COLLECT_STATE,
  isFocusOnRecentReads: state.getIn(["state", "current"]) === RECENT_READS_STATE
})

export default connect(mapStateToProps)(HomeLink)
