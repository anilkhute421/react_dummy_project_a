import styled from "styled-components";

export const ItemDeleteButton = styled.div`
  width: 40px;
  height: 35px;
  background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-top: 25px;
  margin: 25px 10px 0 10px;

  i {
    font-size: 18px;
    color: #f55a2c;
  }

  @media (max-width: 850px){

    margin: 5px 0px 18px 10px;

  }
`;

export const ItemFreeContainer = styled.div`
  width: 100%;
  height: auto;
  background: #fcfdfe;
  border: 1px solid #f0f1f7;
  border-radius: 8px;
  margin: 10px 0;
  padding: 10px 20px;
  display: block;
  justify-content: space-between;
`;

export const ItemFreeWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 850px){
    display: unset;
  }
`;
export const ItemFreeButton = styled.div`

display: flex;


justify-content: space-between;
// background-color: white;
background: #FFFFFF;
border: 0.506329px solid #E1E1E1;
border-radius: 5.06329px;


width: 115px;
height: 42px;
background: #fcfdfe;
border: 1px solid #f0f1f7;
border-radius: 8px;
margin: 5px 0px;
font-family: "Montserrat";
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;
color: #000000;


label{
border: none;
width: 20px;
background: #fcfdfe;
display:flex;
align-items:center;
justify-content: center;
}

p{
color:  #202020;
margin: 10px;


`;

export const ItemPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  justifycontent: space-between;

  @media (max-width: 850px){
    display:unset;
  }
`;

export const Button = styled.div`
  display: flex;

  justify-content: space-between;
  // background-color: white;
  background: #ffffff;
  border: 0.506329px solid #e1e1e1;
  border-radius: 5.06329px;

  width: 115px;
  height: 42px;
  background: #fcfdfe;
  border: 1px solid #f0f1f7;
  border-radius: 8px;
  margin: 8px 0;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #000000;

  label {
    border: none;
    width: 20px;
    background: #fcfdfe;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    color: #202020;
    margin: 10px;
  }
`;

export const DeleteButton = styled.div`
  width: 45px;
  height: 35px;
  background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-top: 25px;
  margin: 25px 10px 0 10px;

  i {
    font-size: 18px;
    color: #f55a2c;
  }
`;

export const ItemPriceDiscount = styled.div`
  width: 100%;
  height: auto;
  background: #fcfdfe;
  border: 1px solid #f0f1f7;
  border-radius: 8px;
  margin: 10px 0;
  padding: 10px 20px;
  display: block;
  justify-content: space-between;

  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    color: #f55a2c;
  }

  section {
    display: flex;
    justify-content: space-between;
  }
`;

export const TotalPriceDiscount = styled.div`
  width: 100%;
  height: auto;
  background: #fcfdfe;
  border: 1px solid #f0f1f7;
  border-radius: 8px;
  margin: 10px 0;
  padding: 10px 20px;

  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    color: #f55a2c;
    margin:10px 0px;
  }

  section {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 850px){
    section {
      display: unset;
    }
  }
`;

export const NewItem = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
`;

export const ItemFree = styled.div`
  width: 100%;
  background: #fcfdfe;
  border: 1px solid #f0f1f7;
  border-radius: 8px;
  margin: 10px 0;
  padding: 10px 20px;
  display: flex;

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

    color: #000000;
  }
`;

export const SelectDiscount = styled.div`
  // width:100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  // background:red;

  span {
    margin: 0 5px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.05em;
    color: #3d3d3d;
  }
  input {
    width: 18px;
    height: 18px;
    accent-color: #f55a2c;
  }
`;

export const DiscountInputWrap = styled.div`
  width: 50%;
  margin: 10px 0;

  @media (max-width: 650px){
    width: 100%;
  }
  `;

export const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  section {
    display: flex;
  }

  i {
    font-size: 18px;
  }

  label {
    // margin: 0 10px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
  }

  input {
    width: 90%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 20px;
    margin: 8px 0;
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
    margin: 8px 0;
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
    font-size: 14px;
    line-height: 17px;
    text-align: end;
    padding: 5px 0;
    cursor: pointer;
    color: #f55a2c;
  }

  strong {
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

  @media (max-width: 850px){
    input {
      width: 100%;
    }
  }
`;

export const LabelSpanSection = styled.div`
  display: flex;
  // margin: 10px 0;

  width: 100%;
  height: 100%;
  min-height: 102px;
  background: #fcfdfe;
  border: 0.659039px solid #f0f1f7;
  border-radius: 5.27231px;
  padding: 9px 14px;
  margin: 10px 0;
  overflow-x: auto;

  ::-webkit-scrollbar {
    width: 0px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
  }
  ::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 10px;
  }

  

  div {
    font-family: "Jost";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    // line-height: 17px;
    letter-spacing: 0.08em;
    height: 20px;
  }
  label {
    color: #000000 !important;
  }
  span {
    color: #646464;
  }

  p {
    font-family: "Jost";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.08em;
    color: #000000;
    margin: 0 5px;
    white-space: nowrap;
  }
`;

export const VerticalLine = styled.span`

width: 0px;
height: 20px;
border: 1px solid rgb(0 0 0 / 15%);
margin 0 10px;

`;

export const Box = styled.div`
  margin: 0 35px;
  padding: 10px;
  width: 100%;
  // flex-direction: column;
  height:auto;
  // overflow-x: auto;

  div {
    font-family: "Jost";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 124.5%;
    letter-spacing: 0.08em;
    label {
      color: #000000 !important;
    }
    span {
      color: #141414;
    }
  }

  @media (max-width: 390px){
    margin: 0px;
  padding: 0px;
  }
`;

export const DetailBox = styled.div`
  width: 100%;
  height: auto;
  background: #fcfdfe;
  border: 0.659039px solid #f0f1f7;
  border-radius: 5.27231px;
  padding: 9px 14px;
  margin: 10px 0;

  div {
    font-family: "Jost";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.08em;
  }
  label {
    color: #000000 !important;
  }
  span {
    color: #646464;
  }
`;

export const SectionItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  // overflow-x: auto;

  img {
    width: 100%;
    height: 260px;
    border-radius: 4px 4px 0 0;
  }

  section {
    padding: 20px;

    header {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;

      color: #000000;
      margin: 10px 0 20px 0;
    }

    label {
      font-family: "Jost";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #f55a2c;
    }
    i {
      font-size: 14px;
      margin: 0 4px;
    }

    h1 {
      font-family: "Jost";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;

      letter-spacing: 0.08em;

      color: #141414;
    }
  }
`;
