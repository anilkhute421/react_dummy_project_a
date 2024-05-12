import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getCompletedOrderDetails } from "../../services/Collection";
import { BoxContainer, SubHeader } from "../../style/Gobalstyle";
import { CardWrapper } from "./FeedbackStyle";
import FeedbackTable from "./FeedbackTable";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import moment from "moment";

export default function FeedbackSummary() {
  const [loading, setLoading] = useState(false);
  const [completedData, setCompletedData] = useState(null);
  const [itemDetails, setItemDetails] = useState([]);
  const params = useParams();

  const UserHeader = [
    {
      id: "Name",
      key: "customer_name",
    },
    {
      id: "Phone Number",
      key: "phone_number",
    },
    {
      id: "Item Summary",
      key: "item_name",
    },
    {
      id: "QTY",
      key: "quantity",
    },
    {
      id: "Price",
      key: "price",
    },
    {
      id: "Subtotal",
      key: "sub_total",
    },
  ];

  const TableAction = {
    apply: false,
  };

  const getOrderDetails = async () => {
    setLoading(true);
    let res = await getCompletedOrderDetails(params.id);
    if (res.status === 200) {
      setCompletedData(res.data);
      setItemDetails(res.data.OrderItems);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };


  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <div>
      <SubHeader>
        <p>Order Number #{completedData?.id}</p>
      </SubHeader>
      <BoxContainer>
        <FeedbackTable
          header={UserHeader}
          tableData={itemDetails}
          action={TableAction}
        />
      </BoxContainer>
      <CardWrapper>
        <OrderSummaryBox>
          <header>Order Summary</header>
          <div />
          <section>
            <label>Order Created: </label>
            <span>
              {moment(completedData?.createdAt).format("DD MMM YYYY")}
            </span>
          </section>
          <section>
            <label>Order Time: </label>
            <span>{moment(completedData?.createdAt).format("LT")}</span>
          </section>
          <section>
            <label>Subtotal:</label>
            <span>{completedData?.total}</span>
          </section>
        </OrderSummaryBox>
      </CardWrapper>
    </div>
  );
}

const OrderSummaryBox = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.28);
  border-radius: 10px;
  padding: 20px 25px;

  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.05em;
    color: #000000;
  }

  div {
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.3);
    margin: 5px 0;
  }

  section {
    margin: 7px 0;
  }
  label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 17px;
    letter-spacing: 0.08em;
    color: #000000;
  }
  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 17px;
    letter-spacing: 0.08em;
    color: rgba(0, 0, 0, 0.6);
    margin: 0 10px;
  }
`;
