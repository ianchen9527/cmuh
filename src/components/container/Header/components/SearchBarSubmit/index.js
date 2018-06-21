import styled from "styled-components"
import searchIcon from "./assets/images/search_icon.svg"

const SearchBarSubmit = styled.button`
  width: 41px;
  height: 35px;
  border-radius: 0px 17px 17px 0px;
  background-color: #ffffff;
  border-style: solid;
  border-color: ${props => (props.focus ? "#b5ad97" : "#eee9e0")};
  border-width: 1px 1px 1px 0px;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-size: 21px 21px;
  background-position: 10px 7px;
  cursor: pointer;
  display: flex;

  &:-ms-input-placeholder {
    color: #b5ad97;
  }

  &::placeholder {
    color: #b5ad97;
  }

  &::-ms-input-placeholder {
    color: #b5ad97;
  }
`

export default SearchBarSubmit
