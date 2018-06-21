import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { onLanguageChange } from "../../../../../actions/changeLanguage"
import styled from "styled-components"

const Option = styled.div`
  color: ${props => (props.isActive ? "#8fc31f" : "#8e8465")};

  &:hover {
    cursor: pointer;
  }
`

class LanguageOption extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  isActive() {
    return this.props.language === this.props.currentLanguage
  }

  handleClick() {
    this.props.onLanguageChange(this.props.language)
  }

  render() {
    return (
      <Option isActive={this.isActive()} onClick={this.handleClick}>
        {this.props.label}
      </Option>
    )
  }
}

const mapStateToProps = state => ({
  currentLanguage: state.get("language").get("current")
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onLanguageChange }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageOption)
