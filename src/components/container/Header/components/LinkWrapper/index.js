import styled from "styled-components"
import { Link } from "react-router-dom"

const LinkWrapper = styled(Link)`
  display: flex;
  align-items: center;
  align-self: flex-start;
  height: 35px;
  border-radius: 17px;
  background-color: ${props => (props.focus === "true" ? "#f6f3ed" : "none")};
  padding: 0px 12px;
  color: #574f39;
  text-decoration: none;
  position: relative;
  white-space: nowrap;

  &:visited {
    color: #574f39;
  }

  &:hover {
    background-color: #f6f3ed;
  }
`

export default LinkWrapper
