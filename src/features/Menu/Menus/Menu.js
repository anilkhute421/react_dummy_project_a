import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Delete from "../../../components/Delete";
import ToggleSwitch from "../../../components/ToggleSwitch";
import {
  LoadingWrapper,
  NODATA,
  OrangeButton,
  SubHeader,
  WhiteButton,
} from "../../../style/Gobalstyle";
import { MenusectionImage1, MenusectionImage2 } from "../../../Utils/Images";
import { CardWrapper, MenuCard } from "../MenuStyle";
import CreateMenu from "./CreateMenu";
import EditMenu from "./EditMenu";
import ViewMenu from "./ViewMenu";
import {
  changeMenuStatus,
  deleteMenu,
  menuListing,
} from "../../../services/Collection";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { CircularProgress } from "@mui/material";
import { aqlutstorage, containerMenu } from "../../../Utils/ContainerPath";
import IntlMessage from "../../../Utils/IntlMessage";

export default function Menu() {
  const direction = useSelector((state) => state.languageDirection.direction);
  const [isChecked, setIsChecked] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [dataPayload, setDataPayload] = useState({});


  //Menu Permission Decide.
  const menuPermission = useSelector((state) => state.loginAuth.permissions.menu);


  const createMenu = () => {
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

  const fetchData = async () => {
    setLoading(true);
    let res = await menuListing();
    if (res.status === 200) {
      setMenuData(res.data);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const deletingMenu = (data) => {
    setDataPayload(data);
    setOpenDelete(true);
  };

  const handleConfirm = async (id) => {
    setLoading(true);
    let res = await deleteMenu(id);
    if (res.status === 200) {
      setLoading(false);
      setOpenDelete(false);
      fetchData();
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
      menu_id: id,
    };

    let res = await changeMenuStatus(req);
    if (res.status === 200) {
      setLoading(false);
      setOpenDelete(false);
      fetchData();
      toast.info(res.message);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      setLoading(false);
      setOpenDelete(false);
      toast.error(message);
    }
  };

  //Runs only on the first render
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <LoadingWrapper>
        <CircularProgress sx={{ color: "#f55a2c" }} />
      </LoadingWrapper>
    );
  }

  return (
    <div>
      {menuPermission && openCreate && (
        <CreateMenu
          open={openCreate}
          handleClose={() => setOpenCreate(false)}
          fetchData={fetchData}
        />
      )}

      {openInfo && (
        <ViewMenu
          open={openInfo}
          handleClose={() => setOpenInfo(false)}
          payload={dataPayload}
        />
      )}

      {menuPermission && openEdit && (
        <EditMenu
          open={openEdit}
          handleClose={() => setOpenEdit(false)}
          payload={dataPayload}
          fetchData={fetchData}
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
        <p><IntlMessage id="Menu.heading" /></p>
        {menuPermission &&
          <OrangeButton onClick={createMenu}><IntlMessage id="button.CREATE" /></OrangeButton>
        }
      </SubHeader>
      {menuData?.length === 0 ? (
        <NODATA><IntlMessage id="noData" /></NODATA>
      ) : (
        <CardWrapper>
          {direction === "ltr"
            ? menuData?.map((el) => (
              <MenuCard dir={direction}>
                <div className="upperSection">
                  {el.image !== null ? (
                    <img
                      src={`${aqlutstorage}${containerMenu}${el?.image}`}
                      alt=""
                    />
                  ) : (
                    <div>
                      <i className="icon-Menu" />
                      <span>My Menu</span>
                    </div>
                  )}
                </div>
                <div className="hoverSection">
                  <span>
                    <i className="icon-Info" onClick={() => infoMenu(el)} />
                  </span>
                  {menuPermission &&
                    <>
                      <OrangeButton onClick={() => editMenu(el)}><IntlMessage id="button.EDIT"/></OrangeButton>
                      <WhiteButton onClick={() => deletingMenu(el)}>
                      <IntlMessage id="button.DELETE"/>
                      </WhiteButton>
                    </>
                  }
                </div>
                <section>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <header>{el.name}</header>

                    {menuPermission && 
                    
                    <ToggleSwitch
                      id={el.id}
                      label={el.name}
                      isChecked={el.status}
                      ApiCall={(e, name, id) => activeMenu(e, name, id)}
                    />
                    }
                  </div>
                  <p>{el.desc}</p>
                </section>
              </MenuCard>
            ))
            : menuData.map((el) => (
              <MenuCard dir={direction}>
                <div className="upperSection">
                  {el.image !== null ? (
                    <img
                      src={
                        `${aqlutstorage}` + `${containerMenu}` + `${el?.image}`
                      }
                      alt=""
                    />
                  ) : (
                    <div>
                      <i className="icon-Menu" />
                      <span>My Menu</span>
                    </div>
                  )}
                </div>
                <div className="hoverSection">
                  <span>
                    <i className="icon-Info" onClick={() => infoMenu(el)} />
                  </span>
                  <OrangeButton onClick={() => editMenu(el)}><IntlMessage id="button.EDIT"/></OrangeButton>
                  <WhiteButton onClick={() => deletingMenu(el)}>
                  <IntlMessage id="button.DELETE"/>
                  </WhiteButton>
                </div>
                <section>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <header>{el.ar_name}</header>
                    <ToggleSwitch label="MainMenu" isChecked={isChecked} />
                  </div>
                  <p>{el.ar_desc}</p>
                </section>
              </MenuCard>
            ))}
        </CardWrapper>
      )}
    </div>
  );
}
