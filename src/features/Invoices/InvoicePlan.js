import React, { useState } from "react";
import styled from "styled-components";
import { BoxContainer, SubHeader } from "../../style/Gobalstyle";
import IntlMessage from "../../Utils/IntlMessage";

export default function InvoicePlan() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const SelectPlan = (e) => {
    setSelectedPlan(e.target.value);
  };

  return (
    <div>
      <SubHeader>
        <p><IntlMessage id="invoicePayment.Plans.Heading"/></p>
      </SubHeader>
      <BoxContainer>
        <InvoicePlanWrapper>
          <header><IntlMessage id="invoicePayment.Plans.pickAPlan"/></header>
          <PlanCardWrap>
            <div className="SelectedPlan" >

            <PlanCard selplan={selectedPlan}>
              <input
                type="radio"
                name="plan"
                value="299"
                id="1"
                onClick={SelectPlan}
              />
                <div className="absoluteDiv" ></div>
              <div>
                <header>
                  QAR 299/<span>Month + GST</span>
                </header>
                <p>QAR 3600 billed annually</p>
              </div>
            </PlanCard>
            </div>

            <PlanCard selplan={selectedPlan}>
              <input
                type="radio"
                name="plan"
                value="399"
                id="2"
                onClick={SelectPlan}
              />
              <div className="absoluteDiv" ></div>
              <div>
                <header>
                  QAR 399/<span>Month + GST</span>
                </header>
                <p>QAR 3600 billed annually</p>
              </div>
            </PlanCard>
          </PlanCardWrap>
        </InvoicePlanWrapper>
      </BoxContainer>
    </div>
  );
}


// PlanCard:focus {
//   outline: none;
//   border: 1px solid #e1e1e1;
//   box-shadow: 0px 2px 8px #f55a2c;
// }

const PlanCard = styled.div`

  background: #ffffff;

  // border: ${({selplan}) =>selplan === '399' ? "2px solid #f55a2c;" : "2px solid rgba(216, 216, 216, 1);"}  
  // border: ${({selplan}) =>selplan === '299' ? "2px solid #f55a2c;" : "2px solid rgba(216, 216, 216, 1);"}  
  border: 2px solid rgba(216, 216, 216, 1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 20px;
  position:relative;



  input {
    width: 18px;
    height: 18px;
    background: #000;
    border: 1px solid #f55a2c;
    border-radius: 50%;
    margin: 0 10px;
    accent-color: #f55a2c;
  }

  input:checked+.absoluteDiv{
    position:absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    transform: scale(1.05, 1.05);
    border: 3px solid #f55a2c;
    border-radius: 10px;
    margin: 1px 4px;
  }

  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #3d3d3d;
  }

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #3d3d3d;
  }

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    padding: 5px;
    color: #5a6172;
  }
`;

const PlanCardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px 0;

  @media (max-width: 470px){
    grid-template-columns: repeat(1, 1fr);
  }
 
  
`;

const InvoicePlanWrapper = styled.div`
  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #313131;
  }
`;
