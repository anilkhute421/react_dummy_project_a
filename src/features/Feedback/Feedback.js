import { CircularProgress } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { feedbackListing, searchFeedback } from "../../services/Collection";
import {
  BoxContainer,
  FilterButton,
  LoadingWrapper,
  NODATA,
  SubHeader,
} from "../../style/Gobalstyle";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import { CardWrapper, FeedbackCard } from "./FeedbackStyle";
import styled from "styled-components";
import { ExportFeature } from "../../Utils/ExportFiles";
import IntlMessage from "../../Utils/IntlMessage";
import FeedbackFilter from "./FeedbackFilter";

export default function Feedback() {
  const direction = useSelector((state) => state.languageDirection.direction);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const [openFilterSection, setOpenFilterSection] = useState(false);
  const RestaurentID = useSelector(
    (state) => state?.profileDetails?.restaurantDetails?.id
  );

  const getfeedbackListing = async () => {
    setLoading(true);
    let res = await feedbackListing();
    if (res.status === 200) {
      setFeedbackData(res.data);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const getWord = async (word) => {
    setLoading(true);

    let res = await searchFeedback(word);
    if (res.status === 200) {
      setFeedbackData(res.data);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const OpenFilterUser = () => {
    setOpenFilterSection(true);
  };

  useEffect(() => {
    getfeedbackListing();
  }, []);

  return (
    <div>

{openFilterSection && (
        <FeedbackFilter
          open={openFilterSection}
          handleClose={() => setOpenFilterSection(false)}
          // getAllsection={fetchData}
        />
      )}
      <SubHeader>
        <p>Feedback Management</p>
      </SubHeader>

      <BoxContainer>
        <FilterSection>
          <ShowButton>
            {/* <p>
              <IntlMessage id="button.show" />
            </p>
            <input type="number" value={10} /> */}
          </ShowButton>

          <SearchFEwrapper>
            <SearchButton>
              <i className="icon-Search" />
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => getWord(e.target.value)}
              />
            </SearchButton>
            <FilterWrapper>
              <FilterButton onClick={OpenFilterUser}>
                <i className="icon-Filter" />
                <p>
                  <IntlMessage id="button.Filters" />
                </p>
              </FilterButton>

              <FilterButton
                onClick={() =>
                  ExportFeature(
                    `https://aqlutstorage.blob.core.windows.net/exportfile/Feedbacklist${RestaurentID}.xlsx`
                  )
                }
              >
                <i className="icon-Export" />
                <p>
                  <IntlMessage id="button.Export" />
                </p>
              </FilterButton>
            </FilterWrapper>
          </SearchFEwrapper>
        </FilterSection>
        {loading ? (
          <LoadingWrapper>
            <CircularProgress sx={{ color: "#f55a2c" }} />
          </LoadingWrapper>
        ) : (
          <>
            {feedbackData && feedbackData?.length === 0 ? (
              <NODATA>NO DATA FOUND</NODATA>
            ) : (
              <CardWrapper>
                {feedbackData.length > 0 &&
                  feedbackData.map((iteration) => (
                    <FeedbackCard
                      dir={direction}
                      onClick={() =>
                        navigate(
                          `/aglut/feedback/summary/${iteration.order_id}`
                        )
                      }
                    >
                      <span>Order Detail</span>
                      <header>{iteration?.Customer?.name}</header>
                      <label>
                        {" "}
                        {moment(iteration.createdAt).format("LT")}
                      </label>{" "}
                      <label>
                        {" "}
                        {moment(iteration.createdAt).format("DD MMM YYYY")}
                      </label>
                      <div>
                        <h6>
                          {iteration.rate_of_exeperience === "smile1" ? (
                            <i className="icon-Star" />
                          ) : iteration.rate_of_exeperience === "smile2" ? (
                            <>
                              {" "}
                              <i className="icon-Star" />{" "}
                              <i className="icon-Star" />
                            </>
                          ) : iteration.rate_of_exeperience === "smile3" ? (
                            <>
                              <i className="icon-Star" />{" "}
                              <i className="icon-Star" />{" "}
                              <i className="icon-Star" />
                            </>
                          ) : iteration.rate_of_exeperience === "smile4" ? (
                            <>
                              {" "}
                              <i className="icon-Star" />{" "}
                              <i className="icon-Star" />{" "}
                              <i className="icon-Star" />{" "}
                              <i className="icon-Star" />{" "}
                            </>
                          ) : iteration.rate_of_exeperience === "smile5" ? (
                            <>
                              {" "}
                              <i className="icon-Star" />{" "}
                              <i className="icon-Star" />{" "}
                              <i className="icon-Star" />{" "}
                              <i className="icon-Star" />{" "}
                              <i className="icon-Star" />
                            </>
                           ) : (
                            ""
                          )}
                        </h6>

                        <p style={{ margin: "5px 0px" }}>
                          {iteration.thoughts}
                        </p>
                      </div>
                    </FeedbackCard>
                  ))}
              </CardWrapper>
            )}
          </>
        )}
      </BoxContainer>
    </div>
  );
}

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 745px) {
    // margin:10px 0px;
    display: unset;
  }
`;

const SearchButton = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.28);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 13px 10px;
  margin: 0 6px 0 6px;
  cursor: pointer;

  i {
    font-size: 14px;
    margin: 0 6px 0 6px;
  }

  input {
    width: 100%;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    margin: 0 5px 0 6px;
    opacity: 0.9;
  }

  input:focus {
    outline: none;
  }

  @media (max-width: 745px) {
    margin: 10px 0px;
    // display:"unset";
  }
`;

const SearchFEwrapper = styled.div`
  display: flex;
  @media (max-width: 745px) {
    display: unset;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 745px) {
    display: "unset";
  }
`;

const ShowButton = styled.div`
  display: flex;
  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.6);
    width: 40px;
    margin-top: 25px;
  }

  input {
    width: 51px;
    height: 23px;
    background: #ffffff;
    margin: 20px 6px 0 6px;
    padding: 0 5px;
    border: 1px solid #e8e8e8;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: rgba(0, 0, 0, 0.6);
    @media (max-width: 745px) {
      display: "unset";
    }
  }
`;
