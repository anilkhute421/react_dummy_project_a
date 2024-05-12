import { CircularProgress, Skeleton } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  getPosDetails,
  getPosItemListing,
  getRestaurentItemListing,
  getRestaurentItemListPos,
  sectionItemListing,
  SyncingResItemWithPosItem,
} from "../../services/Collection";
import {
  BlackButton,
  BoxContainer,
  LoadingWrapper,
  NODATA,
  OrangeButton,
  SelectIcon,
  SubHeader,
} from "../../style/Gobalstyle";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import EditPos from "./EditPos";
import PosSetupDetails from "./PosSetupDetails";
import * as yup from "yup";
import { DependentField } from "../../validation/DependentField";
import { SelectInput } from "../Menu/MenuStyle";
import { useSelector } from "react-redux";
import IntegrationTable from "./IntegrationTable";
import { values } from "pusher-js";

export default function POS() {
  const [openPosSetup, setOpenPosSetup] = useState(false);
  const [openPosEdit, setOpenPosEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posInfo, setPosInfo] = useState(null);
  const [matchingPlatform, setMatchingPlatform] = useState(false);
  const direction = useSelector((state) => state.languageDirection.direction);
  const [restaurentItemListing, setRestaurentItemListing] = useState([]);
  const [posItemListing, setPosItemListing] = useState([])
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [sectionItemData, setsectionItemData] = useState([]);
  const [sectionItemPage, setsectionItemPage] = useState(null);

  const MatchingDataHeader = [
    {
      // id: <IntlMessage id="Menu.sectionItem.sortOrderId" />,
      id: "Section Name",
      key: "section_name",
    },
    {
      // id: <IntlMessage id="Menu.sectionItem.sortOrderId" />,
      id: "POS item",
      key: "pos_item_name",
    },
    

    {
      // id: <IntlMessage id="Menu.sectionItem.sortOrderId" />,
      id: "Restaurant's item",
      key: "name",
    },
    {
      // id: <IntlMessage id="Menu.sectionItem.Action" />,
      id: "POS price",
      key: "posPrice",
    },
    {
      // id: <IntlMessage id="Menu.sectionItem.sortOrderId" />,
      id: "Restaurant's price",
      key: "individualPrice",
    },
    {
      // id: <IntlMessage id="Menu.sectionItem.Action" />,
      id: "Action",
      key: "Action",
    },
  ];




  // Yup is used for validation.
  let schema = yup.object().shape({
    restaurentItem: yup.object().required("Please selecte an item"),
    posItem: yup.object().required("Please selecte an item"),
  });

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    setSkeletonLoading(true);
    console.log("values", values);

    let req = {
      pos_id: values.posItem.pos_item_id,
      pos_item_price: Number(values.posItem.pos_item_price),
      pos_item_name: values.posItem.pos_item_name,
      item_id: values.restaurentItem.id,
      item_price_id: values.restaurentItem.individualPriceID
    }

    let res = await SyncingResItemWithPosItem(req);
    if (res.status === 200) {
      toast.info(res.message);
      AlreadyMatchingItems();
      setSkeletonLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setSkeletonLoading(false);
    }


  };

  const getPOSInfo = async () => {
    setLoading(true);
    let res = await getPosDetails();
    if (res.status === 200) {
      setPosInfo(res.data);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };


  const RestaurentAllItems = async () => {
    // setSkeletonLoading(true);
    let req = {
      type: 1,
      pageNumber: 0,
    }
    let res = await getRestaurentItemListing(req);
    if (res.status === 200) {
      manipulateData(res.data);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      // setSkeletonLoading(false);
    }
  };

  const manipulateData = (listing) => {
    let newArr = [];
    listing?.map((integration) =>
      integration?.ItemPrices?.map((integration2) => {
        newArr.push({ ...integration, individualPrice: integration2.price, individualPriceID: integration2.id });
      })
    );
    if (newArr) setRestaurentItemListing(newArr);
    // setSkeletonLoading(false);
  };

  const PosAllItems = async () => {
    let res = await getPosItemListing();
    if (res.status === 200) {
      console.log(res.data, "data------------");
      setPosItemListing(res.data);
      // setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      // setLoading(false);
    }
  };
  // var pos = [
  //   {
  //     "pos_item_name": "Burger",
  //     "pos_section_id": "1003",
  //     "pos_item_id": "100002"
  //   },
  //   {
  //     "pos_item_name": "Club Sandwich",
  //     "pos_section_id": "1000",
  //     "pos_item_id": "100003"
  //   },
  //   {
  //     "pos_item_name": "Steak Sandwich",
  //     "pos_section_id": "1001",
  //     "pos_item_id": "100004"
  //   },
  //   {
  //     "pos_item_name": "Steak Egg & Chips",
  //     "pos_section_id": "1002",
  //     "pos_item_id": "100005"
  //   },
  //   {
  //     "pos_item_name": "Coke",
  //     "pos_section_id": "2000",
  //     "pos_item_id": "200001"
  //   },
  //   {
  //     "pos_item_name": "Coke Zero",
  //     "pos_section_id": "2000",
  //     "pos_item_id": "200002"
  //   },
  //   {
  //     "pos_item_name": "Pepsi",
  //     "pos_section_id": "2000",
  //     "pos_item_id": "200003"
  //   },
  //   {
  //     "pos_item_name": "Pepsi Light",
  //     "pos_section_id": "2000",
  //     "pos_item_id": "200004"
  //   },
  //   {
  //     "pos_item_name": "Merinda",
  //     "pos_section_id": "2000",
  //     "pos_item_id": "200005"
  //   },
  //   {
  //     "pos_item_name": "Done Medium",
  //     "pos_section_id": "9001",
  //     "pos_item_id": "900002"
  //   },
  //   {
  //     "pos_item_name": "Done Well",
  //     "pos_section_id": "9001",
  //     "pos_item_id": "900003"
  //   },
  //   {
  //     "pos_item_name": "Done Rare",
  //     "pos_section_id": "9001",
  //     "pos_item_id": "900004"
  //   },
  //   {
  //     "pos_item_name": "Add Fries",
  //     "pos_section_id": "9100",
  //     "pos_item_id": "900101"
  //   },
  //   {
  //     "pos_item_name": "Add Side Salad",
  //     "pos_section_id": "9100",
  //     "pos_item_id": "900102"
  //   }
  // ];


  const AlreadyMatchingItems = async () => {
    let req = {
      type: 2,
      pageNumber: 1,
    }


    let res = await getRestaurentItemListing(req);
    if (res.status === 200) {
      manipulateDataForTable(res.data)
      // setsectionItemPage(res.extraData);
      // setAllRecord(res.totalRecords);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  }

  const manipulateDataForTable = (listing) => {
    let newArr = [];
    listing?.map((integration) =>
      integration?.ItemPrices?.map((integration2) => {
        if (integration2.pos_item_price) {
          newArr.push({ ...integration, individualPrice: integration2.price, individualPriceID: integration2.id, posPrice: integration2.pos_item_price });
        }
      })
    );
    console.log('newArr', newArr)
    if (newArr) setsectionItemData(newArr);
    // setSkeletonLoading(false);
  };

  const TableAction = {
    apply: true,
    unlink: true,
    fetchData : AlreadyMatchingItems

  };


  useEffect(() => {
    getPOSInfo();
    RestaurentAllItems();
    PosAllItems();
    AlreadyMatchingItems();
  }, []);

  return (
    <div>
      {openPosSetup && (
        <PosSetupDetails
          open={openPosSetup}
          handleClose={() => setOpenPosSetup(false)}
          fetchData={getPOSInfo}
        />
      )}

      {openPosEdit && (
        <EditPos
          open={openPosEdit}
          handleClose={() => setOpenPosEdit(false)}
          fetchData={getPOSInfo}
          data={posInfo}
        />
      )}
      <SubHeader>
        <p>Micros simphony POS </p>

        <div>
          <OrangeButton
            className="withAnimation"
            onClick={() => setMatchingPlatform(!matchingPlatform)}
          >
            {/* <IntlMessage id="button.Plans" /> */}
            Matching
          </OrangeButton>

          <OrangeButton onClick={() => setOpenPosSetup(true)}>
            {/* <IntlMessage id="button.Plans" /> */}
            Create POS setup
          </OrangeButton>
        </div>
      </SubHeader>

      {matchingPlatform && (
        <BoxContainer className="withAnimation">


          {skeletonLoading ?
            <MatchingWrapper>
              <section>
                <div>
                  <Skeleton animation="wave" >
                    <div>
                      <label>POS Items Listing</label>
                    </div>
                    <p>Dummy</p>
                  </Skeleton>
                  <Skeleton animation="wave" >
                    <div>
                      <label>Lorem Ipsum is simply dummy text of the ssa</label>
                    </div>
                    <p>Lorem</p>
                    <p>Lorem</p>
                    <p>Lorem</p>
                  </Skeleton>
                </div>
                <div>
                  <Skeleton animation="wave" >
                    <div>
                      <label>POS Items Listing</label>
                    </div>
                    <p>Dummy</p>
                  </Skeleton>
                  <Skeleton animation="wave" >
                    <div>
                      <label>Lorem Ipsum is simply dummy text of the ssa</label>
                    </div>
                    <p>Lorem</p>
                    <p>Lorem</p>
                    <p>Lorem</p>
                  </Skeleton>
                </div>
              </section>
              <div>
                <Skeleton animation="wave" >
                  <h1>Lorem</h1>
                  <p>Ipsum</p>
                </Skeleton>
                <Skeleton animation="wave" >
                  <h1>Lorem</h1>
                  <p>Ipsum</p>
                </Skeleton>
              </div>
            </MatchingWrapper>

            :

            <Formik
              initialValues={{
                posItem: "",
                restaurentItem: "",
              }}
              validationSchema={schema}
              onSubmit={handleSubmit}
            >
              <Form>
                <MatchingWrapper>
                  <section>
                    <div>
                      <label>POS Items Listing</label>

                      <Field
                        name="posItem"
                        component={DependentField}
                        getChanges={() => function Close() { }}
                        options={posItemListing}
                        getOptionLabel={(option) => (option ? option?.pos_item_name + " - " + option?.pos_item_price : "")}
                        renderInput={(params) => (
                          <div
                            ref={params.InputProps.ref}
                            style={{ position: "relative" }}
                          >
                            <SelectInput
                              placeholder="POS"
                              Dir={direction}
                              type="text"
                              {...params.inputProps}
                            />
                            <SelectIcon
                              className="icon-DropDownArrow"
                              dir="ltr"
                            />
                          </div>
                        )}
                      />
                    </div>

                    <div>
                      <label>Aqlut Items Listing</label>

                      <Field
                        name="restaurentItem"
                        component={DependentField}
                        getChanges={() => function Close() { }}
                        options={restaurentItemListing}
                        getOptionLabel={(option) =>
                          option
                            ? option?.name + " - " + option?.individualPrice
                            : ""
                        }
                        renderInput={(params) => (
                          <div
                            ref={params.InputProps.ref}
                            style={{ position: "relative" }}
                          >
                            <SelectInput
                              placeholder="Aqlut"
                              Dir={direction}
                              type="text"
                              {...params.inputProps}
                            />
                            <SelectIcon
                              className="icon-DropDownArrow"
                              dir="ltr"
                            />
                          </div>
                        )}
                      />
                    </div>
                  </section>
                  <div>
                    <BlackButton>Link</BlackButton>
                    <OrangeButton
                      style={{ background: "#979797" }}
                      onClick={() => setMatchingPlatform(false)}
                    >
                      Close
                    </OrangeButton>
                  </div>
                </MatchingWrapper>
              </Form>
            </Formik>

          }


        </BoxContainer>
      )}
      <BoxContainer>
        {loading ? (
          <LoadingWrapper style={{ minHeight: "90px" }}>
            <CircularProgress sx={{ color: "#f55a2c" }} />
          </LoadingWrapper>
        ) : (
          <PosDetailsWrapper>
            <section>
              <div>
                <label>POS URL:</label>
                <span>{posInfo?.pos_url}</span>
              </div>

              <div>
                <label>Employee Number:</label>
                <span>{posInfo?.employee_no}</span>
              </div>

              <div>
                <label>Revenue Center Number:</label>
                <span>{posInfo?.revenue_center}</span>
              </div>
            </section>
            <section>
              <BlackButton onClick={() => setOpenPosEdit(true)}>
                Edit POS
              </BlackButton>
            </section>
          </PosDetailsWrapper>
        )}
      </BoxContainer>

      <BoxContainer>

        {console.log('sectionItemData' , sectionItemData)}

        {sectionItemData.length > 0 ?

          <IntegrationTable
            header={MatchingDataHeader}
            tableData={sectionItemData}
            action={TableAction}
          />
          :
          <NODATA>SORRY, You didn't sync any item</NODATA>
        }
      </BoxContainer>
    </div>
  );
}

const PosDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    margin: 5px 0;
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
    color: #646464;
    margin: 0 10px;
  }
`;

const MatchingWrapper = styled.div`
  width: 100%;

  display: flex;
  section {
    width: 90%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10%;

    button {
      whitespace: nowrap;
    }
  }

  label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.08em;
    color: #000000;
    margin: 0 10px;
  }
`;
