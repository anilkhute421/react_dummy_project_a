import React from "react";
import styled from "styled-components";
import {
  BoxContainer,
  ButtonWrapper,
  HorizontalLines,
  OrangeButton,
  SubHeader,
} from "../../style/Gobalstyle";
import IntlMessage from "../../Utils/IntlMessage";
import { Currentplan } from "./InvoicesStyle";

export default function InvoicesView() {
  return (
    <div>
      <SubHeader>
        <p><IntlMessage id="invoicePayment.Invoice.Heading"/></p>
        <OrangeButton><IntlMessage id="button.printInvoice"/></OrangeButton>
      </SubHeader>
      <BoxContainer>
        <Currentplan>
          <header><IntlMessage id="invoicePayment.Invoice.invoiceDetails"/></header>
        </Currentplan>
        <HorizontalLines />

        <InvoicesDetails>
          <section className="firstSection">
            <div>
              <label><IntlMessage id="invoicePayment.Invoice.subStartDate"/>:</label>
              <span>24 December 2022</span>
            </div>

            <div>
              <label><IntlMessage id="invoicePayment.Invoice.subEndDate"/>:</label>
              <span>24 December 2022</span>
            </div>

            <div>
              <label><IntlMessage id="invoicePayment.pastdueDays"/>:</label>
              <span>21 Days</span>
            </div>
          </section>
          <section className="secondSection">
            <div>
              <label><IntlMessage id="invoicePayment.Status"/>:</label>
              <span>Pending</span>
            </div>

            <div>
              <label><IntlMessage id="invoicePayment.Invoice.subAmount"/>:</label>
              <span>QAR 550</span>
            </div>
          </section>
        </InvoicesDetails>
        <HorizontalLines />

        <ButtonWrapper>
          <OrangeButton style={{ padding: "10px 40px" }}><IntlMessage id="button.Pay"/></OrangeButton>
        </ButtonWrapper>
      </BoxContainer>
    </div>
  );
}



const InvoicesDetails = styled.div`

  display: flex;

  section {
    width: 100%;
  }

  .firstSection {
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    margin: 0 10px;
  }

  .secondSection {
    margin: 0 10px;
  }

  div {
    margin: 5px 0;
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
    color: #646464;
    margin: 0 10px;
  }

  @media (max-width: 860px) {
    display: unset;
    .firstSection {
      border-right: unset;
      margin: 0 10px;
    }
   }
`;
