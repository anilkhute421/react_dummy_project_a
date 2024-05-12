import styled from "styled-components";

export const FeedbackCard = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #e2e2e2;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  position: relative;
  padding: 12px;
  cursor: pointer;

  span {
    padding: 2px 12px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #ffffff;
    background: #f55a2c;
    border-radius: 0px 6px;
    position: absolute;
    top: 0;
    // right: 0;
    left: ${({ dir }) => dir === "rtl" && 0};
    right: ${({ dir }) => dir === "ltr" && 0};
  }

  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #121212;
    text-transform: uppercase;
  }

  label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    color: #b7b7b7;
    
  }

  div {
    width: 100%;
    // min-width: 358px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 9px 11px;

    h6{
      font-size:22px;
    }
  }
  // i {
  //   font-size: 18px;
  //   margin: 0 2px;
  // }

  p {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    color: #1A1A1A;;
    
    font-size: 12px;
}
`;

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 20px 0 10px 0;

  @media (max-width: 895px){
    grid-template-columns: repeat(1, 1fr);
  }
`;


