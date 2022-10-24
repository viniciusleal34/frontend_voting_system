import styled from "styled-components";
import { shade } from "polished";
import colors from "../../styles/colors";

export const Container = styled.button`
  background-color: ${colors.primary};
  height: 45px;
  border-radius: 10px;
  color: ${colors.white};
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
  border: 0;
  cursor: pointer;
  font-weight: normal;
  width: 105%;
  padding: 8px 10px;
  &:hover {
    background-color: ${shade(0.1, colors.primary)};
  }
`;