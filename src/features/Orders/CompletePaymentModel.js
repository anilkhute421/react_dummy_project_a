import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { BlackButtonMobile, ButtonWrapper, Cancel, LoadingWrapper } from "../../style/Gobalstyle";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { LabelSpanSection, Box, VerticalLine } from "../Discount/DiscountStyle";
import { AglutLogo, bycard, Bycash } from "../../Utils/Images";
import { pendingItemPayment } from "../../services/Collection";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import IntlMessage from "../../Utils/IntlMessage";

export default function CompletePaymentModel({
  open,
  handleClose,
  handleConfirm,
  payload,
  OrderDetailsData,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const direction = useSelector((state) => state.languageDirection.direction);
  const [openCompletedPayment, setopenCompletedPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const PendingPayemnt = async (payment_mode) => {
    setLoading(true);

    const req = {
      order_id: OrderDetailsData[0].id,
      mode_of_payment: payment_mode,
    };

    let res = await pendingItemPayment(req);
    if (res.status === 200) {
      setLoading(false);
      navigate(`/aglut/orders/completed/details/${OrderDetailsData[0].id}`);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <div>
      {openCompletedPayment && (
        <CompletePaymentModel
          open={openCompletedPayment}
          handleClose={() => setopenCompletedPayment(false)}
        //   OrderDetailsData={orderDetailData}
        />
      )}
      <Dialog fullScreen={fullScreen} open={open} >
        {loading ? (
          <LoadingWrapper>
            <CircularProgress sx={{ color: "#f55a2c" }} />
          </LoadingWrapper>
        ) : (
          <PaymentComplete>
            <Cancel onClick={handleClose} dir={direction}>
              <i className="icon-CloseCross" />
            </Cancel>

            <header>Mode of Payment</header>

            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <ModeofpaymentBox onClick={() => PendingPayemnt(2)}>
                <img src={bycard} />
                <p><IntlMessage id="Order.bycard" /></p>
              </ModeofpaymentBox>

              <ModeofpaymentBox onClick={() => PendingPayemnt(1)}>
                <img src={Bycash} />
                <p><IntlMessage id="Order.byCash" /></p>
              </ModeofpaymentBox>
            </div>

            <ButtonWrapper>

            <BlackButtonMobile onClick={() => handleClose()}>
            <IntlMessage id="button.close" />
              </BlackButtonMobile>
            </ButtonWrapper>
          </PaymentComplete>
        )}
      </Dialog>
    </div>
  );
}

const ModeofpaymentBox = styled.div`
  border-radius: 12px;
  margin: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 118px;
  height: 138px;

  background: rgb(84 84 84 / 10%);

  border-radius: 12px;

  img {
    width: 60px;
    height: 60px;
  }

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    /* identical to box height, or 171% */

    text-align: center;
    letter-spacing: 0.003em;

    color: #000000;
  }

  &:hover {
    border: 2px solid #f55a2c;
  }
`;

const ModeofpaymentBox1 = styled.div`
  border-radius: 12px;
  margin: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 118px;
  height: 138px;

  background: rgb(84 84 84 / 10%);

  border-radius: 12px;

  img {
    width: 60px;
    height: 60px;
  }

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    /* identical to box height, or 171% */

    text-align: center;
    letter-spacing: 0.003em;

    color: #000000;
  }
`;

export const PaymentComplete = styled.div`
  min-width: 425px;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;

  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;

    color: #000000;
  }

  @media (max-width: 425px){
    width: 100%;
    min-width: unset;
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

  i {
    font-size: 18px;
    color: #f55a2c;
  }
`;

const DetailBox = styled.div`
  width: 100%;
  height: 60px;
  background: #fcfdfe;
  border: 0.659039px solid #f0f1f7;
  border-radius: 5.27231px;
  padding: 9px 14px;
  margin: 30px 0;

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
