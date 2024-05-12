import styled from "styled-components";

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  section {
    display: flex;
    margin: 10px 0;
  }

  p {
    width: 125px;
    text-align: end;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    white-space: nowrap;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  @media (max-width: 611px) {
    justify-content: space-evenly;
  }
  @media (max-width: 380px) {
    flex-direction: column;
  }

  section {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 20px 0 0;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  }
  div {
    display: flex;
    flex-direction: column;
  }
`;

export const InnerBoxContainer = styled.div`
  width: 100%;
  hieght: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 611px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const BoxContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.28);
  border-radius: 10px;
  margin: 20px 0;
`;

export const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ProfileTransparentWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 999;
`;

export const WeekInput = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  label {
    width: 100%;
    text-align: end;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    @media (max-width: 900px) {
      width: 100px;
    }
  }
  .textInput {
    width: 100px;
    height: 42px;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 10px;
    margin: 8px 15px 0 15px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    background: ${({ disable }) => (disable ? "#E3E3E3" : "#fcfdfe")};
  }

  // .textInput:focus-visible{
  //   border-style:none;
  // }

  .checkInput {
    width: 18px;
    height: 18px;
    background: red;
  }

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    margin: 0 9px;
  }
`;

export const WeekSelect = styled.div`
  width: 100%;

  @media (max-width: 590px) {
    overflow-y: scroll;
    width: 500px;
  }
`;

export const InnerLeftWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
`;

export const InputPageRightWrapper = styled.div`
  width: 100%;
  height: 100%;
  @media (max-width: 900px) {
    display: none;
  }
`;

export const InputPageRightWrapperMobile = styled.div`
  width: 100%;
  height: 100%;
  @media (min-width: 900px) {
    display: none;
    justify-content: center;
  }
  @media (max-width: 590px) {
    overflow-y: scroll !important;
  }
`;

export const InputPageLeftWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const InputWrap = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;

  section {
    display: flex;
  }

  i {
    font-size: 18px;
  }

  label {
    margin: 0 10px;
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
    margin: 8px 25px 0 25px;
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
    margin: 8px 25px 0 25px;
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
    padding: 0 20px;
    margin: 8px 25px 0 25px;
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

export const InputPageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ProfilePicturesWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid #979797;
  display: flex;
  text-align: center;
  justify-content: center;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #979797;

  input {
    width: 120px;
    height: 120px;
    opacity: -1;
    position: absolute;
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: absolute;
  }
`;
