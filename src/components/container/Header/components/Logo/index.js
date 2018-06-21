import styled from "styled-components"
import logoSvg from "./assets/images/logo.svg"

const Logo = styled.a`
  width: 226px;
  height: 32px;
  margin: 0px auto;
  display: block;
  background-image: url(${logoSvg});
  background-size: 226px 32px;
`

export default Logo
