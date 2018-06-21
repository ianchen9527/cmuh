import styled from "styled-components"

const MenuColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${props => (props.minWidth ? props.minWidth : "0px")};
`

export default MenuColumn
