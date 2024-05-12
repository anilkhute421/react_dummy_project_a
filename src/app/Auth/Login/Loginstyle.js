import styled from "styled-components";
import { BackCover } from "../../../Utils/Images";

export const AuthWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: no-repeat url(${BackCover});
  background-size: cover;
  display: flex;
  position: relative;

  section {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 50%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 900px){

    section{
      width:100%;
    }

  }
`;

export const AuthBox = styled.div`
  width: 375px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 20px;
  padding: 10px;

  @media (max-width: 380px) {
    width: 300px;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 80px;
    margin: 31px 0 0 0;
  }
`;

export const BoxContent = styled.div`
  width: 100%;
  padding: 0 15px;
  text-align: center;

  header {
    font-family: "Jost", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 40px;
    color: #242424;
    padding: 20px 0;
  }
  label {
    text-align: start;
    font-family: "Jost", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #0a0a0a;
    padding: 4px 0;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  input {
    height: 48px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    margin: 0 1px;
    padding: 0 16px;

    ::placeholder {
      font-family: "Jost", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      color: #989898;
    }
  }

  h6 {
    display: flex;
    justify-content: end;
    margin: 10px 0;
    font-family: "Jost", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 25px;
    color: #242424;
    cursor: pointer;

  }

  button {
    width: 300px;
    height: 56px;
    margin: 35px 0 15px 0;
    text-align: center;
    background: linear-gradient(115.41deg, #f55a2c 20.05%, #f55a2c 85.17%);
    border-radius: 8px;
    font-family: "Jost", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    text-transform: uppercase;
    color: #ffffff;
    cursor: pointer;

    @media (max-width: 380px){
      width:250px;
    }
  }

  p {
    font-family: "Jost", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #242424;
    margin: 10px 0;
  }
  span {
    color: #f55a2c;
  }
`;
