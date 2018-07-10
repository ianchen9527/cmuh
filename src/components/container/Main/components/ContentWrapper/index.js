import styled from "styled-components"

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  padding-top: 110px;
  padding-bottom: 50px;
  min-height: 100vh;
  width: 1280px;
  flex-direction: ${props => (props.row ? "row" : "column")};
  ${props => (props.row ? "justify-content: space-between;" : "")};
`

export default ContentWrapper
