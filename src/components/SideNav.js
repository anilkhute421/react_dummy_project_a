import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AglutLogo } from "../Utils/Images";

//

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import IntlMessage from "../Utils/IntlMessage";

// {intl.formatMessage({
//   id: "table.tenantname",
// })}

export default function SideNav({ Direction }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openQr, setOpenQr] = useState(false);

  const handleMenus = () => {
    setOpenMenu(!openMenu);
  };
  const handleQR = () => {
    setOpenQr(!openQr);
  };

  return (
    <SidebarWrapper dir={Direction}>
      <InnerContainer>
        <LogoWrapper>
          <img src={AglutLogo} alt="AGLUT LOGO" />
        </LogoWrapper>

        <SideNavContainer>
          <ListItemButton sx={{ pl: 0, py: 0 }}>
            <MenuItem dir={Direction}>
              <NavLink
                to="/aglut/profile"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <IconsWrap>
                  <i className="icon-Profile" />
                </IconsWrap>
                <TextWrap>
                  <IntlMessage id="sidebar.profile" />
                </TextWrap>
              </NavLink>
            </MenuItem>
          </ListItemButton>

          <ListItemButton sx={{ pl: 0, py: 0 }}>
            <MenuItem dir={Direction}>
              <NavLink
                to="/aglut/dashboard"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <IconsWrap>
                  <i className="icon-Dashboard" />
                </IconsWrap>
                <TextWrap>
                  <IntlMessage id="sidebar.dashboard" />
                </TextWrap>
              </NavLink>
            </MenuItem>
          </ListItemButton>

          <ListItemButton sx={{ pl: 0, py: 0 }}>
            <MenuItem dir={Direction}>
              <NavLink
                to="/aglut/user-Managment"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <IconsWrap>
                  <i className="icon-UserManagement" />
                </IconsWrap>
                <TextWrap>
                  <IntlMessage id="sidebar.userManagement" />
                </TextWrap>
              </NavLink>
            </MenuItem>
          </ListItemButton>

          <ListItemButton sx={{ pl: 0, py: 0 }}>
            <MenuItem dir={Direction} onClick={handleMenus}>
              <NavLink
                to="/aglut/menu"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <IconsWrap>
                  <i className="icon-Menu" />
                </IconsWrap>
                <TextWrap>
                  <IntlMessage id="sidebar.menus" />
                </TextWrap>
              </NavLink>
            </MenuItem>
            {openMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4, py: 0 }}>
                <MenuItem dir={Direction}>
                  <NavLink
                    to="/aglut/menu/menus"
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                  >
                    <IconsWrap style={{ fontSize: "14px" }}>
                      <i className="icon-SubMenu" />
                    </IconsWrap>
                    <TextWrap>
                      <IntlMessage id="sidebar.submenu.menus" />
                    </TextWrap>
                  </NavLink>
                </MenuItem>
              </ListItemButton>

              <ListItemButton sx={{ pl: 4, py: 0 }}>
                <MenuItem dir={Direction}>
                  <NavLink
                    to="/aglut/menu/sections"
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                  >
                    <IconsWrap style={{ fontSize: "14px" }}>
                      <i className="icon-SubMenu" />
                    </IconsWrap>
                    <TextWrap>
                      <IntlMessage id="sidebar.submenu.sections" />
                    </TextWrap>
                  </NavLink>
                </MenuItem>
              </ListItemButton>

              <ListItemButton sx={{ pl: 4, py: 0 }}>
                <MenuItem dir={Direction}>
                  <NavLink
                    to="/aglut/menu/sectionItems"
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                  >
                    <IconsWrap style={{ fontSize: "14px" }}>
                      <i className="icon-SubMenu" />
                    </IconsWrap>
                    <TextWrap>
                      <IntlMessage id="sidebar.submenu.sectionItems" />
                    </TextWrap>
                  </NavLink>
                </MenuItem>
              </ListItemButton>

              <ListItemButton sx={{ pl: 4, py: 0 }}>
                <MenuItem dir={Direction}>
                  <NavLink
                    to="/aglut/menu/optionModule"
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                  >
                    <IconsWrap style={{ fontSize: "14px" }}>
                      <i className="icon-SubMenu" />
                    </IconsWrap>
                    <TextWrap>
                      <IntlMessage id="sidebar.submenu.optionModule" />
                    </TextWrap>
                  </NavLink>
                </MenuItem>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton sx={{ pl: 0, py: 0 }}>
            <MenuItem dir={Direction}>
              <NavLink
                to="/aglut/feedback"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <IconsWrap>
                  <i className="icon-Feedback" />
                </IconsWrap>
                <TextWrap>
                  <IntlMessage id="sidebar.feedback" />
                </TextWrap>
              </NavLink>
            </MenuItem>
          </ListItemButton>

          <ListItemButton sx={{ pl: 0, py: 0 }}>
            <MenuItem dir={Direction} onClick={handleQR}>
              <NavLink
                to="/aglut/qr-menu"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <IconsWrap style={{ fontSize: "18px" }}>
                  <i className="icon-QRMenu" />
                </IconsWrap>
                <TextWrap>
                  <IntlMessage id="sidebar.qrMenu" />
                </TextWrap>
              </NavLink>
            </MenuItem>
            {openQr ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openQr} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4, py: 0 }}>
                <MenuItem dir={Direction}>
                  <NavLink
                    to="/aglut/qr-menu/code"
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                  >
                    <IconsWrap style={{ fontSize: "14px" }}>
                      <i className="icon-SubMenu" />
                    </IconsWrap>
                    <TextWrap>
                      <IntlMessage id="sidebar.submenu.qrCodes" />
                    </TextWrap>
                  </NavLink>
                </MenuItem>
              </ListItemButton>

              <ListItemButton sx={{ pl: 4, py: 0 }}>
                <MenuItem dir={Direction}>
                  <NavLink
                    to="/aglut/qr-menu/group"
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                  >
                    <IconsWrap style={{ fontSize: "14px" }}>
                      <i className="icon-SubMenu" />
                    </IconsWrap>
                    <TextWrap>
                      <IntlMessage id="sidebar.submenu.qrGroups" />
                    </TextWrap>
                  </NavLink>
                </MenuItem>
              </ListItemButton>

              <ListItemButton sx={{ pl: 4, py: 0 }}>
                <MenuItem dir={Direction}>
                  <NavLink
                    to="/aglut/qr-menu/branding"
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                  >
                    <IconsWrap style={{ fontSize: "14px" }}>
                      <i className="icon-SubMenu" />
                    </IconsWrap>
                    <TextWrap>
                      <IntlMessage id="sidebar.submenu.qrBranding" />
                    </TextWrap>
                  </NavLink>
                </MenuItem>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton sx={{ pl: 0, py: 0 }}>
            <MenuItem dir={Direction}>
              <NavLink
                to="/aglut/orders"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <IconsWrap>
                  <i className="icon-Orders" />
                </IconsWrap>
                <TextWrap>
                  <IntlMessage id="sidebar.orders" />
                </TextWrap>
              </NavLink>
            </MenuItem>
          </ListItemButton>

          <ListItemButton sx={{ pl: 0, py: 0 }}>
            <MenuItem dir={Direction}>
              <NavLink
                to="/aglut/discount"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <IconsWrap>
                  <i className="icon-Discount" />
                </IconsWrap>
                <TextWrap>
                  <IntlMessage id="sidebar.discountFree" />
                </TextWrap>
              </NavLink>
            </MenuItem>
          </ListItemButton>

          <ListItemButton sx={{ pl: 0, py: 0 }}>
            <MenuItem dir={Direction}>
              <NavLink
                to="/aglut/payment"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <IconsWrap>
                  <i className="icon-Invoices" />
                </IconsWrap>
                <TextWrap>
                  <IntlMessage id="sidebar.invoicesPayments" />
                </TextWrap>
              </NavLink>
            </MenuItem>
          </ListItemButton>

          <ListItemButton sx={{ pl: 0, py: 0 }}>
            <MenuItem dir={Direction}>
              <NavLink
                to="/aglut/integration"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <IconsWrap>
                  <i className="icon-Integration" />
                </IconsWrap>
                <TextWrap>
                  <IntlMessage id="sidebar.integrationModule" />
                </TextWrap>
              </NavLink>
            </MenuItem>
          </ListItemButton>
        </SideNavContainer>
      </InnerContainer>
    </SidebarWrapper>
  );
}

