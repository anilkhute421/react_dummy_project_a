import styled from "styled-components";

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

export const TakeawayCard = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  padding: 20px 13px;
  position: relative;
  section {
    width: 100%;
    text-align: center;
    margin: 10px 0 3px 0;
  }

  i {
    font-size: 35px;
    color: #f55a2c;
  }

  label {
    font-family: "Jost";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #595959;
  }

  span {
    font-family: "Jost";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #595959;
    opacity: 0.6;
    padding: 0 2px;
  }

  .Notification {
    position: absolute;
    top: 0;
    right: 0;
    left:0;
    width: 100%;
    height: 30px;
    background: #f55a2c;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 3px;

    p {
      font-family: "Jost";
      font-style: normal;
      font-weight: 400;
      font-size: 10px;
      line-height: 13px;
      color: #ffffff;
      margin: 0 3px;
    }
    span {
      width: 15px;
      height: 15px;
      background: #ffffff;
      border-radius:50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Jost";
      font-style: normal;
      font-weight: 700;
      font-size: 10px;
      line-height: 13px;
      color: #f55a2c;
      margin: 0 3px;
      opacity: 1;
    }
`;

export const OrderAvailableCard = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #00b112;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  padding: 20px 13px;
  section {
    width: 100%;
    text-align: center;
    margin: 10px 0 3px 0;
  }

  i {
    font-size: 35px;
    color: #00b112;
  }

  label {
    font-family: "Jost";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #595959;
  }

  span {
    font-family: "Jost";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #595959;
    opacity: 0.6;
    padding: 0 2px;
  }
`;

export const OrderOccupiedCard = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #ff0000;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  padding: 20px 13px;
  position: relative;
  section {
    width: 100%;
    text-align: center;
    margin: 10px 0 3px 0;
  }

  i {
    font-size: 35px;
    color: red;
  }

  label {
    font-family: "Jost";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #595959;
  }

  span {
    font-family: "Jost";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #595959;
    opacity: 0.6;
    padding: 0 2px;
  }

  .Notification {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: #f55a2c;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3px;

    p {
      font-family: "Jost";
      font-style: normal;
      font-weight: 400;
      font-size: 10px;
      line-height: 13px;
      color: #ffffff;
      margin: 0 3px;
    }
    span {
      width: 15px;
      height: 15px;
      background: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Jost";
      font-style: normal;
      font-weight: 700;
      font-size: 10px;
      line-height: 13px;
      color: #f55a2c;
      margin: 0 3px;
      opacity: 1;
    }
  }
`;

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 20px 0 10px 0;
  @media (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  @media (max-width: 480px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
  }
`;

export const TabButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  div {
    background: #ffffff;
    border: 1px solid #f55a2c;
    box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
    border-radius: 10px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    padding: 10px 20px;
    margin: 5px 10px;
    cursor: pointer;
    color: #f55a2c;
    &.active {
      color: #fff;
      background: #f55a2c;
    }
  }

  
  @media (max-width: 600px) {
    justify-content:center;
   }

   @media (max-width: 459px) {
    div {
      font-size: 10px;
   }

   @media (max-width: 392px) {
    div {
      font-size: 9px;
      padding: 10px 9px;
   }
`;

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
  position: absolute;
  right: 0;
  top: 0;
  margin: 20px;

  i {
    font-size: 18px;
    color: #f55a2c;
  }

  @media (max-width: 500px) {
    margin: 10px;
  }
  @media (max-width: 400px) {
    margin: 5px;
  }
`;

export const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;

  label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    /* identical to box height */

    color: #000000;
    margin: 0 10px;
    opacity: 0.6;
  }

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: 0.05em;
    color: #f55a2c;
  }

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.05em;
    color: red;
    opacity: 0.9;
  }
`;

export const ExtraSection = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;

  .right {
    div {
      margin: 10px 0;
    }
  }

  .left {
    div {
      // margin: 5px 0;
    }
  }

  label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    margin: 0 10px;
    color: #000000;
  }

  button {
    width: 65px;
    height: 26px;
    left: 877px;
    top: 324px;

    background: #ffffff;
    border: 1px solid #e7e7e7;
    border-radius: 6px;
  }
`;

