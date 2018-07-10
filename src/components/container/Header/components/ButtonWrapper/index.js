import styled from "styled-components"

const ButtonWrapper = styled.div`
  display: ${props => (props.hide ? "flex" : "none")};
  margin-left: 15px;
`

export default ButtonWrapper