const TextWrap = styled.div`
  color: inherit;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`;

const IconsWrap = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  font-size: 25px;
  line-height: 17px;
  color: inherit;
`;

const MenuItem = styled.li`
  width: 100%;
  height: 39px;
  margin: 2px 0;
  a {
    text-decoration: none;
    color: rgb(0 0 0 / 60%);
    display: flex;
    height: 39px;
    align-items: center;
  }
  .active {
    color: #f55a2c;
    height: 40px;
    position: relative;
    &:before {
      position: absolute;
      content: "";
      width: 6px;
      background: #f55a2c;
      top: 0;
      left:${({ dir }) => dir === "ltr" && 0}
      right:${({ dir }) => dir === "rtl" && 0}
      right: 0;
      bottom: 0;
    }
  }
`;

const SideNavContainer = styled.ul`
  width: 100%;
  height: 500px;
  list-style: none;
  margin: 20px 0;
`;

const SidebarWrapper = styled.div`
  width: 240px;
  min-height: 100vh;
  max-height: 100%;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  position: fixed;
  left: ${({ dir }) => dir === "ltr" && "0"};
  right: ${({ dir }) => dir === "rtl" && "0"};
  transition: all ease-out 0.4s;
  z-index: 9;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
  }
  ::-webkit-scrollbar-thumb {
    background: #f55a2c;
    border-radius: 10px;
  }
`;

const InnerContainer = styled.div`
  margin: 0 auto;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: #fff;
  width: 100%;
  height: 80px;
  top: 0;
  position: sticky;
  z-index: 999;
  img {
    width: 100px;
    margin: 20px 0 0 0 ;
  }
`;
