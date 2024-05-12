import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BoxContainer,
  OrangeButton,
  SubHeader,
  LoadingWrapper,
  NODATA,
} from "../../../style/Gobalstyle";
import MenuTable from "../MenuTable";
import OptionModuleCreate from "../OptionModule/OptionModuleCreate";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { optionListing } from "../../../services/Collection";
import { useSelector } from "react-redux";
import IntlMessage from "../../../Utils/IntlMessage";
// import ViewModifierGroup from "./ViewModifierGroup";





export default function OptionModule() {
  const direction = useSelector((state) => state.languageDirection.direction);
  const [openCreateOptionModule, setOpenCreateOptionModule] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuData, setMenuData] = useState([]);

  const menuPermission = useSelector((state) => state.loginAuth.permissions.menu);




  const OpenCreateOptionModule = () => {
    setOpenCreateOptionModule(true);
  };

  const fetchData = async () => {
    setLoading(true);
    let res = await optionListing();
    if (res.status === 200) {
      setMenuData(res.data);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  //Runs only on the first render
  useEffect(() => {
    fetchData();
  }, []);


  const UserHeader = [
    {
      id: <IntlMessage id="Menu.sectionItem.Name" />,
      key: "name",
    },
    {
      id: <IntlMessage id="Menu.optionModule.Modifiers" />,
      key: "Modifiers",
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
    actionOfView: "CreateModifierGroup",
    actionOfEdit: "EditModifierGroup",
    actionOfDelete: "DeleteModifierGroup",
    actionOfToggle: "actionOfToggleOptionItem",
    alldata: fetchData
  };




  return (
    <div>
      {openCreateOptionModule && (
        <OptionModuleCreate
          open={openCreateOptionModule}
          handleClose={() => setOpenCreateOptionModule(false)}
          action={fetchData}
        />
      )}
      <SubHeader>
        <p><IntlMessage id="Menu.optionModule.Heading" /></p>
        {
          menuPermission &&
          <OrangeButton onClick={OpenCreateOptionModule}><IntlMessage id="button.CREATE" /></OrangeButton>
        }
      </SubHeader>

      {loading ? (
        <LoadingWrapper>
          <CircularProgress sx={{ color: "#f55a2c" }} />
        </LoadingWrapper>
      ) : (
        <>
          {menuData?.length === 0 ? (
            <NODATA><IntlMessage id="noData" /></NODATA>
          ) : (
            <BoxContainer>
              <ShowButton style={{ height: "30px" }}>
                <p><IntlMessage id="button.show" /></p>
                <input type="number" value={10} />
              </ShowButton>
              <MenuTable
                header={UserHeader}
                tableData={menuData}
                action={TableAction}
              // handleClick={fetchData()}
              />
            </BoxContainer>
          )}
        </>
      )}
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
