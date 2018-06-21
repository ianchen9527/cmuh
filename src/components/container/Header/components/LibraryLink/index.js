import React, { Component } from "react"
import NavigationsText from "../NavigationsText"
import LinkWrapper from "../LinkWrapper"
import { bindActionCreators } from "redux"
import { onRequestCategories } from "../../../../../actions/categories"
import { connect } from "react-redux"
import {
  CHINESE_LIBRARY_STATE,
  JAPANESE_LIBRARY_STATE
} from "../../../../../constants/state"
import TogglableLinkWrapper from "../TogglableLinkWrapper"
import TogglableMenu from "../TogglableMenu"
import dictionaries from "./assets/dictionaries"
import MenuColumn from "../MenuColumn"

class LibraryLink extends Component {
  constructor() {
    super()
    this.dictionaries = dictionaries
    this.state = {
      menuStatus: "off"
    }
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
  }

  componentDidMount() {
    this.props.onRequestCategories(this.props.libraryName)
  }

  getText(key) {
    return this.dictionaries[this.props.language][key]
  }

  onMouseEnter(e) {
    this.setState({ menuStatus: "on" })
  }

  onMouseOut(e) {
    this.setState({ menuStatus: "off" })
  }

  libraryHref() {
    return `/${this.props.libraryName}_library`
  }

  categoryHref(category) {
    return `/categories/${category.id}`
  }

  isFocus() {
    let isFocus = false
    switch (this.props.libraryName) {
      case "chinese":
        isFocus = this.props.currentState === CHINESE_LIBRARY_STATE
        break
      case "japanese":
        isFocus = this.props.currentState === JAPANESE_LIBRARY_STATE
        break
      default:
        break
    }
    return isFocus
  }

  renderColumnCategories(categories) {
    return categories.map((category, index) => {
      return (
        <LinkWrapper key={index} to={this.categoryHref(category)}>
          <NavigationsText>{this.getText(category.dict_key)}</NavigationsText>
        </LinkWrapper>
      )
    })
  }

  renderCategories() {
    let columns = [],
      size = 7
    const library = this.props.libraries.get(this.props.libraryName)
    let categories = library ? library.get("categories").toJS() : []
    while (categories.length > 0) {
      columns.push(categories.splice(0, size))
    }

    return columns.map((column, index) => (
      <MenuColumn key={index} minWidth="120px">
        {this.renderColumnCategories(column)}
      </MenuColumn>
    ))
  }

  renderLibraryText() {
    return this.getText(`${this.props.libraryName.toUpperCase()}_LIBRARY`)
  }

  render() {
    return (
      <TogglableLinkWrapper
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseOut}
      >
        <LinkWrapper to={this.libraryHref()} focus={this.isFocus().toString()}>
          <NavigationsText>{this.renderLibraryText()}</NavigationsText>
        </LinkWrapper>
        <TogglableMenu status={this.state.menuStatus}>
          {this.renderCategories()}
        </TogglableMenu>
      </TogglableLinkWrapper>
    )
  }
}

const mapStateToProps = state => ({
  language: state.getIn(["language", "current"]),
  currentState: state.get(["state", "current"]),
  libraries: state.get("libraries")
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onRequestCategories }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryLink)
