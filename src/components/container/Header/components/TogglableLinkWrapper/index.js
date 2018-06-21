import styled from "styled-components"

const TogglableLinkWrapper = styled.div`
  position: relative;
  margin-right: ${props => (props.reverse ? "0px" : "24px")};
  margin-left: ${props => (props.reverse ? "24px" : "0px")};
`

export default TogglableLinkWrapper
