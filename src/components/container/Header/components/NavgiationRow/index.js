import styled from "styled-components"

const NavigationsRow = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  flex-direction: ${props => (props.reverse ? "row-reverse" : "row")};
`

export default NavigationsRow
