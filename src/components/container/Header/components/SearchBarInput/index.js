import styled from "styled-components"

const SearchBarInput = styled.input`
  width: 140px;
  height: 35px;
  font-size: 15px;
  border-radius: 17px 0px 0px 17px;
  background-color: #ffffff;
  border-style: solid;
  border-color: ${props => (props.focus ? "#b5ad97" : "#eee9e0")};
  border-width: 1px 0px 1px 1px;
  padding-left: 12px;
  padding-right: 12px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
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

export default SearchBarInput
