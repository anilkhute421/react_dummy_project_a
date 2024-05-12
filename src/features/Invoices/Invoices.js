import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BoxContainer,
  HorizontalLines,
  OrangeButton,
  SubHeader,
  FilterButton,
  FilterSection,
} from "../../style/Gobalstyle";
import { Currentplan, PlanDetails } from "./InvoicesStyle";
import InvoicesTable from "./InvoicesTable";
import styled from "styled-components";
import { useSelector } from "react-redux";
import IntlMessage from "../../Utils/IntlMessage";


export default function Invoices() {
  const navigate = useNavigate()

  const invoicePaymentsPermission = useSelector((state) => state.loginAuth.permissions.invoice_and_payments);


  const UserHeader = [
    {
      id: <IntlMessage id="invoicePayment.srNo"/>,
      key: "SrNo",
    },
    {
      id: <IntlMessage id="invoicePayment.trackId"/>,
      key: "Track_ID",
    },
    {
      id: <IntlMessage id="invoicePayment.planName"/>,
      key: "Plan_Name",
    },
    {
      id: <IntlMessage id="invoicePayment.Type"/>,
      key: "Type",
    },
    {
      id: <IntlMessage id="invoicePayment.Status"/>,
      key: "Status",
    },
    {
      id: <IntlMessage id="invoicePayment.fromDate"/>,
      key: "From_Date",
    },
    {
      id: <IntlMessage id="invoicePayment.toDate"/>,
      key: "To_Date",
    },

    {
      id: <IntlMessage id="invoicePayment.Price"/>,
      key: "Price",
    },

    {
      id: <IntlMessage id="invoicePayment.pastdueDays"/>,
      key: "PastDueDays",
    },
    {
      id: <IntlMessage id="userManagement.Action"/>,
      key: "Action",
    },
  ];

  const TableAction = {
    apply: invoicePaymentsPermission,
    view: true,
  };

  const tableContents = [
    {
      Track_ID: "#5893366",
      Plan_Name: "ABC",
      Type: "Monthly",
      Status: "Pending",
      From_Date: "21 April 2021",
      To_Date: "21 April 2022",
      Price: "QAR 349",
      PastDueDays: "6 Days",
    },


    {
      Track_ID: "#5893366",
      Plan_Name: "ABC",
      Type: "Monthly",
      Status: "Pending",
      From_Date: "21 April 2021",
      To_Date: "21 April 2022",
      Price: "QAR 349",
      PastDueDays: "6 Days",
    },



    {
      Track_ID: "#5893366",
      Plan_Name: "ABC",
      Type: "Monthly",
      Status: "Paid",
      From_Date: "21 April 2021",
      To_Date: "21 April 2022",
      Price: "QAR 349",
      PastDueDays: "6 Days",
    },



    {
      Track_ID: "#5893366",
      Plan_Name: "ABC",
      Type: "Monthly",
      Status: "Paid",
      From_Date: "21 April 2021",
      To_Date: "21 April 2022",
      Price: "QAR 349",
      PastDueDays: "6 Days",
    },



  ];

  return (
    <div>
      <SubHeader>
        <p><IntlMessage id="invoicePayment.heading"/></p>
        {invoicePaymentsPermission &&
          <OrangeButton onClick={() => navigate("/aglut/payment/plan")} ><IntlMessage id="button.Plans"/></OrangeButton>
        }
      </SubHeader>
      <BoxContainer>
        <Currentplan>
          <header><IntlMessage id="invoicePayment.currentPlan"/></header>
          <div>
            <label><IntlMessage id="invoicePayment.nextDueDate"/>:</label>
            <span>25 April 2023</span>
          </div>
        </Currentplan>
        <HorizontalLines />
        <PlanDetails>
          <section>
            <div>
              <label><IntlMessage id="invoicePayment.planName"/>:</label>
              <span>ABC</span>
            </div>

            <div>
              <label><IntlMessage id="invoicePayment.Type"/>: </label>
              <span>Monthly</span>
            </div>

            <div>
              <label><IntlMessage id="invoicePayment.Duration"/>: </label>
              <span>23 April 2022 To 24 April 2023</span>
            </div>

            <div>
              <label><IntlMessage id="invoicePayment.Price"/>: </label>
              <span>QAR 369</span>
            </div>
          </section>

          <section>
            <Rightdesc>
              <label></label>
              <span></span>
            </Rightdesc>

            <Rightdesc>
              <label></label>
              <span></span>
            </Rightdesc>

            <Rightdesc>
              <label></label>
              <span></span>
            </Rightdesc>

            <div>
              <label><IntlMessage id="invoicePayment.Status"/>: </label>
              <span style={{ color: "red" }}>Pending</span>
            </div>
          </section>
        </PlanDetails>
      </BoxContainer>

      <BoxContainer>
        <FilterSection>
          <ShowButton>
            <p><IntlMessage id="button.show"/></p>
            <input type="number" value={10} />
          </ShowButton>
          <SearchFEwrapper>
            <SearchButton>
              <i className="icon-Search" />
              <input
                type="text"
                placeholder="Search"
              // onChange={(e) => getWord(e.target.value)}
              />
            </SearchButton>
            <FilterWrapper>
              <FilterButton>
                <i className="icon-Filter" />
                <p><IntlMessage id="button.Filters"/></p>
              </FilterButton>

              <FilterButton>
                <i className="icon-Export" />
                <p><IntlMessage id="button.Export"/></p>
              </FilterButton>
            </FilterWrapper>
          </SearchFEwrapper>
        </FilterSection>

        <InvoicesTable
          header={UserHeader}
          tableData={tableContents}
          action={TableAction}
        />
      </BoxContainer>
    </div>
  );
}



const Rightdesc = styled.div`
@media (max-width: 600px)
 {
    display: none;
}
`;


const ShowButton = styled.div`
  display: flex;
  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.6);
    width: 40px;
    margin-top: 25px;
  }

  input {
    width: 51px;
    height: 23px;
    background: #ffffff;
    margin: 20px 6px 0 6px;
    padding: 0 5px;
    border: 1px solid #e8e8e8;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const SearchButton = styled.div`
  width: 100%;
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

  input {
    width: 100%;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    margin: 0 5px 0 6px;
    opacity: 0.9;
  }

  input:focus {
    outline: none;
  }

  @media (max-width: 745px) {
    margin:10px 0px;
   }
`;


const SearchFEwrapper = styled.div`
 display: flex;
@media (max-width: 745px) {
  display: unset;
 }
`;

const FilterWrapper = styled.div`
 display: flex;
 justify-content: space-between;
`;