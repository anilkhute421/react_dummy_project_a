import { CircularProgress } from "@mui/material";
import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { pusher } from "../../../pusher/PusherConfig";
import { getOrderListing } from "../../../services/Collection";
import { LoadingWrapper, NODATA } from "../../../style/Gobalstyle";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { getNotificationMsg } from "../../../Utils/functions";
import IntlMessage from "../../../Utils/IntlMessage";
import {
  CardWrapper,
  OrderAvailableCard,
  OrderOccupiedCard,
} from "../OrderStyle";

export default function DineIn() {
  const direction = useSelector((state) => state.languageDirection.direction);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dineInData, setDineInData] = useState(null);
  const Notification = useSelector((state) => state.pusherRealtime.data);
  const Restaurentid = useSelector(
    (state) => state.profileDetails?.restaurantDetails?.id
  );

  const gotoOrderDetail = (id) => {
    navigate(`/aglut/orders/OrderDetails/${id}`, {
      state: { id: id, type: "Dinein" },
    });
  };

  const onPusherData = useCallback(
    (data) => {
      if (data) {
        const newUpdatedData = getNotificationMsg(data, Notification);
        setDineInData(newUpdatedData);
      } else {
        const message = getErrorMessage("Failed to connection");
        toast.error(message);
      }
      setLoading(false);
    },
    [Notification]
  );

  const getDineInListing = useCallback(async () => {
    setLoading(true);
    await getOrderListing(1);
  }, []);

  useEffect(() => {
    getDineInListing();
    const channel = pusher.subscribe(`DINE-IN-ORDERS${Restaurentid}`);
    if (channel) channel.bind(`Dine-In-Orders${Restaurentid}`, onPusherData);

    return () => {
      if (channel) {
        pusher.unsubscribe(`DINE-IN-ORDERS${Restaurentid}`);
        channel.unbind(`Dine-In-Orders${Restaurentid}`, onPusherData);
      }
    };
  }, [Notification]);

  if (loading) {
    return (
      <LoadingWrapper>
        <CircularProgress sx={{ color: "#f55a2c" }} />
      </LoadingWrapper>
    );
  }

  return (
    <div>
      <CardWrapper>
        {dineInData && dineInData.length > 0 ? (
          dineInData?.map((iteration1) =>
            iteration1?.QrCodes.map((iteration2) =>
              iteration2.status !== "available" ? (
                <OrderOccupiedCard
                  dir={direction}
                  onClick={() => gotoOrderDetail(iteration2.id)}
                  key={iteration2?.id}
                >
                  {iteration2.Orders &&
                    iteration2?.Orders.map(
                      (el) =>
                        el?.message.length > 0 &&
                        el?.message?.map((ele) => (
                          <div className="Notification">
                            {el?.message.length > 0 && (
                              <span>{el?.message.length}</span>
                            )}

                            <p>{ele.message}</p>
                          </div>
                        ))
                    )}

                  <section>
                    <i className="icon-Dining" />
                  </section>
                  <div>
                    <label><IntlMessage id="Orders.Status" /> : </label>
                    <span>{iteration2?.status}</span>
                  </div>
                  <div>
                    <label><IntlMessage id="Orders.qrCodeName" /> : </label>
                    <span>{iteration2?.name}</span>
                  </div>
                  <div>
                    <label><IntlMessage id="Orders.qrCodeGroup" />: </label>
                    <span>{iteration2?.qr_qroup_name}</span>
                  </div>
                  <div>
                    <label><IntlMessage id="Orders.orderStatus" /> : </label>
                    <span>
                      {iteration2?.Orders[0]?.order_status === "1"
                        ? <IntlMessage id="Orders.Pending" /> 
                        : iteration2?.Orders[0]?.order_status === "2"
                        ? <IntlMessage id="Orders.Accepted" /> 
                        : iteration2?.Orders[0]?.order_status === "3"
                        ? <IntlMessage id="Orders.Preparation" /> 
                        : iteration2?.Orders[0]?.order_status === "4"
                        ? <IntlMessage id="Orders.Ready" /> 
                        : iteration2?.Orders[0]?.order_status === "5"
                        ? <IntlMessage id="Orders.Cancel" /> 
                        : iteration2?.Orders[0]?.order_status === "6" &&
                        <IntlMessage id="Orders.completed" /> }
                    </span>
                  </div>
                </OrderOccupiedCard>
              ) : (
                <OrderAvailableCard
                  dir={direction}
                  //  onClick={()=>gotoOrderDetail(iteration2.id)}
                  key={iteration2?.id}
                >
                  <section>
                    <i className="icon-Dining" />
                  </section>
                  <div>
                    <label><IntlMessage id="Orders.Status" /> : </label>
                    <span>{iteration2?.status}</span>
                  </div>
                  <div>
                    <label><IntlMessage id="Orders.qrCodeName" /> : </label>
                    <span>{iteration2?.name}</span>
                  </div>
                  <div>
                    <label><IntlMessage id="Orders.qrCodeGroup" />: </label>
                    <span>{iteration2?.qr_qroup_name}</span>
                  </div>
                  {/* <div>
                    <label>Order Status : </label>
                    <span>
                      {iteration2?.Orders[0]?.order_status === "1"
                        ? "Pending"
                        : iteration2?.Orders[0]?.order_status === "2"
                        ? "Accepted"
                        : iteration2?.Orders[0]?.order_status === "3"
                        ? "Under Preparation"
                        : iteration2?.Orders[0]?.order_status === "4"
                        ? "Ready"
                        : iteration2?.Orders[0]?.order_status === "5"
                        ? "Cancel"
                        : iteration2?.Orders[0]?.order_status === "6" &&
                          "Completed"}
                    </span>
                  </div> */}
                </OrderAvailableCard>
              )
            )
          )
        ) : (
          <NODATA><IntlMessage id="noData" /></NODATA>
        )}
      </CardWrapper>
    </div>
  );
}
