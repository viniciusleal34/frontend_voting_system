import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import Tooltip from "../Tooltip";

export const Container = styled.div`
  border-radius: 10px;
  width: 98%;
  color: #000;
  background-color: ${colors.gelo};
  transition: all 0.3s;
  display: flex;
  align-items: center;
  height: 35px;
  padding: 8px 10px;
  & + div {
    margin-top: 20px;
  }
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
      border-bottom-width: 1.8px;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border-color: #0c359c;
    `}
  ${(props) =>
    props.isFielled &&
    css`
      border-color: #ff7d00;
    `}
    ${(props) =>
    props.isColor &&
    css`
      background-color: ${props.isColor};
      color: #fff;
    `}
  input {
    background: transparent;
    border: 0;
    flex: 1;
    color: ${colors.blue};
    outline: none;
    height: 35px;
    font-size: 17px;
    &::placeholder {
      color: ${colors.blue};
    }
    ${(props) =>
      props.isColor &&
      css`
        background-color: ${props.isColor};
        color: ${colors.blue};
        &::placeholder {
          color: ${colors.blue};
        }
      `}
  }
  svg {
    margin-right: 18px;
  }
  ${fonts.DMSans500};
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff !important;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;