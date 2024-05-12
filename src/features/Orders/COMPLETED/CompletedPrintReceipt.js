import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import {
  BlackButtonMobile,
  Cancel,
  OrangeButton,
} from "../../../style/Gobalstyle";
import moment from "moment/moment";
import IntlMessage from "../../../Utils/IntlMessage";

// Create styles
const styles = StyleSheet.create({
  body: {},
  header: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    restaurentName: {
      fontSize: "25px",
      fontWeight: "500",
    },
    address: {
      fontSize: "12px",
      fontWeight: "400",
      textTransform: "uppercase",
      margin: "5px 0",
    },
  },
  phase: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "uppercase",
    margin: "10px 0 0 0",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    fontWeight: "400",
    margin: "10px 0 0 0",
    borderTop: "1px solid #000",
    borderBottom: "1px solid #000",

    ID: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "2px 5px",
    },
  },
  table: {
    width: "100%",
    addons: {
      display:"block",
      width: "100%",
      margin: "0 2px",
      fontSize: "12px",
      fontWeight: "500",
      color: "red",
    },
    header: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      Row1: {
        width: "50%",
        margin: "0 2px",
        fontSize: "16px",
        fontWeight: "500",
        Text: {
          width: "100%",
        },
      },

      Row2: {
        width: "15%",
        margin: "0 2px",
        textAlign: "center",
        fontSize: "16px",
        fontWeight: "500",
        Text: {
          width: "100%",
        },
      },

      Row3: {
        width: "15%",
        margin: "0 2px",
        textAlign: "center",
        fontSize: "16px",
        fontWeight: "500",
        Text: {
          width: "100%",
        },
      },

      Row4: {
        width: "20%",
        margin: "0 2px",
        textAlign: "center",
        fontSize: "16px",
        fontWeight: "500",
        Text: {
          width: "100%",
        },
      },
    },
    body: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      Row1: {
        width: "50%",
        margin: "1px 2px",
        fontSize: "14px",
        fontWeight: "400",
        Text: {
          width: "100%",
        },
      },
      Row2: {
        width: "15%",
        margin: "1px 2px",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "400",
        Text: {
          width: "100%",
        },
      },

      Row3: {
        width: "15%",
        margin: "1px 2px",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "400",
        Text: {
          width: "100%",
        },
      },

      Row4: {
        width: "20%",
        margin: "1px 2px",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "400",
        Text: {
          width: "100%",
        },
      },
    },
  },
  PriceSection: {
    textAlign: "right",
    margin: "20px 0",
  },
  totalPrice: {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    padding: "0 10px",
    fontSize: "13px",
    fontWeight: "500",
  },
  grandTotal: {
    display: "flex",
    justifyContent: "end",
    padding: "10px",
    fontSize: "15px",
    fontWeight: "700",
  },
});

