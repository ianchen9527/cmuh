import styled from "styled-components"

const Label = styled.div`
  display: ${props => (props.br ? "flex" : "inline-flex")};
  min-width: ${props => (props.large ? "220px" : "100px")};
  padding: 0px 15px;
  height: 45px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  background-color: rgba(204, 226, 255, 0.3);
  border: 1px solid #4183c4;
  border-radius: 3px;
`

export default Label
