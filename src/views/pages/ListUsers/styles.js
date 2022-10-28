import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;
  justify-content: center;
  margin-top: 20px;
  header {
    display: flex;
    width: 90%;
    flex-direction: row;
    background-color: #fff;
    height: 100px;
    align-items: center;
    > input{
      width: 20px;
      height: 20px;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 20px;
      margin: 0px 10px;
    }
  }
`;