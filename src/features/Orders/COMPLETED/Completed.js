import React, { useEffect, useState } from "react";
import {
  BoxContainer,
  FilterButton,
  FilterSection,
  LoadingWrapper,
  NODATA,
} from "../../../style/Gobalstyle";
import OrderTable from "../OrderTable";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import {
  getOrderListing,
  searchCompletedOrder,
} from "../../../services/Collection";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import PaginationRounded from "../../../components/PaginationRounded";
import IntlMessage from "../../../Utils/IntlMessage";
import OrderFilter from "./OrderFilter";

export default function Completed() {
  const UserHeader = [
    {
      id: <IntlMessage id="Order.completed.orderId"/>,
      key: "id",
    },

    {
      id: <IntlMessage id="Order.completed.date"/>, 
      key: "order_date",
    },
    {
      id: <IntlMessage id="Order.completed.orderType"/>,
      key: "order_type",
    },
    {
      id: <IntlMessage id="Order.completed.QR Code Name"/>,
      key: "qr_code_name",
    },

    {
      id: <IntlMessage id="Order.completed.modeOfPayment"/>,
      key: "mode_of_payment",
    },
    {
      id: <IntlMessage id="Order.completed.price"/>,
      key: "total",
    },
    {
      id: <IntlMessage id="Order.orderDeatils.action"/>,
      key: "Action",
    },
  ];

  const TableAction = {
    apply: true,
    showDetail: true,
    // showDetailPath:"/aglut/orders/completed/details/"
  };

  const [loading, setLoading] = useState(false);
  const [completedData, setCompletedData] = useState(null);
  const [sectionItemPage, setsectionItemPage] = useState(null);
  const [pageNumber, setPagenumber] = useState(1);
  const [openFilterSection, setOpenFilterSection] = useState(false);


  const getCompletedListing = async () => {
    setLoading(true);
    let res = await getOrderListing(3);
    if (res.status === 200) {
      setCompletedData(res.data);
      setsectionItemPage(res.extraData);
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

  const getWord = async (word) => {
    setLoading(true);
    const req = {
      search: word,
      pageNumber: 1,
    };

    let res = await searchCompletedOrder(req);
    if (res.status === 200) {
      setCompletedData(res.data);
      setLoading(false);
    }
  };

  const myValue = (pages) => {
    setPagenumber(pages);
  };

  useEffect(() => {
    getCompletedListing();
  }, [pageNumber]);

  return (
    <div>

{openFilterSection && (
        <OrderFilter
          open={openFilterSection}
          handleClose={() => setOpenFilterSection(false)}
          // getAllsection={fetchData}
        />
      )}
      <BoxContainer>
      <FilterSection>
          <ShowButton>
            <p><IntlMessage id="button.show" /></p>
            <input type="number" value={10} />
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
                <p><IntlMessage id="button.Filters" /></p>
              </FilterButton>

              <FilterButton>
                <i className="icon-Export" />
                <p><IntlMessage id="button.Export" /></p>
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
            {completedData?.length === 0 ? (
              <NODATA><IntlMessage id="noData" /></NODATA>
            ) : (
              <OrderTable
            header={UserHeader}
            tableData={completedData}
            action={TableAction}
            subheader={[]}
            subcontents={[]}
          />
            )}
          </>
        )}



        {/* {!loading ? (
          <OrderTable
            header={UserHeader}
            tableData={completedData}
            action={TableAction}
            subheader={[]}
            subcontents={[]}
          />
        ) : (
          <LoadingWrapper>
            <CircularProgress sx={{ color: "#f55a2c" }} />
          </LoadingWrapper>
        )} */}

        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <PaginationRounded
            PaginationRounded={sectionItemPage}
            onChangePage={(_page) => myValue(_page)}
          />
        </div>
      </BoxContainer>
    </div>
  );
}

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
    margin:10px 0px;
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
`;
