import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { onChangeSerchKey } from "../../../../../actions/search"
import dictionaries from "./assets/dictionaries"
import SearchBarWrapper from "../SearchBarWrapper"
import SearchBarInput from "../SearchBarInput"
import SearchBarSubmit from "../SearchBarSubmit"

class SearchBar extends Component {
  constructor() {
    super()
    this.state = { focus: false }
    this.dictionaries = dictionaries
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  getText(key) {
    return this.dictionaries[this.props.language][key]
  }

  handleSubmit() {
    this.props.history.push(`/search?key=${this.props.searchKey}`)
  }

  handleChange(event) {
    this.props.onChangeSerchKey(event.target.value)
  }

  handleFocus() {
    this.setState({ focus: true })
  }

  handleBlur() {
    this.setState({ focus: false })
  }

  render() {
    return (
      <SearchBarWrapper onSubmit={this.handleSubmit}>
        <SearchBarInput
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          focus={this.state.focus}
          value={this.props.searchKey}
          onChange={this.handleChange}
          placeholder={this.getText("PLACEHOLDER")}
        />
        <SearchBarSubmit focus={this.state.focus} onClick={this.handleSubmit} />
      </SearchBarWrapper>
    )
  }
}

const mapStateToProps = state => ({
  language: state.getIn(["language", "current"]),
  searchKey: state.getIn(["search", "key"])
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onChangeSerchKey }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchBar))
