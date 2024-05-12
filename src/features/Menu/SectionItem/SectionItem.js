import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  BoxContainer,
  FilterButton,
  FilterSection,
  OrangeButton,
  SubHeader,
  LoadingWrapper,
  NODATA,
} from "../../../style/Gobalstyle";
import MenuTable from "../MenuTable";
import {
  searchSectionItem,
  sectionItemListing,
  showItemListing,
  updateSectionItemPosition,
} from "../../../services/Collection";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import PaginationRounded from "../../../components/PaginationRounded";
import { useSelector } from "react-redux";
import DragDropTable from "./DragDropTable";
import { useCallback } from "react";
import update from "immutability-helper";
import IntlMessage from "../../../Utils/IntlMessage";
import { ExportFeature } from "../../../Utils/ExportFiles";
import FilterSectionItem from "./FilterSectionItem";

export default function SectionItem() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sectionItemData, setsectionItemData] = useState([]);
  const [sectionItemPage, setsectionItemPage] = useState(null);
  const [pageNumber, setPagenumber] = useState(1);
  const [perPageListing, setPerPageListing] = useState(15);
  const [allRecord, setAllRecord] = useState(null);
  const [openFilterSection, setOpenFilterSection] = useState(false);

  const menuPermission = useSelector(
    (state) => state.loginAuth.permissions.menu
  );
  const RestaurentID = useSelector(
    (state) => state?.profileDetails?.restaurantDetails?.id
  );

  const getNumber = async (number) => {
    if (number >= 0) {
      setPerPageListing(number);
      setLoading(true);
      const req = {
        perPage: number,
        pageNumber: pageNumber,
      };

      let res = await sectionItemListing(req);
      if (res.status === 200) {
        setsectionItemData(res.data);
        setsectionItemPage(res.extraData);
        setLoading(false);
      } else {
        const message = getErrorMessage(res, "Failed to connection");
        toast.error(message, { theme: "colored" });
        setLoading(false);
      }
    } else {
      toast.error("Invalid input", { theme: "colored" });
    }
  };

  const myValue = (pages) => {
    setPagenumber(pages);
  };

  const fetchData = async () => {
    setLoading(true);
    const req = {
      perPage: perPageListing,
      pageNumber: pageNumber,
    };
    let res = await sectionItemListing(req);
    if (res.status === 200) {
      setsectionItemData(res.data);
      setsectionItemPage(res.extraData);
      setAllRecord(res.totalRecords);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const UserHeader = [
    {
      id: <IntlMessage id="Menu.sectionItem.sortOrderId" />,
      key: "sort_order_id",
    },
    {
      id: <IntlMessage id="Menu.sectionItem.Name" />,
      key: "name",
    },
    // {
    //   id: "",
    //   key: "image",
    // },

    {
      id: <IntlMessage id="Menu.sectionItem.Menus" />,
      key: "Menu_name",
    },
    {
      id: <IntlMessage id="Menu.sectionItem.Section" />,
      key: "section_name",
    },
    {
      id: <IntlMessage id="Menu.sectionItem.Price" />,
      key: "Item_price",
    },
    {
      id: <IntlMessage id="Menu.sectionItem.Action" />,
      key: "Action",
    },
    {
      id: "",
      key: "status",
    },
  ];

  const TableAction = {
    apply: true,
    view: true,
    edit: menuPermission,
    delete: menuPermission,
    toggle: true,
    actionOfView: "CreateSectionItem",
    actionOfEdit: "EditSectionItem",
    actionOfDelete: "DeleteSectionItem",
    actionOfToggle: "actionOfToggleSectionItem",
    alldata: fetchData,
  };

  const getWord = async (word) => {
    setLoading(true);
    const req = {
      search: word,
      pageNumber: pageNumber,
    };

    let res = await searchSectionItem(req);
    if (res.status === 200) {
      setsectionItemData(res.data);
      setsectionItemPage(res.extraData);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message, { theme: "colored" });
      setLoading(false);
    }
  };

  const updateDropPosition = async (
    dragIndex,
    DropIndex,
    data,
    item,
    perPageListing
  ) => {
    setLoading(true);

    let req = {
      item_id: item.id,
      position: data.position,
    };
    let res = await updateSectionItemPosition(req);
    if (res.status === 200) {
      getNumber(perPageListing);
    } else {
      getNumber(perPageListing);
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
    }
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex, body, item, perPageListing) => {
      updateDropPosition(dragIndex, hoverIndex, body, item, perPageListing);
      setsectionItemData((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    },
    []
  );

  const OpenFilterUser = () => {
    setOpenFilterSection(true);
  };

  //Runs only on the first render
  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  return (
    <div>
      {openFilterSection && (
        <FilterSectionItem
          open={openFilterSection}
          handleClose={() => setOpenFilterSection(false)}
          // getAllsection={fetchData}
        />
      )}
      <SubHeader>
        <p>
          <IntlMessage id="Menu.sectionItem.heading" />
        </p>
        {menuPermission && (
          <OrangeButton
            onClick={() => navigate(`/aglut/menu/sectionItems/create`)}
          >
            <IntlMessage id="button.CREATE" />
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
              min={0}
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
                    `https://aqlutstorage.blob.core.windows.net/exportfile/itemslist${RestaurentID}.xlsx`
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
        <MessageForDragDropFeature>
          <IntlMessage id="dragDropMsg" />
          <br />
          (<IntlMessage id="totalRecords" /> - {allRecord})
        </MessageForDragDropFeature>
        {loading ? (
          <LoadingWrapper>
            <CircularProgress sx={{ color: "#f55a2c" }} />
          </LoadingWrapper>
        ) : (
          <>
            {sectionItemData?.length === 0 ? (
              <NODATA>
                <IntlMessage id="noData" />
              </NODATA>
            ) : allRecord > perPageListing ? (
              <MenuTable
                header={UserHeader}
                tableData={sectionItemData}
                action={TableAction}
              />
            ) : (
              <DragDropTable
                header={UserHeader}
                tableData={sectionItemData}
                action={TableAction}
                moveCard={moveCard}
                perPageListing={perPageListing}
              />
            )}
          </>
        )}
        {sectionItemData?.length === 0 ? (
          ""
        ) : (
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <PaginationRounded
              PaginationRounded={sectionItemPage}
              onChangePage={(_page) => myValue(_page)}
            />
          </div>
        )}
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

const MessageForDragDropFeature = styled.p`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 17px;
  color: #f55a2c;
  padding: 10px 0 0 0;
`;
