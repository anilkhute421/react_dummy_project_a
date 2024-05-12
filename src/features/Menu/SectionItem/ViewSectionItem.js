import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { viewSectionItem } from "../../../services/Collection";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { aqlutstorage, containerItem } from "../../../Utils/ContainerPath";
import {
  BlackButton,
  BlackButtonMobile,
  Cancel,
  LoadingWrapper,
  OrangeButton,
} from "../../../style/Gobalstyle";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import IntlMessage from "../../../Utils/IntlMessage";


export default function ViewSectionItem({ open, handleClose, payload }) {
  const direction = useSelector((state) => state.languageDirection.direction);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [sectionItemData, setSectionItemData] = useState({});
  const navigate = useNavigate();

  const getDetails = async () => {
    setLoading(true);

    let req = {
      itemId: payload.id,
    };

    let res = await viewSectionItem(req);
    if (res.status === 200) {
      setSectionItemData(res.data);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

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

        {loading ? (
          <LoadingWrapper style={{minWidth: "413px"}}>
            <CircularProgress sx={{ color: "#f55a2c" }} />
          </LoadingWrapper>
        ) : (
          <SectionItemWrapper>
            {sectionItemData?.image !== null ? (
              <img
                src={`${aqlutstorage}${containerItem}${sectionItemData?.image}`}
                alt=""
              />
            ) : (
              <ViewSectionItemImageWrapper>
                <i className="icon-Menu" />
                <span>My Menu</span>
              </ViewSectionItemImageWrapper>
            )}
            <section>
              <div className="flex-space-between">
                <header>{sectionItemData?.name}</header>
                <span
                  onClick={() =>
                    navigate(
                      `/aglut/menu/sectionItems/edit/${sectionItemData.id}`
                    )
                  }
                >
                  <i className="icon-Edit" />
                  <label><IntlMessage id="button.EDIT" /></label>
                </span>
              </div>

              <DetailBox>
                <div>
                  <label><IntlMessage id="Menu.sectionItem.Menus" /> : </label>
                  <span>{sectionItemData?.Menu?.name}</span>
                </div>
                <div>
                  <label><IntlMessage id="Menu.sectionItem.Section" /> : </label>
                  <span>{sectionItemData?.Section?.section_name}</span>
                </div>
                {sectionItemData?.allergies?.length > 0 ? <div>
                  <label><IntlMessage id="Menu.createItem.Allergies" /> : </label>
                  {sectionItemData?.allergies?.map((item) => (
                    <span>{item?.name}</span>
                  ))}
                </div> : ""}


                <div>
                  <label><IntlMessage id="Menu.sectionItem.sortOrderId" /> : </label>
                  <span>{sectionItemData?.sort_order_id}</span>
                </div>

                {sectionItemData?.RecommendedItems?.length > 0 ?
                  <div>
                    <label><IntlMessage id="Menu.fastFood.Recommended" /> : </label>
                    <RecommendedWrap>
                      {sectionItemData?.RecommendedItems?.map((item) => (
                        <span>{item?.name}</span>
                      ))}
                    </RecommendedWrap>
                  </div> : ""
                }
              </DetailBox>

              <LabelSpanSection>
                <p><IntlMessage id="Menu.sectionItem.Price" /> : </p>
                <Box>
                  {sectionItemData?.ItemPrices?.map((item) => (
                    <div style={{ margin: "15px 0px" }}>
                      {item?.name ?
                        <>
                          <label><IntlMessage id="Menu.sectionItem.Name" /> : </label>
                          <span>{item?.name}</span>
                          <VerticalLine />
                        </>
                        : ""
                      }
                      <label><IntlMessage id="Menu.sectionItem.Price" /> : </label>
                      <span>{item?.price}</span>
                      {item?.calories ?
                        <>
                        <VerticalLine />
                          <label><IntlMessage id="Menu.createItem.Calories" />  : </label>
                          <span>{item?.calories}</span>
                        </>
                        : ""
                      }
                    </div>
                  ))}
                </Box>
              </LabelSpanSection>

              <LabelSpanSection>
                <p><IntlMessage id="Menu.createItem.Description" /> :</p>
                <h1>{sectionItemData?.desc}</h1>
              </LabelSpanSection>

              <LabelSpanSection style={{ whiteSpace: "nowrap" }}>
                {sectionItemData?.optionSets?.length > 0 && (
                  <>
                    <p><IntlMessage id="Menu.fastFood.optionSets" />  :</p>
                    <Box>
                      {sectionItemData?.optionSets?.map((item) => (
                        <div>
                          <label><IntlMessage id="Menu.createItem.modifierGroup" />  : </label>
                          <span>{item?.modifiergroup}</span>
                          <VerticalLine />
                          <label><IntlMessage id="Menu.createItem.Max" />  : </label>
                          <span>{item?.max}</span>
                          <VerticalLine />
                          <label><IntlMessage id="Menu.createItem.Min" />  : </label>
                          <span>{item?.min}</span>

                          <VerticalLine />

                          <label><IntlMessage id="Menu.createItem.Required" />  : </label>
                          <span>{item?.required == 1 ? "Yes" : "No"}</span>
                        </div>
                      ))}
                    </Box>
                  </>
                )}
              </LabelSpanSection>
            </section>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <BlackButtonMobile onClick={() => handleClose()}>
              <IntlMessage id="button.close" />
              </BlackButtonMobile>
            </div>
          </SectionItemWrapper>
        )}
      </Dialog>
    </div>
  );
}

const RecommendedWrap = styled.div`
  display: flex;
  span {
    white-space: nowrap;
    margin: 0 5px;
  }
`;

const LabelSpanSection = styled.div`
  display: flex;
  margin: 10px 0;

  p {
    font-family: "Jost";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.08em;
    color: #000000;
    margin: 0 5px;
    white-space: nowrap;
  }
`;

const VerticalLine = styled.span`
width: 0px;
height: 20px;
border: 1px solid rgb(0 0 0 / 15%);
margin 0 10px;
`;

const Box = styled.div`
  background: #fcfdfe;
  border: 0.659039px solid #f0f1f7;
  border-radius: 5.27231px;
  margin: 0 20px;
  padding: 10px;
  width: 100%;

  div {
    font-family: "Jost";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 124.5%;
    letter-spacing: 0.08em;
    label {
      color: #000000 !important;
    }
    span {
      color: #141414;
    }
  }
`;

const DetailBox = styled.div`
  width: 100%;
  // height: 102px;
  background: #fcfdfe;
  border: 0.659039px solid #f0f1f7;
  border-radius: 5.27231px;
  padding: 9px 14px;
  margin: 10px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  div {
    font-family: "Jost";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.08em;
    display: flex;
    flex-direction: column;
  }
  label {
    color: #000000 !important;
    margin: 10px 0;
  }
  span {
    color: #646464;
  }
`;

const SectionItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  overflow-y: auto;
  scrollbar-width: thin;
 

  ::-webkit-scrollbar {
    width: 4px;
    height: 8px;
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

    header {
      font-family: "Jost";
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      color: #202020;
    }

    label {
      font-family: "Jost";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #f55a2c;
    }
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

const ViewSectionItemImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
