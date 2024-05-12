import { CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { pusher } from "../../../pusher/PusherConfig";
import { getOrderListing } from "../../../services/Collection";
import { LoadingWrapper } from "../../../style/Gobalstyle";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { getNotificationMsg } from "../../../Utils/functions";
import { CardWrapper, TakeawayCard } from "../OrderStyle";
import styled from "styled-components";
import IntlMessage from "../../../Utils/IntlMessage";

export default function Takeaway() {
  const direction = useSelector((state) => state.languageDirection.direction);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [takeawayData, setTakeawayData] = useState([]);
  const Notification = useSelector((state) => state.pusherRealtime.data);
  const Restaurentid = useSelector(
    (state) => state.profileDetails?.restaurantDetails?.id
  );

  const getDineInListing = useCallback(async () => {
    setLoading(true);
    await getOrderListing(2);
  }, []);

  const onPusherData = useCallback(
    (data) => {
      if (data) {
        const newUpdatedData = getNotificationMsg(data, Notification);
        setTakeawayData(newUpdatedData);
        // setLoading(false);
      } else {
        const message = getErrorMessage("Failed to connection");
        toast.error(message);
        // setLoading(false);
      }
      setLoading(false);
    },
    [Notification]
  );

  const gotoOrderDetail = (id) => {
    navigate(`/aglut/orders/OrderDetails/${id}`, {
      state: { id: id, type: "Takeaway" },
    });
  };

  useEffect(() => {
    getDineInListing();

    const channel = pusher.subscribe(`TAKEAWAY-ORDERS${Restaurentid}`);
    if (channel) channel.bind(`Takeaway${Restaurentid}`, onPusherData);

    return () => {
      if (channel) {
        pusher.unsubscribe(`TAKEAWAY-ORDERS${Restaurentid}`);
        channel.unbind(`Takeaway${Restaurentid}`, onPusherData);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Notification]);

  if (loading) {
    return (
      <LoadingWrapper>
        <CircularProgress sx={{ color: "#f55a2c" }} />
      </LoadingWrapper>
    );
  }

  let checkstatus = false;

  takeawayData?.map((el) => {
    el?.QrCodes?.map((el) => {
      if (el?.status == "occupied") {
        checkstatus = true;
      }
    });
  });

  return (
    <div>
      <CardWrapper>
        {takeawayData && checkstatus ? (
          takeawayData?.map((iteration1) =>
            iteration1?.QrCodes?.map((iteration2) =>
              iteration2?.Orders?.map((iteration3) => (
                <TakeawayCard
                  dir={direction}
                  onClick={() => gotoOrderDetail(iteration2.id)}
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
                    <label>
                      <IntlMessage id="Orders.qrCodeName" /> :{" "}
                    </label>
                    <span>{iteration2?.name}</span>
                  </div>
                  <div>
                    <label>
                      <IntlMessage id="Orders.qrCodeGroup" /> :{" "}
                    </label>
                    <span>{iteration2?.qr_qroup_name}</span>
                  </div>
                  <div>
                    <label>
                      <IntlMessage id="Orders.orderStatus" /> :{" "}
                    </label>
                    <span>
                      {iteration3?.order_status === "1" ? (
                        <IntlMessage id="Orders.Pending" />
                      ) : iteration3?.order_status === "2" ? (
                        <IntlMessage id="Orders.Accepted" />
                      ) : iteration3?.order_status === "3" ? (
                        <IntlMessage id="Orders.Preparation" />
                      ) : iteration3?.order_status === "4" ? (
                        <IntlMessage id="Orders.Ready" />
                      ) : iteration3?.order_status === "5" ? (
                        <IntlMessage id="Orders.Cancel" />
                      ) : (
                        iteration3?.order_status === "6" && (
                          <IntlMessage id="Orders.completed" />
                        )
                      )}
                    </span>
                  </div>
                </TakeawayCard>
              ))
            )
          )
        ) : (
          <NODATA><IntlMessage id="noData" /></NODATA>
        )}
      </CardWrapper>
    </div>
  );
}

export const NODATA = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Jost";
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 40px;
  color: #242424;
  position: absolute;
  top: 8;
  left: 0;
`;
