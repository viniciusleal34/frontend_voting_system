import styled from "styled-components";
import colors from "../../../../styles/colors";
import fonts from "../../../../styles/fonts";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(14, 64, 109, 0.8);
  width: 100%;
  height: 60px;
  color: ${colors.white};
  button {
    background: transparent;
    cursor: pointer;
    color: ${colors.white};
    margin-right: 20px;
    :hover {
      color: ${colors.primary};
    }
  }
  h2 {
    margin-left: 20px;
  }
`;

export const NamePage = styled.div`
  background: rgb(14, 64, 109, 0.8);
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  b {
    margin-left: 20px;
    ${fonts[700]};
    color: ${colors.white};
    @media (max-width: 700px) {
      margin-right: 20px;
    }
  }
  @media (max-width: 700px) {
    font-size: 12px;
  }
`;
