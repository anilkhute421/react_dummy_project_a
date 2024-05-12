import styled, { keyframes } from "styled-components";

const breatheAnimation = keyframes`
 0% { 
  opacity:0;
  top:-50px;
 };

 30%{
  box-shadow:1px 2px 5px #f55a2c;
 }

 50%{
  box-shadow:10px 5px 20px #f55a2c;
 }

 70%{
  box-shadow: 5px 10px 30px #f55a2c;
 }

 100% {
  opacity: 1;
  top:0 ;
  
}
`;

// Header Component styling
// Header START
export const List = styled.div`
  width: 100% !important;
  justify-content: center !important;
  align-items: center;
  cursor: pointer;
  border: none;
  position: absolute !important;
  z-index: 4;
  top: 100%;
  left: 0;
  padding: 0;
  background: #ffffff;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: rgba(0, 0, 0, 0.6);
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  li {
    height: 35px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

export const ModalContentCotainer = styled.div`
  position: relative;
  overflow-y: auto;
`;
export const LanguageSelect = styled.div`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 10px;
  position: relative;
  background: #ffffff;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: rgba(0, 0, 0, 0.6);
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all ease-in 0.3s;
  div {
    //   width:45px;
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    text-transform: capitalize;
  }
  .select-icon {
    transition: all ease-in 0s;
    margin: 0 3px;
    font-size: 8px;
    transform: ${({ open }) =>
      !open ? "rotate(180deg) translateY(5px)" : "translateY(5px)"};
  }
  @media (max-width: 360px) {
    width: 60px;
  }
`;

export const InfoSection = styled.div`
  width: 100%;
  display: flex;
  margin: 0 10px;

  img {
    width: 40px;
    height: 40px;
    background: #000;
    border-radius: 50%;
    background-size: cover;
    @media (max-width: 360px) {
      // font-size: 10px;
      display: none;
    }
  }

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
    padding: 0 10px;
  }
`;

export const InnerBox = styled.div`
  // width: 325px;
  height: 60px;
  margin: 0 40px;
  display: flex;
  align-items: center;
  position: absolute;
  left: ${({ dir }) => dir === "rtl" && 0};
  right: ${({ dir }) => dir === "ltr" && 0};

  select {
    width: 280px;
    margin: 0px;
    margin: 0 10px;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
    border-radius: 10px;
  }
  @media (max-width: 445px) {
    width: 280px;
    margin: 0 5px;
    justify-content: end !important;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  height: 80px;
  background: #ffffff;
  border: 1px solid #d7d7d7;
  display: flex;
  justify-content: end;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1;
`;

export const SubHeader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #000000;
  }
  @media (max-width: 490px) {
    p {
      font-size: 15px;
    }
  }
`;

export const IconsWrap = styled.div`
  font-size: 25px;
  line-height: 17px;
  color: inherit;
  cursor: pointer;
  position: relative;
  margin: ${({ direction }) =>
    direction === "ltr" ? "0 0 0 15px" : "0 15px 0 0"};

  span {
    position: absolute;
    width: 15px;
    height: 15px;
    background: red;
    top: -5px;
    right: -5px;
    font-family: "Jost";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 17px;
    letter-spacing: 0.02em;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }
`;

// Header END

// Button

//Button styling START HERE

export const OrangeButton = styled.button`
  background: #f55a2c;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  padding: 10px 20px;
  margin: 5px 10px;
  cursor: pointer;
  @media (max-width: 490px) {
    font-size: 12px;
    padding: 10px;
  }
  a {
    color: #ffffff;
    text-decoration: none;
  }
`;

export const OrangeButtonSpan = styled.span`
  background: #f55a2c;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  padding: 10px 20px;
  margin: 5px 10px;
  cursor: pointer;
  @media (max-width: 430px) {
    font-size: 12px;
    padding: 10px;
  }
  @media (max-width: 380px) {
    margin: 5px 10px;
    padding: 10px 20px;
  }
`;

export const WhiteButton = styled.button`
  background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #f55a2c;
  padding: 10px 20px;
  margin: 5px 10px;
  cursor: pointer;
  position: relative;

  input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }

  @media (max-width: 430px) {
    font-size: 12px;
    padding: 10px;
  }
  @media (max-width: 380px) {
    margin: 5px 10px;
    padding: 10px 20px;
  }
`;

export const BlackButton = styled.button`
  background: #000000;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  padding: 10px 20px;
  margin: 5px 10px;
  cursor: pointer;
`;

export const BlackButtonMobile = styled.span`
  display: none;
  @media (max-width: 600px) {
    display: unset;
    background: #000000;
    box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
    border-radius: 10px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    padding: 10px 20px;
    margin: 5px 10px;
    cursor: pointer;
  }
  @media (max-width: 490px) {
    font-size: 12px;
    padding: 10px;
  }
`;

export const RemoveImage = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  i {
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 15px;
    color: red;
    background: #000;
    border-radius: 50%;
    padding: 7px;
    // margin: 5px;
    cursor: pointer;
  }

  input {
    position: absolute;
  }
`;

export const SelectIcon = styled.i`
  position: absolute;
  top: 23px;
  right: ${({ dir }) => dir === "ltr" && "15px"};
  left: ${({ dir }) => dir === "rtl" && "15px"};
  font-size: 12px !important;
`;

//Button styling End HERE

// Filters Style

export const FilterButton = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.28);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 13px 10px;
  margin: 0 6px 0 6px;
  cursor: pointer;

  i {
    font-size: 14px;
    margin: 0 6px 0 6px;
  }

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #a1a1a1;
    margin: 0 6px 0 6px;
  }

 

  select{

    -webkit-appearance: none;
    -moz-appearance: none;
     border:0px;
   outline:0px;

   option{
   
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #a1a1a1;
    margin: 0 6px 0 6px;
  
}
  }
  @media (max-width: 745px) {
    margin: 10px 0px;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 745px) {
    flex-direction: column;
  }
`;

export const BoxContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 30px 50px 30px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.28);
  border-radius: 10px;
  margin: 20px 0;
  position: relative;

  &.withAnimation {
    animation-name: ${breatheAnimation};
    animation-duration: 0.6s;
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
  position: absolute;
  top: -18px;
  cursor: pointer;
  z-index: 999;
  right: ${({ dir }) => dir === "ltr" && "-18px"};
  left: ${({ dir }) => dir === "rtl" && "-18px"};

  @media (max-width: 599px) {
    display: none;
  }
`;

export const HorizontalLines = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.2);
  margin: 10px 0;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  // min-width: 400px;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NODATA = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Jost";
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 40px;
  color: #242424;
  // position:absolute;
  top: 8;
  left: 0;
`;

export const AddOns = styled.div`
  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;

    color: rgba(0, 0, 0, 0.6);
  }

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #f55a2c;
    margin: 0px 2px;
  }
`;

export const SpecialNotes = styled.div`
  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 12px;
    color: red;
  }
`;
