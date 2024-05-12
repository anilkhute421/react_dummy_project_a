import styled from "styled-components";

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Card = styled.div`
  height: 142px;
  background: #ffffff;
  background: url(${({ backgroundImage }) => backgroundImage}) no-repeat #fff;
  background-position: bottom right;
  border: 2px solid #f55a2c;
  border-radius: 10px;
  padding: 10px;

  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #3d3d3d;
  }

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #5a6172;
    margin-top: 5px;
  }
`;




export const CreateWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 30px 20px;

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
`;

export const BoxContent = styled.div`
  width: 100%;
  padding: 0 15px;

  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #000000;
    padding: 20px 0;
  }
`;

export const MiddleContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  // margin: 5px 0px;

  i {
    font-size: 18px;
  }

  label {
    margin: 0 0px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
  }

  input {
    width: 100%;
    height: 42px;
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
    padding: 10px 20px;
    margin: 8px 0 0 0;
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
`;
