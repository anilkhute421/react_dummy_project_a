import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";
import { DashboardWrapper, Page } from "./Dashboardstyle";
import MenuIcon from '@mui/icons-material/Menu';


export default function Dashboard() {
  const Direction = useSelector((state) => state.languageDirection.direction);

  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const [open, setOpen] = useState(false);
  const con = () => {
    setOpen(!open);
  };

  return (
    <DashboardWrapper>
      {width > 991 && <SideNav Direction={Direction} />}

      {width < 991 && open && <SideNav Direction={Direction} />}

      {width < 991 && <ControlNav onClick={con} Direction={Direction} ><MenuIcon Direction={Direction}/></ControlNav>}
      <Header />
      <Page dir={Direction}>
        <Outlet />
      </Page>
    </DashboardWrapper>
  );
}

const ControlNav = styled.i`
position: absolute;
z-index: 9;
// left: 15px;
right: ${({ Direction }) => Direction === "rtl" && "10px"};
left: ${({ Direction }) => Direction === "ltr" && "15px"};
top: 25px;
position:fixed;
svg{
     font-size: 35px;
}
`;
