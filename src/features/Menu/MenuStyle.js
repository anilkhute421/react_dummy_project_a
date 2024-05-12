import styled from "styled-components";

export const MenuCard = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.28);

  position: relative;

  .upperSection img {
    width: 100%;
    height: 223px;
    object-fit: cover;
    border-radius: 24px 24px 0px 0px;
  }
  .upperSection div {
    width: 100%;
    height: 223px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #d3d3d37a;
    border-radius: 24px 24px 0px 0px;

    i {
      font-size: 60px;
      color: #f55a2c;
    }
    span {
      font-family: "Jost";
      font-style: normal;
      font-weight: 600;
      font-size: 22px;
      line-height: 124.5%;
      color: #202020;
    }
  }

  .hoverSection {
    display: none;
  }

  .hoverSection i {
    font-size: 25px;
    position: absolute;
    top: 0;
    right: ${({ dir }) => dir === "ltr" && 0};
    left: ${({ dir }) => dir === "rtl" && 0};
    margin: 10px;
    cursor: pointer;
  }

  &:hover .hoverSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 223px;
    border-radius: 24px 24px 0px 0px;
    background: #00000099;
    top: 0;
    bottom: 0;
  }

  section {
    padding: 12px 13px;
  }

  header {
    font-family: "Jost";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #202020;
  }

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #878787;
    padding: 5px 0;
  }
