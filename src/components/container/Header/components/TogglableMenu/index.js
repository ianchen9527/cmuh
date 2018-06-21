import styled from "styled-components"

const TogglableMenu = styled.div`
  background-color: #fafafa;
  position: absolute;
  top: 35px;
  left: 0px;
  display: ${props => (props.status === "on" ? "flex" : "none")};
  flex-direction: row;
  padding: 20px;
  max-height: 245px;
`

export default TogglableMenu
