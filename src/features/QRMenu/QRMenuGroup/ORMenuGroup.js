import React, { useEffect, useState } from "react";
import {
  BoxContainer,
  OrangeButton,
  SubHeader,
  FilterButton,
  FilterSection,
  LoadingWrapper,
  NODATA,
} from "../../../style/Gobalstyle";
import QRTable from "../QRTable";
import CreateMenuGroup from "./CreateMenuGroup";
import styled from "styled-components";
import {
  listingMenuGroups,
  searchQrMenuGroups,
  showQrMenuListing,
} from "../../../services/Collection";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import PaginationRounded from "../../../components/PaginationRounded";
import { useSelector } from "react-redux";
import IntlMessage from "../../../Utils/IntlMessage";
import { ExportFeature } from "../../../Utils/ExportFiles";
import QRMenuFilter from "./QRMenutFilter";

export default function ORMenuGroup() {
  const [openCreateMenuGroup, setOpenCreateMenuGroup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuGroupData, setMenuGroupData] = useState([]);
  const [qrMenuGroups, setqrMenuGroupsPage] = useState(null);
  const [pageNumber, setPagenumber] = useState(1);
  const [perPageListing, setPerPageListing] = useState(15);
  const [openFilterSection, setOpenFilterSection] = useState(false);


  // const [userManagmentPage, setUserManagmentPage] = useState(null);

  const qrMenuPermission = useSelector(
    (state) => state.loginAuth.permissions.qr_menu
  );
  const RestaurentID = useSelector(
    (state) => state?.profileDetails?.restaurantDetails?.id
  );

  const myValue = (pages) => {
    setPagenumber(pages);
  };

  const OpenCreateQR = () => {
    setOpenCreateMenuGroup(true);
  };

  const OpenFilterUser = () => {
    setOpenFilterSection(true);
  };

  const fetchData = async () => {
    setLoading(true);
    let res = await listingMenuGroups(pageNumber);
    if (res.status === 200) {
      setMenuGroupData(res.data);
      setqrMenuGroupsPage(res.extraData);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const getWord = async (word) => {
    setLoading(true);
    const req = {
      search: word,
      pageNumber: pageNumber,
    };

    let res = await searchQrMenuGroups(req);
    if (res.status === 200) {
      setMenuGroupData(res.data);
      setqrMenuGroupsPage(res.extraData);
      setLoading(false);
    }
  };

  const getNumber = async (number) => {
    setPerPageListing(number);
    setLoading(true);
    const req = {
      perPage: number,
      pageNumber: pageNumber,
    };

    let res = await showQrMenuListing(req);
    if (res.status === 200) {
      setMenuGroupData(res.data);
      setqrMenuGroupsPage(res.extraData);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  const UserHeader = [
    {
      id: <IntlMessage id="qrMenu.qrMenuGroups.groupType" />,
      key: "group_type",
    },
    {
      id: <IntlMessage id="qrMenu.qrMenuGroups.groupName" />,
      key: "group_name",
    },
    {
      id: <IntlMessage id="qrMenu.qrMenuGroups.Action" />,
      key: "Action",
    },
    {
      id: "",
      key: "Toggle",
    },
  ];

  const TableAction = {
    apply: true,
    view: true,
    edit: qrMenuPermission,
    delete: qrMenuPermission,
    toggle: true,
    actionOfView: "OpenViewQRMenuGroup",
    actionOfEdit: "OpenEditQRMenuGroup",
    actionOfDelete: "OpenDeleteQRMenuGroup",
    fetchData: fetchData,
  };

  return (
    <div>
      {openCreateMenuGroup && (
        <CreateMenuGroup
          open={openCreateMenuGroup}
          handleClose={() => setOpenCreateMenuGroup(false)}
          fetchData={fetchData}
        />
      )}

      {openFilterSection && (
        <QRMenuFilter
          open={openFilterSection}
          handleClose={() => setOpenFilterSection(false)}
          getAllsection={fetchData}
        />
      )}
      <SubHeader>
        <p>
          <IntlMessage id="qrMenu.qrMenuGroups.Heading" />
        </p>
        {qrMenuPermission && (
          <OrangeButton onClick={OpenCreateQR}>
            <IntlMessage id="button.createMenuGroup" />
          </OrangeButton>
        )}
      </SubHeader>

      <BoxContainer>
        <FilterSection>
          <ShowButton>
            <p>
              <IntlMessage id="button.show" />
            </p>
            <input
              type="number"
              value={perPageListing}
              onChange={(e) => getNumber(e.target.value)}
            />
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
                    `https://aqlutstorage.blob.core.windows.net/exportfile/QrGrouplist${RestaurentID}.xlsx`
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
            {menuGroupData?.length === 0 ? (
              <NODATA>NO DATA FOUND</NODATA>
            ) : (
              <QRTable
                header={UserHeader}
                tableData={menuGroupData}
                action={TableAction}
              />
            )}
          </>
        )}

        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <PaginationRounded
            PaginationRounded={qrMenuGroups}
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
    margin: 10px 0px;
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
