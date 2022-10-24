import styled from "styled-components";
import colors from "../../../../styles/colors";
import fonts from "../../../../styles/fonts";

export const Container = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  background: ${(props) =>
    props.isActive ? "rgb(14, 64, 109, 0.2)" : "transparent"};
  border-left: ${(props) => props.isActive && `5px solid ${colors.primary}`};
  color: ${(props) =>
    props.isActive ? `${colors.primary}` : ` ${colors.gray}`};
  font-size: 16px;
  width: 100%;
  height: 50px;
  padding-left: ${(props) => (props.isActive ? "15px" : "20px")};
  :hover {
    background: rgb(14, 64, 109, 0.2);
    border-left: 5px solid ${colors.primary};
    color: ${colors.primary};
    padding-left: 15px;
  }
  ${fonts[700]};
`;
