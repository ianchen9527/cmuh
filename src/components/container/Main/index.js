import React from "react"
import Header from "../Header"
import MainWrapper from "./components/MainWrapper"
import ContentWrapper from "./components/ContentWrapper"

const Main = props => (
  <MainWrapper>
    <Header />
    <ContentWrapper>{props.children}</ContentWrapper>
  </MainWrapper>
)

export default Main
