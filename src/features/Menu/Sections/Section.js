import { CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import Delete from "../../../components/Delete";
import {
  alllistingSection,
  changeMenuSectionStatus,
  deleteSectionMenu,
  menuListing,
  sectionByMenu,
  updateSectionPosition,
} from "../../../services/Collection";
import {
  LoadingWrapper,
  NODATA,
  OrangeButton,
  SubHeader,
} from "../../../style/Gobalstyle";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { CardWrapper } from "../MenuStyle";
import CreateSection from "./CreateSection";
import DragDropCard from "./DragDropCard";
import EditSection from "./EditSection";
import ViewSection from "./ViewSection";
import update from "immutability-helper";
import IntlMessage from "../../../Utils/IntlMessage";

export default function Section() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allSection, setAllSection] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [dataPayload, setDataPayload] = useState({});

  //Menu Permission Decide.
  const menuPermission = useSelector(
    (state) => state.loginAuth.permissions.menu
  );

  const createSection = () => {
    setOpenCreate(true);
  };

  const infoMenu = (data) => {
    setDataPayload(data);
    setOpenInfo(true);
  };

  const editMenu = (data) => {
    setDataPayload(data);
    setOpenEdit(true);
  };

  const deletingMenu = (data) => {
    setDataPayload(data);
    setOpenDelete(true);
  };

  const getSectionListingbyMenus = async (id) => {
    setLoading(true);
    if (id === "all") {
      getAllsection();
    }
    if (id !== "all") {
      let res = await sectionByMenu(id);
      if (res.status === 200) {
        setAllSection(res.data);
        setLoading(false);
      } else {
        const message = getErrorMessage(res, "Failed to connection");
        toast.error(message);
        setLoading(false);
      }
    }
  };

  const getAllsection = async () => {
    setLoading(true);
    let res = await alllistingSection();
    if (res.status === 200) {
      setAllSection(res.data);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const getAllMenus = async () => {
    setLoading(true);
    let res = await menuListing();
    if (res.status === 200) {
      setMenuList(res.data);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const handleConfirm = async (id) => {
    let res = await deleteSectionMenu(id);
    if (res.status === 200) {
      setLoading(false);
      setOpenDelete(false);
      getAllsection();
      toast.info(res.message);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      setLoading(false);
      setOpenDelete(false);
      toast.error(message);
    }
  };

  const activeMenu = async (e, name, id) => {
    let req = {
      section_id: id,
    };

    let res = await changeMenuSectionStatus(req);
    if (res.status === 200) {
      setLoading(false);
      setOpenDelete(false);
      getAllsection();
      toast.info(res.message);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      setLoading(false);
      setOpenDelete(false);
      toast.error(message);
    }
  };

  const updateDropPosition = async (dragIndex, DropIndex, data, item) => {
    setLoading(true);
    let req = {
      section_id: item.id,
      position: data.position,
    };
    let res = await updateSectionPosition(req);
    if (res.status === 200) {
      getAllsection();
    } else {
      getAllsection();
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
    }
  };

  const moveCard = useCallback((dragIndex, DropIndex, el, items) => {
    updateDropPosition(dragIndex, DropIndex, el, items);

    setAllSection((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [DropIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const renderMenuCard = useCallback((cardData, index) => {
    return (
      <DragDropCard
        key={cardData?.id}
        index={index}
        id={cardData?.id}
        el={cardData}
        moveCard={moveCard}
        infoMenu={infoMenu}
        editMenu={editMenu}
        deletingMenu={deletingMenu}
        activeMenu={activeMenu}
      />
    );
  }, []);

  useEffect(() => {
    getAllsection();
    getAllMenus();
  }, []);

  return (
    <div>
      {menuPermission && openCreate && (
        <CreateSection
          open={openCreate}
          handleClose={() => setOpenCreate(false)}
          getAllsection={getAllsection}
        />
      )}

      {openInfo && (
        <ViewSection
          open={openInfo}
          handleClose={() => setOpenInfo(false)}
          payload={dataPayload}
        />
      )}

      {menuPermission && openEdit && (
        <EditSection
          open={openEdit}
          handleClose={() => setOpenEdit(false)}
          payload={dataPayload}
          getAllsection={getAllsection}
        />
      )}

      {menuPermission && openDelete && (
        <Delete
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          payload={dataPayload}
          handleConfirm={handleConfirm}
        />
      )}

      <SubHeader>
        <p><IntlMessage id="Menu.dessertSection.heading"/></p>
        {menuPermission && (
          <OrangeButton onClick={createSection}>CREATE</OrangeButton>
        )}
      </SubHeader>

      <SelectSection onChange={(e) => getSectionListingbyMenus(e.target.value)}>
        <i className="icon-arrow" />
        <option value={"all"}>All</option>
        {menuList.map((el, i) => (
          <option value={el.id}>{el.name}</option>
        ))}
      </SelectSection>

      {loading ? (
        <LoadingWrapper>
          <CircularProgress sx={{ color: "#f55a2c" }} />
        </LoadingWrapper>
      ) : (
        <>
          {allSection.length === 0 ? (
            <NODATA><IntlMessage id="noData"/></NODATA>
          ) : (
            <CardWrapper>
              {allSection.map((el, index) => renderMenuCard(el, index))}
            </CardWrapper>
          )}
        </>
      )}
    </div>
  );
}

const SelectSection = styled.select`
  width: 100%;
  height: 55px;
  background: #fcfdfe;
  border: 1px solid #f0f1f7;
  border-radius: 8px;
  margin: 20px 0 0 0;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  padding: 0 22px;
  color: rgba(0, 0, 0, 0.6);
`;
