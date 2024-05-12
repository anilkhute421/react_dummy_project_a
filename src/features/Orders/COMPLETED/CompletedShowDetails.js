import { CircularProgress } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PrintReceipt from "../../../components/PrintReceipt";
import { getCompletedOrderDetails } from "../../../services/Collection";
import {
  BoxContainer,
  LoadingWrapper,
  SubHeader,
} from "../../../style/Gobalstyle";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import IntlMessage from "../../../Utils/IntlMessage";
import FeedbackTable from "../../Feedback/FeedbackTable";
import {
  CompletedDetailWrapper,
  LeftSection,
  PrintReceipts,
  RightSection,
} from "../OrderStyle";
import CompletedPrintReceipt from "./CompletedPrintReceipt";

export default function CompletedShowDetails() {
  const [loading, setLoading] = useState(false);
  const [completedData, setCompletedData] = useState(null);
  const [itemDetails, setItemDetails] = useState([]);
  const params = useParams();
  const Currency = useSelector(
    (state) => state.profileDetails.restaurantDetails.currency
  );
  const [openReceipt, setOpenReceipt] = useState(false);

  const UserHeader = [
    {
      id: <IntlMessage id="Order.orderDeatils.name"/>,
      key: "customer_name",
    },
    {
      id: <IntlMessage id="Order.orderDeatils.phoneNumber"/>,
      key: "phone_number",
    },
    {
      id: <IntlMessage id="Order.completed.orderNumber.itemSummery"/>,
      key: "item_name",
    },
    {
      id: <IntlMessage id="Order.completed.orderNumber.qty"/>,
      key: "quantity",
    },
    {
      id: <IntlMessage id="Order.completed.orderNumber.price"/>,
      key: "price",
    },
    {
      id: <IntlMessage id="Order.completed.orderNumber.subTotal"/>,
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

  if (loading) {
    return (
      <LoadingWrapper>
        <CircularProgress sx={{ color: "#f55a2c" }} />
      </LoadingWrapper>
    );
  }

  return (
    <div>
      {openReceipt && (
        <CompletedPrintReceipt
          open={openReceipt}
          handleClose={() => setOpenReceipt(false)}
          subOrderData={completedData}
        />
      )}

      <SubHeader>
        <p><IntlMessage id="Order.completed.orderNumber.heading"/> #{completedData?.id}</p>
      </SubHeader>
      <BoxContainer>
        <FeedbackTable
          header={UserHeader}
          tableData={itemDetails}
          action={TableAction}
        />
      </BoxContainer>
      <BoxContainer>
        <CompletedDetailWrapper>
          <LeftSection>
            <div>
              <label><IntlMessage id="Order.completed.orderNumber.orderNo"/>:</label>
              <span>{completedData?.id}</span>
            </div>

            <div>
              <label><IntlMessage id="Orders.Status"/>:</label> 
              <span>Order Completed</span>
            </div>

            {completedData?.order_type === "Dine In" ? (
              <div>
                <label><IntlMessage id="Order.completed.orderNumber.dineIn"/>:</label>
                <span>{completedData?.QrCode?.name}</span>
              </div>
            ) : (
              <div>
                <label><IntlMessage id="qrMenu.qrMenuGroups.createMenuGroups.Takeaway"/>:</label>
                <span>{completedData?.QrCode?.name}</span>
              </div>
            )}
            <div>
              <label><IntlMessage id="Order.completed.orderNumber.tip"/>:</label>
              <span>{completedData?.tip}</span>
            </div>

            <div>
              <label><IntlMessage id="Order.orderDeatils.specificAmount"/>:</label>
              <span>{completedData?.specific_payment_amount}</span>
            </div>

            <div>
              <label><IntlMessage id="Order.orderDeatils.partialAmount"/>:</label>
              <span>{completedData?.partial_payment_amount}</span>
            </div>

            <div>
              <label><IntlMessage id="Order.orderDeatils.discount"/>:</label>
              <span>{completedData?.discount}</span>
            </div>
          </LeftSection>
          <RightSection>
            <div>
              <label><IntlMessage id="Order.completed.orderNumber.subTotal"/>:</label>
              <span>
                {Currency} {completedData?.sub_total}
              </span>
            </div>

            <div>
              <label><IntlMessage id="profileSection.vat"/>:</label>
              <span>
                {Currency} {completedData?.vat}
              </span>
            </div>

            <div>
              <label><IntlMessage id="profileSection.serviceCharge"/>:</label>
              <span>
                {Currency} {completedData?.service_tax}
              </span>
            </div>

            <div>
              <label style={{ fontSize: "20px" }}><IntlMessage id="Order.completed.orderNumber.total"/>:</label>
              <span style={{ fontSize: "20px" }}>
                {Currency} {completedData?.total}
              </span>
            </div>

            <div>
              <label><IntlMessage id="Order.completed.modeOfPayment"/>:</label>
              {completedData?.mode_of_payment === "1" ? (
                <span><IntlMessage id="Order.completed.cash"/></span>
              ) : completedData?.mode_of_payment === "2" ? (
                <span><IntlMessage id="Order.completed.card"/></span>
              ) : completedData?.mode_of_payment === "3" ? (
                <span><IntlMessage id="Order.completed.aglut"/></span>
              ) : (
                completedData?.mode_of_payment === "4" && <span><IntlMessage id="Order.completed.multiple"/></span>
              )}
            </div>

            <PrintReceipts onClick={() => setOpenReceipt(true)}>
            <IntlMessage id="button.printReceipts"/>
            </PrintReceipts>
          </RightSection>
        </CompletedDetailWrapper>
      </BoxContainer>
    </div>
  );
}
