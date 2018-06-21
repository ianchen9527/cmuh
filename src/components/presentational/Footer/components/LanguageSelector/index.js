import React, { Component } from "react"
import { connect } from "react-redux"
import { ZH_HANT, ZH_HANS } from "../../../../../constants/languages"
import styled from "styled-components"

import LanguageOption from "../LanguageOption"

import dictionary from "./assets/dictionary"
import media from "../../../../../utilities/media"

const LanguageSelectorWrapper = styled.div`
  display: flex;
  font-size: 12px;

  ${media.desktop`
    width: 182px;
    justify-content: flex-end;
  `};
  ${media.tablet`margin-top: 23px`};
  ${media.mobile`margin-top: 32px; font-size: 16px`};
`

const Divider = styled.div`
  width: 1px;
  margin: 0 8px;
  background-color: #ffffff;
`

class LanguageSelector extends Component {
  getText(key) {
    return dictionary[this.props.currentLanguage][key]
  }

  render() {
    return (
      <LanguageSelectorWrapper>
        <LanguageOption language={ZH_HANT} label={this.getText(ZH_HANT)} />
        <Divider />
        <LanguageOption language={ZH_HANS} label={this.getText(ZH_HANS)} />
      </LanguageSelectorWrapper>
    )
  }
}

const mapStateToProps = state => ({
  currentLanguage: state.get("language").get("current")
})

export default connect(mapStateToProps)(LanguageSelector)
