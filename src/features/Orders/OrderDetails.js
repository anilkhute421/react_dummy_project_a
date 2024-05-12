import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import PrintReceipt from "../../components/PrintReceipt";
import {
  getCurrentOrderStatus,
  getOrderDetail,
  getUpdateOrderStatus,
  updateSeenNotificationStatus,
} from "../../services/Collection";
import {
  BoxContainer,
  LoadingWrapper,
  SubHeader,
} from "../../style/Gobalstyle";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import IntlMessage from "../../Utils/IntlMessage";
import CompleteProcessModel from "./CompleteProcessModel";
import OrderTable from "./OrderTable";

export default function OrderDetails() {
  const [loading, setLoading] = useState(false);
  const [orderDetailData, setOrderDetailData] = useState([]);
  const [subOrderData, setSubOrderData] = useState(null);
  const { state } = useLocation();
  const [openReceipt, setOpenReceipt] = useState(false);
  const [openCompletedProcess, setopenCompletedProcess] = useState(false);
  const navigate = useNavigate();
  const [orderStatusChange, setorderStatusChange] = useState();


  const restaurantDetails = useSelector(
    (state) => state.profileDetails.restaurantDetails
  );

  const UserHeader = [
    {
      id: <IntlMessage id="Order.orderDeatils.orderNumber" />,
      key: "id",
    },
    {
      id: <IntlMessage id="Order.orderDeatils.price" />,
      key: "total",
    },
    {
      id: <IntlMessage id="Order.orderDeatils.date" />,
      key: "order_date",
    },
    {
      id: <IntlMessage id="Order.orderDeatils.time" />,
      key: "order_time",
    },
    {
      id: <IntlMessage id="Orders.Status" />,
      key: "payment_status",
    },
  ];

  const SubTableHeader = [
    {
      id: <IntlMessage id="Order.orderDeatils.name" />,
      key: "customer_name",
    },
    {
      id: <IntlMessage id="Order.orderDeatils.phoneNumber" />,
      key: "phone_number",
    },
    {
      id: <IntlMessage id="Order.orderDeatils.item" />,
      key: "item_name",
    },
    {
      id: <IntlMessage id="Order.orderDeatils.category" />,
      key: "category",
    },
    {
      id: <IntlMessage id="Order.orderDeatils.qTY" />,
      key: "quantity",
    },
    {
      id: <IntlMessage id="Order.orderDeatils.amount" />,
      key: "total",
    },
    {
      id: <IntlMessage id="Order.orderDeatils.subtotal" />,
      key: "sub_total",
    },
    {
      id: <IntlMessage id="Orders.Status" />,
      key: "payment_status",
    },
    {
      id: <IntlMessage id="Order.orderDeatils.action" />,
      key: "Action",
    },
  ];

  const getOrderDetailsData = async () => {
    setLoading(true);
    let res = await getOrderDetail(state.id);
    if (res.status === 200) {
      if (res.data.length > 0) {
        setOrderDetailData(res.data);
        setSubOrderData(res.data[0].OrderItems);
        setorderStatusChange(res.data[0]?.StatusQrCodeOrder?.status)
        seenNotification(res?.data[0].id);
        setLoading(false);
      } else {
        navigate(`/aglut/orders/completed/details/${orderDetailData[0].id}`);
      }
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const TableAction = {
    apply: state.type === "Takeaway" ? false : true,
    edit: true,
    delete: true,
    childTable: true,
    actionOfView: "CreateModifierGroup",
    dataFetch: getOrderDetailsData,
    type: state.type,
  };

  const restaurentsAction = [
    {
      name: <IntlMessage id="Order.orderDeatils.acceptOrder" />,
      action: orderDetailData[0]?.order_status === "2" ? true : false,
      background: "#b8b8b8",
      activebackground: "#ffa500",
      color: "#000",
    },
    {
      name: <IntlMessage id="Order.orderDeatils.underPreparation" />,
      action: orderDetailData[0]?.order_status === "3" ? true : false,
      background: "#b8b8b8",
      activebackground: "#ffa500",
      color: "#000000",
    },
    {
      name: <IntlMessage id="Order.orderDeatils.markAsReady" />,
      action: orderDetailData[0]?.order_status === "4" ? true : false,
      background: "#b8b8b8",
      activebackground: "#ffa500",
      color: "#000",
    },
    {
      name: <IntlMessage id="Order.orderDeatils.cancelOrder" />,
      action: false,
      background: "#ff0000",
      color: "#fff",
    },
    {
      name: <IntlMessage id="Order.orderDeatils.complete" />,
      action: false,
      background: "#30bf30",
      color: "#fff",
    },
  ];

  const changeOrderStatus = async (id) => {
    if (id === 4) {
      setopenCompletedProcess(true);
    } else {
      let req = {
        order_id: orderDetailData[0]?.id,
        type: id + 2,
      };
      setLoading(true);
      let res = await getCurrentOrderStatus(req);
      if (res.status === 200) {
        getOrderDetailsData();
        toast.success(res.message);
        setLoading(false);
      } else {
        const message = getErrorMessage(res, "Failed to connection");
        toast.error(message);
        setLoading(false);
      }
    }
  };

  const updateOrderStatus = async (e) => {
    // setLoading(true);
    // let req = {
    //   order_id: orderDetailData[0]?.id,
    //   type: e.target.value,
    // };
    // let res = await getUpdateOrderStatus(req);
    // if (res.status === 200) {
    //   getOrderDetailsData();
    //   toast.success(res.message);
    //   setLoading(false);
    // } else {
    //   const message = getErrorMessage(res, "Failed to connection");
    //   toast.error(message);
    //   setLoading(false);
    // }
  };

  const seenNotification = async (id) => {
    let req = {
      order_id: id,
    };
    await updateSeenNotificationStatus(req);
  };

  useEffect(() => {
    getOrderDetailsData();
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
      {openCompletedProcess && (
        <CompleteProcessModel
          open={openCompletedProcess}
          handleClose={() => setopenCompletedProcess(false)}
          OrderDetailsData={orderDetailData}
        />
      )}
      {openReceipt && (
        <PrintReceipt
          open={openReceipt}
          handleClose={() => setOpenReceipt(false)}
          subOrderData={orderDetailData}
        />
      )}
      <SubHeader>
        <p><IntlMessage id="Order.orderDeatils.heading" /></p>
      </SubHeader>

      <YellowHead>
        <YellowChild >
          <lable><IntlMessage id="Orders.createOrder.qrCodeName" />: </lable>
          <span>{orderDetailData?.[0]?.qr_code_name}</span>
        </YellowChild>

        <YellowChild>
          <lable><IntlMessage id="Orders.createOrder.orderType" />: </lable>
          <span>{orderDetailData?.[0]?.order_type}</span>
        </YellowChild>

        <YellowChild>
          <lable><IntlMessage id="Orders.createOrder.qrCodeGroup" />: </lable>

          <span>{orderDetailData?.[0]?.qr_group_name}</span>
        </YellowChild>

        <YellowChild>
          <lable><IntlMessage id="Orders.Status" />: </lable>
          <span style={{ color: "rgba(255, 0, 0, 1)" }}>
            {orderDetailData?.[0]?.status}
          </span>
        </YellowChild>
      </YellowHead>

      <BoxContainer>
        {orderDetailData && (
          <OrderTable
            header={UserHeader}
            tableData={orderDetailData}
            action={TableAction}
            subheader={SubTableHeader}
            subcontents={subOrderData}
          />
        )}

        <OrderStatus>
          <section>
            {restaurentsAction.map((button, idx) => (
              <>
                <OrderStatusButton
                  btnstyle={button}
                  onClick={() => changeOrderStatus(idx)}
                >
                  <span>{button.name}</span>
                </OrderStatusButton>

                {restaurentsAction.length !== idx + 1 && (
                  <label>...........</label>
                )}
              </>
            ))}
          </section>
        </OrderStatus>
        <SelectInputWrap>
          <select onChange={updateOrderStatus}>
            <option value={1}><IntlMessage id="Order.orderDeatils.orderFullySettled" /></option>
            <option value={2}><IntlMessage id="Order.orderDeatils.orderPartiallySettled" /></option>
          </select>
        </SelectInputWrap>
      </BoxContainer>

      <BoxContainer2>
        <header><IntlMessage id="Order.orderDeatils.billDetails" /></header>
        <hr />
        <CompletedDetailWrapper>
          <LeftSection>
            <div>
              <label><IntlMessage id="Order.orderDeatils.itemTotal" />:</label>
              <span>
                {restaurantDetails?.currency} {orderDetailData?.[0]?.sub_total}
              </span>
            </div>

            <div>
              <label><IntlMessage id="profileSection.vat" /> ({restaurantDetails?.vat}%):</label>
              <span>
                {restaurantDetails?.currency} {orderDetailData?.[0]?.vat}
              </span>
            </div>

            <div>
              <label>
              <IntlMessage id="profileSection.serviceCharge" />({restaurantDetails?.service_charge}%):
              </label>
              <span>
                {restaurantDetails?.currency}{" "}
                {orderDetailData?.[0]?.service_tax}
              </span>
            </div>


            <div>
              <label><IntlMessage id="Order.orderDeatils.tip" />:</label>
              <span>{orderDetailData?.[0]?.tip}</span>
            </div>

            <div>
              <label><IntlMessage id="Order.orderDeatils.specificAmount" />:</label>
              <span>{orderDetailData?.[0]?.specific_payment_amount}</span>
            </div>

            <div>
              <label><IntlMessage id="Order.orderDeatils.partialAmount" />:</label>
              <span>{orderDetailData?.[0]?.partial_payment_amount}</span>
            </div>

            <div>
              <label><IntlMessage id="Order.orderDeatils.discount" />:</label>
              <span>{orderDetailData?.[0]?.discount}</span>
            </div>

            <div style={{ marginTop: 25 }}>
              <label><IntlMessage id="Order.orderDeatils.grandTotal" />:</label>
              <span>
                {restaurantDetails?.currency} {orderDetailData?.[0]?.total}
              </span>
            </div>
          </LeftSection>
          <RightSection>
            <PrintReceipts onClick={() => setOpenReceipt(true)}>
            <IntlMessage id="button.printReceipts" />
            </PrintReceipts>
          </RightSection>
        </CompletedDetailWrapper>
      </BoxContainer2>
    </div>
  );
}



const YellowChild = styled.div`
    @media (max-width: 650px) {
    padding:5px 0px;
  }
`;

export const BoxContainer2 = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.28);
  border-radius: 10px;
  margin: 20px 0;

  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.05em;
    color: #000000;
  }

  hr {
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.3);
    margin: 5px 0;
  }