const MyDoc = ({ subOrderData, getURL }) => {
  const Language = useSelector((state) => state.languageDirection?.language);
  const RestaurentDetails = useSelector(
    (state) => state.profileDetails?.restaurantDetails
  );
  const CurrentDateTime = new Date();

  return (
    <>
      <Document>
        <Page
          size="A5"
          style={styles.body}
          bookmark="Harry Potter and the Philosopher's Stone"
        >
          <View style={styles.header}>
            <Text style={styles.header.restaurentName}>
              {Language === "en"
                ? RestaurentDetails?.name
                : RestaurentDetails?.ar_name}
            </Text>
            <Text style={styles.header.address}>
              {RestaurentDetails?.address}
            </Text>
          </View>

          <View style={styles.phase}>
            <Text>
              {moment(CurrentDateTime).format("dddd")}{" "}
              {moment(CurrentDateTime).format("DD-MM-YYYY")}
            </Text>
            <Text>{moment(CurrentDateTime).format("h:mm a")}</Text>
          </View>
          <View style={styles.details}>
            <View style={styles.details.ID}>
              <Text><IntlMessage id="Order.orderDeatils.printRecipts.orderId"/>: </Text>
              <Text>{subOrderData?.OrderItems[0]?.order_id}</Text>
            </View>

            {/* <View style={styles.details.ID}>
              <Text>Terminal ID : </Text>
              <Text>11111</Text>
            </View>

            <View style={styles.details.ID}>
              <Text>Trasaction ID : </Text>
              <Text>#6ebac4124</Text>
            </View>

            <View style={styles.details.ID}>
              <Text>Type : </Text>
              <Text>CREDIT</Text>
            </View> */}
          </View>
          <View style={styles.table}>
            <View style={styles.table.header}>
              <View style={styles.table.header.Row1}><IntlMessage id="Order.orderDeatils.item"/></View>
              <View style={styles.table.header.Row2}><IntlMessage id="Feedback.View.QTY"/>.</View>
              <View style={styles.table.header.Row3}><IntlMessage id="Menu.sectionItem.Price"/></View>
              <View style={styles.table.header.Row4}><IntlMessage id="Order.orderDeatils.amount"/></View>
            </View>

            {subOrderData?.OrderItems?.map((el, index) => (
              <View>
                <View style={styles.table.body}>
                  <View style={styles.table.body.Row1}>
                    {index + 1}. {el?.item_name}
                  </View>
                  <View style={styles.table.body.Row2}>{el?.quantity}</View>
                  <View style={styles.table.body.Row3}>{el?.amount}</View>
                  <View style={styles.table.body.Row4}>{el?.sub_total}</View>
                </View>
                {el?.OrderItemAddOns &&
                  el?.OrderItemAddOns.map((addons) => (
                    <View style={styles.table.addons}>
                      {addons?.option_group_name} ({addons?.option_item_name})
                    </View>
                  ))}
              </View>
            ))}
          </View>

          <View>
            <View style={styles.totalPrice}>
              <Text><IntlMessage id="Order.orderDeatils.printRecipts.totalAmount"/> - {subOrderData?.sub_total}</Text>
              <Text>
              <IntlMessage id="profileSection.vat"/> - {subOrderData?.vat}
              </Text>
              <Text>
              <IntlMessage id="profileSection.serviceCharge"/>  -{" "}
                {subOrderData?.service_tax}
              </Text>
              <Text>
              <IntlMessage id="userManagement.rolePermission.discount"/>  -{" "}
                  {subOrderData?.discount}
                </Text>
            </View>
            

            <View style={styles.grandTotal}>
              <Text><IntlMessage id="Order.orderDeatils.printRecipts.totalAmount"/> - {subOrderData?.total}</Text>
            </View>
          </View>
        </Page>
      </Document>

      <PDFDownloadLink
        document={
          <Document>
            <Page
              size="A5"
              style={styles.body}
              bookmark="Harry Potter and the Philosopher's Stone"
            >
              <View style={styles.header}>
                <Text style={styles.header.restaurentName}>
                  {Language === "en"
                    ? RestaurentDetails?.name
                    : RestaurentDetails?.ar_name}
                </Text>
                <Text style={styles.header.address}>
                  {RestaurentDetails?.address}
                </Text>
              </View>

              <View style={styles.phase}>
                <Text>
                  {moment(CurrentDateTime).format("dddd")}{" "}
                  {moment(CurrentDateTime).format("DD-MM-YYYY")}
                </Text>
                <Text>{moment(CurrentDateTime).format("h:mm a")}</Text>
              </View>
              <View style={styles.details}>
                <View style={styles.details.ID}>
                  <Text>Merchant ID : </Text>
                  <Text>9bjsjkdchdsc220e</Text>
                </View>

                <View style={styles.details.ID}>
                  <Text>Terminal ID : </Text>
                  <Text>11111</Text>
                </View>

                <View style={styles.details.ID}>
                  <Text>Trasaction ID : </Text>
                  <Text>#6ebac4124</Text>
                </View>

                <View style={styles.details.ID}>
                  <Text>Type : </Text>
                  <Text>CREDIT</Text>
                </View>
              </View>
              <View style={styles.table}>
                <View style={styles.table.header}>
                  <View style={styles.table.header.Row1}>
                    <Text style={styles.table.header.Row1.Text}>Item</Text>
                  </View>
                  <View style={styles.table.header.Row2}>
                    <Text style={styles.table.header.Row2.Text}>Qty.</Text>
                  </View>
                  <View style={styles.table.header.Row3}>
                    <Text style={styles.table.header.Row3.Text}>Price</Text>
                  </View>
                  <View style={styles.table.header.Row4}>
                    <Text style={styles.table.header.Row4.Text}>Amount</Text>
                  </View>
                </View>

                {subOrderData?.OrderItems?.map((el, index) => (
                  <View>
                    <View style={styles.table.body}>
                      <View style={styles.table.body.Row1}>
                        <Text style={styles.table.body.Row1.Text}>
                          {index + 1}. {el?.item_name}
                        </Text>
                      </View>
                      <View style={styles.table.body.Row2}>
                        <Text style={styles.table.body.Row2.Text}>
                          {el?.quantity}
                        </Text>
                      </View>
                      <View style={styles.table.body.Row3}>
                        <Text style={styles.table.body.Row3.Text}>
                          {el?.amount}
                        </Text>
                      </View>
                      <View style={styles.table.body.Row4}>
                        <Text style={styles.table.body.Row4.Text}>
                          {el?.sub_total}
                        </Text>
                      </View>
                    </View>
                    {el?.OrderItemAddOns &&
                      el?.OrderItemAddOns.map((addons) => (
                        <View style={styles.table.addons}>
                          {addons?.option_item_name} 
                        </View>
                      ))}
                  </View>
                ))}
              </View>

              <View style={styles.PriceSection}>
                <View style={styles.totalPrice}>
                  <Text>Total Amount - {subOrderData?.sub_total}</Text>
                  <Text>
                    Vat {RestaurentDetails?.vat}% - {subOrderData?.vat}
                  </Text>
                  <Text>
                    Service Charge {RestaurentDetails?.service_charge}% -{" "}
                    {subOrderData?.service_tax}
                  </Text>
                </View>

                <View style={styles.grandTotal}>
                  <Text>Total Amount - {subOrderData?.total}</Text>
                </View>
              </View>
            </Page>
          </Document>
        }
        fileName="somename.pdf"
      >
        {({ blob, url, loading, error }) => {
          getURL(blob, url, loading, error);
        }}
      </PDFDownloadLink>
    </>
  );
};