`;

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px 0 10px 0;
  @media (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 20px 0 10px 0;
  }
  @media (max-width: 580px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    // margin: 40px 0 10px 0;
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

export const InputPageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 599px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Upload = styled.div`
  width: 120px;
  height: 120px;
  background: #ffffff;
  border: 1px solid #e6e6f1;
  position: relative;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  input {
    width: 120px;
    height: 120px;
    opacity: -1;
    position: absolute;
  }

  img {
    width: 120px;
    height: 120px;
    position: absolute;
    border: 1px solid #e6e6f1;
    border-radius: 20px;
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
export const Cancel = styled.span`
  width: 48px;
  height: 48px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  right: -18px;
  top: -18px;

  @media (max-width: 599px) {
    display: none;
  }
`;

export const InfoCard = styled.div`
  width: 400px;
  height: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.28);

  img {
    width: 100%;
    height: 223px;
    object-fit: cover;
    // border-radius: 4px 4px 0 0;
    border-radius: 16px;


  }

  .upperSection div {
    width: 100%;
    height: 223px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #d3d3d37a;
    border-radius: 24px 24px 0px 0px;

    i {
      font-size: 60px;
      color: #f55a2c;
    }

    span {
      font-family: "Jost";
      font-style: normal;
      font-weight: 600;
      font-size: 22px;
      line-height: 124.5%;
      color: #202020;
      margin: 10px 0;
    }
  }

  section {
    padding: 10px 20px;
  }

  header {
    font-family: "Jost";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #202020;
  }
  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: #878787;
    padding: 5px 0;
  }

  @media (max-width: 599px) {
    width: 100%;
  }
`;

// Create Section Item

export const PriceInnerBox = styled.div`
  background: #ffffff;
  border: 1px solid #f0f1f7;
  border-radius: 8px;
  margin: 7px;
  padding: 7px 10px;
`;

export const PriceBox = styled.div`
  width: 100%;
  height: 100%;
  background: #fcfdfe;
  border: 1px solid #f0f1f7;
  border-radius: 8px;
  margin: 8px 0;

  span {
    width: 95%;
    display: flex;
    justify-content: end;
    text-align: center;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 9.29062px;
    line-height: 11px;
    color: #f55a2c;
    margin: 2px 8px;
  }
`;

export const PriceContainer = styled.div`
  @media (max-width: 820px) {
    margin: 35px 0px;
  }
`;

export const OptionSetWrap = styled.div`
  width: 100%;
  height: 100%;

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    color: #f55a2c;
  }

  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #f55a2c;
    margin: 10px 0;
  }

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
    margin: 0 0 10px 0;
  }

  select {
    width: 100%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 10px;
  }

  section {
    display: flex;
    flex-direction: row;

  @media (max-width: 570px){
    display: unset;
  }

  }

  div {
    margin: 0 5px;
  }

  input {
    width: 100%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 10px;
  }

  .iconWrapper {
    width: 40px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #f55a2c;
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.25);
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  i {
    color: #f55a2c;
  }
`;

export const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  @media (max-width: 820px) {
    display: unset;
  }
`;
export const InnerLeftWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
`;

export const InputPriceBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const InputPageRightWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const InputPageLeftWrapper = styled.div`
  width: 100%;
  //   background: yellow;
`;

export const UpdateImageSection = styled.div`
  width: 100%;
  display: flex;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

// Table styling

export const ActionDiv = styled.div`
  i {
    font-size: 16px;
    margin: 0 3px;
    cursor: pointer;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  overflow-y: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;

  thead {
    height: 42px;
    background: #f55a2c;
  }

  .forMargin {
    margin: 4px 0;
  }
`;

export const THead = styled.tr`
  width: 100%;
  border-radius: 6px;

  th {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    padding: 0 5px;
    &:first-child {
      border-radius: ${({ dir }) => dir === "ltr" && "6px 0 0 6px"};
      border-radius: ${({ dir }) => dir === "rtl" && "0 6px 6px 0"};
    }
    &:last-child {
      border-radius: ${({ dir }) => dir === "ltr" && "0 6px 6px 0"};
      border-radius: ${({ dir }) => dir === "rtl" && "6px 0 0 6px"};
    }
  }
`;

export const TBody = styled.tr`
  width: 100%;

  td {
    text-align: center;
    background: #fcfdfe;
    height: 42px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    border: 1px solid #f0f1f7;
    border-right: 0px;
    border-left: 0px;
    &:first-child {
      border-radius: ${({ dir }) => dir === "ltr" && "6px 0 0 6px"};
      border-radius: ${({ dir }) => dir === "rtl" && "0 6px 6px 0"};
      border-left: ${({ dir }) => dir === "ltr" && "1px solid #f0f1f7"};
      border-right: ${({ dir }) => dir === "rtl" && "1px solid #f0f1f7"};
    }
    &:last-child {
      border-radius: ${({ dir }) => dir === "ltr" && "0 6px 6px 0"};
      border-radius: ${({ dir }) => dir === "rtl" && "6px 0 0 6px"};
      border-right: ${({ dir }) => dir === "ltr" && "1px solid #f0f1f7"};
      border-left: ${({ dir }) => dir === "rtl" && "1px solid #f0f1f7"};
    }
  }
`;

// Option Module

export const DeleteButton = styled.div`
  width: 40px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 16px;
    color: #f55a2c;
  }
`;

export const OrangeOutput = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin-top: 25px;

  input {
    width: 100%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 25px 0 10px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    // position: absolute;
    left: ${({ dir }) => dir === "ltr" && 0};
    right: ${({ dir }) => dir === "rtl" && 0};
  }
  input:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;
  }

  span {
    width: 41px;
    height: 42px;
    background: #f55a2c;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff !important;
    position: absolute;
    opacity: 1 !important;
    top: 0;
    right: ${({ dir }) => dir === "ltr" && 0};
    left: ${({ dir }) => dir === "rtl" && 0};
    bottom: 0;
    border-radius: ${({ dir }) =>
      dir === "ltr" ? "0 8px 8px 0" : "8px 0 0 8px"};
  }

  @media (max-width: 550px) {
    margin: 8px 0px;
  }
`;

export const ModifiersWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 0 10px;

  @media (max-width: 550px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 0px;
    margin: 0px 10px;
  }
`;

export const CreateQRWrapper = styled.div`
  width: 600px;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 30px 20px;
  overflow-y: auto;

  img {
    margin: 20px 0;
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

export const InnerUpperViewModifier = styled.div`
  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.05em;
    color: #000000;
  }

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
    opacity: 0.6;
  }

  section {
    width: 556px;
    @media (max-width: 660px) {
      width: 100%;
    }
  }
`;

export const InnerLowerViewModifier = styled.div`
  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.05em;
    color: #000000;
  }
`;

export const LinkedItems = styled.div`
  width: 100%;
  margin: 8px 0;
  background: #fcfdfe;
  border: 1px solid #f0f1f7;
  border-radius: 8px;
  padding: 18px 20px;
  display: flex;

  img {
    width: 75px;
    height: 67px;
    border-radius: 8px;
    object-fit: cover;
  }

  h1 {
    font-family: "Jost";
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
    color: #202020;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 20px;
  }

  h4 {
    font-family: "Jost";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #838383;
  }
`;

export const SelectInput = styled.input`
 
    width: 100%;
    height: 42px;
   background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0px 30px 0px 10px;
    margin: 8px 0 0 0;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  
  &:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;

`;

export const InputWrapOptionModule = styled.div`
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
    width: 41px;
    height: 55px;
    left: 754px;
    top: 393px;
    background: #f55a2c;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }
`;

export const OptionSetWrapAddOrder = styled.div`
  width: 90%;
  height: 100%;

  @media (max-width: 599px) {
    width: 100%;
  }

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
    margin: 5px 0 0 0;
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
`;

export const ForLabelOnly = styled.div`
  width: 90%;
  height: 100%;

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
    margin: 5px 0 0 0;
    padding: 0 0 10px 0;
  }
`;