export const FieldGrid3 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 140px;
  gap: 20px;

  @media (max-width: 725px) {
    display: grid;
    grid-template-columns: unset;
    gap: 10px;
  }
`;

export const DetailBox = styled.div`
  width: 100%;
  background: #f7f7f7;
  border: 1px solid #dddddd;
  border-radius: 16px;
  margin: 0 0 20px 0;
  padding: 20px;
  position: relative;

  section {
    width: 90%;
  }
`;

export const AddOrderDetailWrapper = styled.div``;

export const OptionSetWrap = styled.div`
  width: 100%;
  height: 100%;

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
  }

  .quantityInput {
    // width: 10px;
    height: 100%;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
    margin: 0;
    border-style: none;
    text-align: center;
    padding: 0 10px;
  }

  select,
  input {
    width: 100%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 30px 0px 10px;
    margin: 5px 0;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
  select:focus,
  input:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;
  }

  // div {
  //   margin: 0 5px;
  // }
`;

export const OptionSetWrapAddOrder = styled.div`
  width: 100%;
  height: 100%;

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

  div {
    margin: 0 5px;
  }
`;

export const AddOrderWrapper = styled.div`
  min-width: 413px;
  width: 100%;
  height: 90vh;
  overflow-y: scroll;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;

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

  @media (max-width: 400px) {
    min-width: 0px;
  }
`;

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
    text-align: center;
  }
`;

export const SpecialNote = styled.div`
  width: 100%;
  height: 100%;

  textarea {
    width: 100%;
    height: 72px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 10px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
  select:focus,
  textarea:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;
  }

  div {
    margin: 0 5px;
  }
`;

export const MainSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 35px;

  .labelPrice {
    width: 70px;
    lineheight: 25px;

    @media (max-width: 400px) {
      width: 100%;
      white-space: nowrap;
    }
  }
`;

export const ExtraSectionDetails = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100px;
`;

export const ExtraButton = styled.div`
  display: flex;

  justify-content: space-between;
  // background-color: white;
  background: #ffffff;
  border: 0.506329px solid #e1e1e1;
  border-radius: 5.06329px;
  margin: 0px 0 !important;

  width: 50px;
  height: 26px;

  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 6px;

  // background: #fcfdfe;
  border: 1px solid #f0f1f7;
  border-radius: 8px;
  // margin: 14px 0;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  // color: #000000;

  button {
    border: none;
    width: 20px;
    background: #fcfdfe;

    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  p {
    color: #202020;
    margin: 6px;
  }

  span {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

export const Button = styled.div`
  display: flex;

  justify-content: space-between;
  // background-color: white;
  background: #ffffff;
  border: 0.506329px solid #e1e1e1;
  border-radius: 5.06329px;
  margin: 5px 0 !important;
  // margin: 5px 0 5px 10px !important;

  padding: 0 10px;
  width: 65px;
  height: 26px;
  left: 877px;
  top: 324px;

  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 6px;

  width: 100%;
  margin: 30px 0;
  height: 42px;
  // background: #fcfdfe;
  border: 1px solid #f0f1f7;
  border-radius: 8px;
  // margin: 14px 0;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  // color: #000000;

  button {
    border: none;
    width: 20px;
    background: #fcfdfe;

    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  p {
    color: #202020;
    margin: 10px;
    font-size: 16px;
    display: flex;
    align-items: center;
    // justify-content: center;
  }

  span {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  @media (max-width: 725px) {
    width: 150px;
  }
`;

export const PrintReceipts = styled.div`
  width: 144px;
  height: 37px;
  background: #e1e1e1;
  border: 1px solid #b9b9b9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  color: #515151;
`;

export const CompletedDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    display: unset;
  }
`;

export const LeftSection = styled.div`
  div {
    margin: 10px 0;
  }

  label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.08em;
    color: #000000;
  }

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.08em;
    margin: 0 10px;
    color: #646464;
  }
`;

export const RightSection = styled.div`
  div {
    margin: 10px 0;
  }

  label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.08em;
    color: #000000;
  }

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.08em;
    margin: 0 10px;
    color: #646464;
  }
`;