export default function CompletedPrintReceipt({
  open,
  handleClose,
  subOrderData,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [billReceipt, setBillReceipt] = useState(null);
  const getURL = (blob, url, loading, error) => {
    setBillReceipt(url);
  };
  const direction = useSelector((state) => state.languageDirection.direction);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Cancel onClick={handleClose} dir={direction}>
          <i className="icon-CloseCross" />
        </Cancel>

        <PrintReceiptWrapper>
          <div>
            <MyDoc subOrderData={subOrderData} getURL={getURL} />
          </div>

          <ButtonWrapper style={{ marginTop: "20px" }}>
            {billReceipt && (
              <>
                <BlackButtonMobile onClick={() => handleClose()}>
                <IntlMessage id="button.close"/>
                </BlackButtonMobile>
                <OrangeButton>
                  <a href={billReceipt} target="_blank">
                  <IntlMessage id="button.print"/>
                  </a>
                </OrangeButton>
              </>
            )}
          </ButtonWrapper>
        </PrintReceiptWrapper>
      </Dialog>
    </div>
  );
}

const PrintReceiptWrapper = styled.div`
  // width: 310px;
  width: 100%;
  height: 100vh;
  background: #fff;
  padding: 40px 10px 20px 10px;

  div {
    width: 100%;
    outline: 1px dashed #979797;
    padding: 5px;
  }

  overflow-y: scroll;

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
`;

export const ButtonWrapper = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
`;
