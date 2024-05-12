import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Cancel } from "../Menu/MenuStyle";
import { useSelector } from "react-redux";
import { BlackButtonMobile, LoadingWrapper } from "../../style/Gobalstyle";
import { CircularProgress } from "@mui/material";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { viewDiscountDetails } from "../../services/Collection";
import {
  Box,
  DetailBox,
  LabelSpanSection,
  SectionItemWrapper,
  VerticalLine,
} from "./DiscountStyle";
import IntlMessage from "../../Utils/IntlMessage";

export default function ViewDiscount({ open, handleClose, type }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const direction = useSelector((state) => state.languageDirection.direction);
  const [loading, setLoading] = useState(false);
  const [detailData, setDetailData] = useState({});

  const getViewDiscount = async () => {
    setLoading(true);
    let res = await viewDiscountDetails(Number(type.id));
    if (res.status === 200) {
      setDetailData(res.data);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getViewDiscount();
  }, []);
  return (
    <div>
      <Dialog
        dir={direction}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Cancel onClick={handleClose}>
          <i className="icon-CloseCross" />
        </Cancel>

        {loading ? (
          <LoadingWrapper style={{minWidth: "413px"}} >
            <CircularProgress sx={{ color: "#f55a2c" }} />
          </LoadingWrapper>
        ) : (
          <SectionItemWrapper>
            <section>
              <div style={{ width: "100%", textAlign: "center" }}>
                <header><IntlMessage id="disFreeItems.Heading"/></header>
              </div>

              <DetailBox>
                <div>
                  <label><IntlMessage id="disFreeItems.offerTitle"/> : </label>
                  <span>{detailData?.title}</span>
                </div>
              </DetailBox>

              {type.discount_type === "1" && (
                <LabelSpanSection
                  style={{ whiteSpace: "nowrap", flexDirection: "column" }}
                >
                  <div>
                    <label><IntlMessage id="disFreeItems.Type"/> : </label>
                    <span>{detailData?.discount_type == 1 ? "Item Free" : ""}</span>
                  </div>

                  {detailData?.DiscountFreeItems?.map((item) => (
                    <div style={{margin:"10px 0px", height:"100%"}}>
                      <>
                      <Box>
                        <div>
                          <label><IntlMessage id="Order.orderDeatils.item"/> : </label>
                          <span>{item?.offer_item_names}</span>
                          <VerticalLine />
                          <label><IntlMessage id="Order.orderDeatils.qTY"/> : </label>
                          <span>{item?.quantity}</span>
                        </div>
                      </Box>

                      <Box>
                        <div>
                          <label><IntlMessage id="disFreeItems.freeItem"/> : </label>
                          {item?.free_item_id?.map((el , index) => (
                            <span style={{ width:100}}>{el?.free_item_name} {index !== item.free_item_id.length - 1 && ","}</span>
                          ))}
                        </div>
                      </Box>
                      </>
                     </div>
                  ))}
                </LabelSpanSection>
              )}

              {type.discount_type === "2" && (
                <LabelSpanSection
                  style={{ whiteSpace: "nowrap", flexDirection: "column" }}
                >
                  <div>
                    <label><IntlMessage id="disFreeItems.Type"/> :</label>
                    <span>{detailData?.discount_type == 2 ? "Item Price Discount" : ""}</span>
                  </div>

                  {detailData?.DiscountItemPrices?.map((item) => (
                    <>
                  <Box>
                    <div>
                      <label><IntlMessage id="Order.orderDeatils.item"/>  :</label>
                      <span>{item?.offer_item_name}</span>
                      <VerticalLine />
                      <label><IntlMessage id="disFreeItems.discountedValue"/>  % :</label>
                      <span>{item?.discount}</span>
                    </div>
                  </Box>
                  <Box>
                    <div>
                      <label><IntlMessage id="Order.completed.orderNumber.qty"/>  :</label>
                      <span>{item?.minimum_quantity}</span>
                    </div>
                  </Box>
                  </>
                  ))}
                </LabelSpanSection>
              )}

              {type.discount_type === "3" && (
                <LabelSpanSection
                  style={{ whiteSpace: "nowrap", flexDirection: "column" }}
                >
                  <div>
                    <label><IntlMessage id="disFreeItems.Type"/>  :</label>
                    <span>{detailData?.discount_type == 3 ? "Total Price Discount" : ""}</span>
                  </div>
                  <Box>
                    <div>
                      <label><IntlMessage id="disFreeItems.minimumOrderAmount"/> : </label>
                      <span>{detailData?.minimum_order_amount}</span>
                    </div>
                  </Box>

                  <Box>
                    <div>
                      <label><IntlMessage id="disFreeItems.maximumOrderAmount"/> : </label>
                      <span>{detailData?.maximum_order_amount}</span>
                    </div>
                  </Box>

                  <Box>
                    <div>
                      <label><IntlMessage id="disFreeItems.discountedValue"/>  %: </label>
                      <span>{detailData?.discount}</span>
                    </div>
                  </Box>
                </LabelSpanSection>
              )}

              <LabelSpanSection>
                <p><IntlMessage id="Menu.createItem.Description"/>  :</p>
                <h1>
                  {detailData?.description}
                </h1>
              </LabelSpanSection>
            </section>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <BlackButtonMobile onClick={() => handleClose()}>
              <IntlMessage id="button.close"/> 
              </BlackButtonMobile>
            </div>
          </SectionItemWrapper>
        )}
      </Dialog>
    </div>
  );
}
