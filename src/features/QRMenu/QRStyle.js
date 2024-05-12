import styled from "styled-components";

export const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  section {
    display: flex;
  }

  label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
  }

  select {
    width: 100%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 10px;
    margin: 5px 0;
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

  input {
    width: 100%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 10px;
    margin: 5px 0;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
  input:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;
  }

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    text-align: end;
    padding: 5px 0;
    cursor: pointer;
    color: #f55a2c;
  }
`;

export const CreateQRWrapper = styled.div`
  width:413px;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 30px 20px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
  }
  ::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 10px;
  }

  img {
    margin: 20px 0;
  }

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.05em;
    text-decoration-line: underline;
    color: #f55a2c;
    margin: 10px 0;
  }

  h4 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
    opacity: 0.6;
    margin: 10px 0;
  }

  header {
    text-align: center;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #000000;
  }

  @media (max-width: 599px) {
    width: 100%;
    height: 100%; 
   }
`;

export const Upload = styled.div`
  width: 193px;
  height: 100px;
  background: #ffffff;
  border: 1px solid #e6e6f1;
  position: relative;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0 10px 0;

  input {
    width: 193px;
    height: 100px;
    opacity: -1;
    position: absolute;
  }

  i {
    font-size: 25px;
    padding: 10px 0;
  }

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    text-align: center;

    color: #f55a2c;
  }

  img {
    width: 193px;
    height: 100px;
    border-radius: 8px;
  }
`;

export const HomePage = styled.div`
  width: 100%;

  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #000000;
  }

  @media (max-width: 620px) {
    margin: 25px 0px;
   }

`;

export const WelcomePage = styled.div`
  width: 100%;

  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #000000;
  }
`;

export const BrandingContainer = styled.div`
  // padding:20px;
  display: flex;

  section {
    margin: 10px 0;
  }

  @media (max-width: 620px) {
    display: unset;
   
  }
`;

export const BrandingInputWrap = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;

  label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
  }

  section {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 20px;
    margin: 10px 0;
  }

  input {
    position: absolute;
    top: 8px;
    opacity: 0;
    z-index: 9;
    right: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  img {
    position: absolute;
    top: 9px;
    right: 20px;
    width: 20px;
    height: 20px;
  }
`;

export const InputWrapText = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  section {
    display: flex;
  }

  label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
  }

  select {
    width: 100%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 10px;
    margin: 5px 0;
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

  input {
    width: 100%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 10px;
    margin: 5px 0;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
  input:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;
  }

  textarea {
    width: 100%;
    height: 58px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 10px;
    margin: 5px 0;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
  textarea:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;
  }

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    text-align: end;
    padding: 5px 0;
    cursor: pointer;
    color: #f55a2c;
  }
`;
