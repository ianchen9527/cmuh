import React, { Component } from "react"
import NavigationsText from "../NavigationsText"
import LinkWrapper from "../LinkWrapper"
import FreeTag from "../FreeTag"
import { connect } from "react-redux"
import { WEEKLY_ISSUE_STATE } from "../../../../../constants/state"
import TogglableLinkWrapper from "../TogglableLinkWrapper"
import dictionaries from "./assets/dictionaries"

class WeeklyIssueLink extends Component {
  constructor() {
    super()
    this.dictionaries = dictionaries
  }

  getText(key) {
    return this.dictionaries[this.props.language][key]
  }

  weekLinkIssueHref() {
    return "/weekly_issue"
  }

  render() {
    return (
      <TogglableLinkWrapper>
        <LinkWrapper
          to={this.weekLinkIssueHref()}
          focus={this.props.isFocus.toString()}
        >
          <FreeTag />
          <NavigationsText>{this.getText("WEEKLY_ISSUE")}</NavigationsText>
        </LinkWrapper>
      </TogglableLinkWrapper>
    )
  }
}

const mapStateToProps = state => ({
  language: state.getIn(["language", "current"]),
  isFocus: state.getIn(["state", "current"]) === WEEKLY_ISSUE_STATE
})

export default connect(mapStateToProps)(WeeklyIssueLink)
