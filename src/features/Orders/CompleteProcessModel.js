import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  BlackButtonMobile,
  ButtonWrapper,
  Cancel,
  LoadingWrapper,
  OrangeButton,
} from "../../style/Gobalstyle";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import CompletePaymentModel from "./CompletePaymentModel";
import IntlMessage from "../../Utils/IntlMessage";

export default function CompleteProcessModel({
  open,
  handleClose,
  handleConfirm,
  payload,
  loading,
  OrderDetailsData,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const direction = useSelector((state) => state.languageDirection.direction);
  const [openCompletedPayment, setopenCompletedPayment] = useState(false);

  return (
    <div>
      {openCompletedPayment && (
        <CompletePaymentModel
          open={openCompletedPayment}
          handleClose={() => setopenCompletedPayment(false)}
          OrderDetailsData={OrderDetailsData}
        />
      )}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        fullWidth={true}
        maxWidth={"md"}
      >
        <Cancel onClick={handleClose} dir={direction}>
          <i className="icon-CloseCross" />
        </Cancel>
        {loading ? (
          <LoadingWrapper>
            <CircularProgress sx={{ color: "#f55a2c" }} />
          </LoadingWrapper>
        ) : (
          <PaymentComplete>
            <section>
              <HeaderWrap>
                <header><IntlMessage id="Order.completed.payment.heading" /></header>
                <p><IntlMessage id="Order.completed.payment.remainingItem" /></p>
                <label><IntlMessage id="Order.completed.orderNumber.heading" />:</label>
                <span>{OrderDetailsData[0]?.id}</span>
              </HeaderWrap>

              <div style={{ margin: "30px 0 0 0" }}>
                {OrderDetailsData?.length > 0 &&
                  OrderDetailsData[0]?.OrderItems?.map(
                    (el, index) =>
                      el?.payment_status === "1" && (
                        <DetailBox>
                          <Box1>
                            <div>
                              <label><IntlMessage id="Order.orderDeatils.name" />: </label>
                              <span>{el?.customer_name}</span>
                            </div>

                            <div>
                              <label><IntlMessage id="Order.orderDeatils.item" />: </label>
                              <span>{el?.item_name}</span>
                            </div>

                            <div>
                              <label><IntlMessage id="Order.orderDeatils.subtotal" />: </label>
                              <span>{el?.sub_total}</span>
                            </div>
                          </Box1>

                          <Box2>
                            <div>
                              <label><IntlMessage id="Order.orderDeatils.phoneNumber" />: </label>
                              <span>{el?.phone_number}</span>
                            </div>

                            <div>
                              <label><IntlMessage id="Order.orderDeatils.category" />: </label>
                              <span>{el?.category}</span>
                            </div>

                            <div>
                              <label><IntlMessage id="Order.Status" />: </label>
                              <span style={{ color: "red" }}><IntlMessage id="Orders.Pending" /></span>
                            </div>
                          </Box2>
                        </DetailBox>
                      )
                  )}
              </div>
            </section>
            <ButtonWrapper>
              <BlackButtonMobile onClick={() => handleClose()}>
              <IntlMessage id="button.close" />
              </BlackButtonMobile>
              <OrangeButton onClick={() => setopenCompletedPayment(true)}>
              <IntlMessage id="Order.completed.payment.heading" />
              </OrangeButton>
            </ButtonWrapper>
          </PaymentComplete>
        )}
      </Dialog>
    </div>
  );
}


const Box1 = styled.div`
display: flex;
justify-Content: space-between;
margin:5px 0px;

@media (max-width:550px){
  display:unset;
}
`;

const Box2 = styled.div`
display: flex;
justify-Content: space-between;
margin:10px 0px 5px 0px;
@media (max-width:550px){
  display:unset;
}
`;




const HeaderWrap = styled.div`
  text-align: center;

  header {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #000000;
  }

  p {
    font-family: "Jost";
    font-style: normal;
    font-weight: 400;
    font-size: 18.4px;
    line-height: 150%;
    letter-spacing: 0.03em;
    color: #646464;
  }

  label {
    font-family: "Jost";
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 124.5%;
    /* or 27px */
    letter-spacing: 0.03em;
    color: #f55a2c;
  }

  span {
    font-family: "Jost";
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 124.5%;
    letter-spacing: 0.03em;
    color: #f55a2c;
  }
`;

export const PaymentComplete = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 20px 0;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
    }
    ::-webkit-scrollbar-thumb {
      background: #000;
      border-radius: 10px;
    }

  img {
    width: 100%;
    height: 260px;
    border-radius: 4px 4px 0 0;
  }

  section {
    padding: 20px;

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
  height: auto;
  background: #fcfdfe;
  border: 0.659039px solid #f0f1f7;
  border-radius: 5.27231px;
  padding: 9px 14px;
  margin: 5px 0;

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
