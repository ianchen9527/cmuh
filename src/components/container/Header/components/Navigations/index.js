import React from "react"
import NavigationsWrapper from "../NavigationsWrapper"
import NavigationsRow from "../NavgiationRow"
import HomeLink from "../HomeLink"
import WeeklyIssueLink from "../WeeklyIssueLink"
import LibraryLink from "../LibraryLink"
import SearchBar from "../SearchBar"

const Navigations = () => (
  <NavigationsWrapper>
    <NavigationsRow>
      <HomeLink />
      <WeeklyIssueLink />
      <LibraryLink libraryName="chinese" />
      <LibraryLink libraryName="japanese" />
    </NavigationsRow>
    <NavigationsRow>
      <SearchBar />
    </NavigationsRow>
  </NavigationsWrapper>
)

export default Navigations