`;

const CompletedDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 525px) {
    display: unset;
  }
`;

const LeftSection = styled.div`
  div {
    margin: 10px 0;
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

const RightSection = styled.div`
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

const PrintReceipts = styled.div`
  padding: 10px 20px;
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

const SelectInputWrap = styled.div`
  select {
    width: 160px;
    height: 29px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    color: #000000;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 20px 30px;
  }
  select:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;
  }

  @media (max-width: 550px){
    select{
    width: 154px;
    height: 29px;
    margin: 21px 30px;
  }
`;

const YellowHead = styled.div`
  width: 100%;
  height: 42px;
  background: #faad1a;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  margin: 20px 0 10px 0;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  lable {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.8);
  }

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 650px) {
    flex-direction: column;
    padding:10px 5px;
    height: 100%;
  }
`;

const OrderStatusButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 152px;
  height: 29px;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  text-align: center;
  cursor: pointer;
  background: ${({ btnstyle }) =>
    btnstyle.action ? btnstyle.activebackground : btnstyle.background};

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: ${({ btnstyle }) => btnstyle.color};
    transform: matrix(1, 0, 0, 1, 0, 0);
  }

  @media (max-width:820px){
    span {
      font-size: 9px;
    }
`;

const OrderStatus = styled.div`
  width: 100%;
  height: 29px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  section {
    width: 100%;
    display: flex;
  }

  @media (max-width: 550px) {
    height: auto;

    section {
      align-items: center;
    flex-direction: column;
    }

    label {
      visibility: hidden;
    }
  }
`;

