import styled from "styled-components";
import { BackCover } from "../../Utils/Images";


export const WelcomeWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: no-repeat url(${BackCover});
  background-size: cover;
  display: flex;
  position: relative;

  section {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;


  }
`;

export const WelcomeBox = styled.div`
  width: 375px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
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
    padding: 20px 0 0 0;
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
  }

  p {
    font-family: "Jost", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #242424;
    margin: 10px 0 20px 0;
  }
  span {
    color: #f55a2c;
  }

  select {
    width: 100%;
    height: 42px;
    // background: red;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 20px;
    margin: 8px 0 0 0;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
  select:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;
  }
`;