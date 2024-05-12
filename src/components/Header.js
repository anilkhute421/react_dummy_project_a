import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginSuccess } from "../app/Auth/Login/LoginStore";
import { dashboardDirection } from "../layout/Dashboard/DashboardStore";
import { pusherRealtimeSuccess } from "../pusher/PusherStore";
import {
  HeaderWrapper,
  IconsWrap,
  InfoSection,
  InnerBox,
  LanguageSelect,
  List,
} from "../style/Gobalstyle";
import { aqlutstorage, containerProfile } from "../Utils/ContainerPath";
import { AglutBackground } from "../Utils/Images";

export default function Header() {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const language = useSelector((state) => state.languageDirection.language);
  const direction = useSelector((state) => state.languageDirection.direction);
  const RestaurentInfo = useSelector(
    (state) => state.profileDetails.restaurantDetails
  );
  const [logoutSection, setLogoutSection] = useState(false);
  const navigate = useNavigate();

  const SwitchLanguage = (type) => {
    if (type === "Ar") {
      dispatch(dashboardDirection({ language: "ar", direction: "rtl" }));
    }
    if (type === "En") {
      dispatch(dashboardDirection({ language: "en", direction: "ltr" }));
    }
  };

  const logoutUser = () => {
    dispatch(
      loginSuccess({
        token: null,
      })
    );
    dispatch(pusherRealtimeSuccess({ data: [], unReadCount: 0 }));
  };

  const NotificationCount = useSelector(
    (state) => state.pusherRealtime.unReadCount
  );

  return (
    <HeaderWrapper>
      <InnerBox dir={direction}>
        {
          <ClickAwayListener onClickAway={() => setExpand(false)}>
            <LanguageSelect onClick={() => setExpand(!expand)} open={expand}>
              <div>
                {language === "ar" ? "Arb" : "Eng"}
                {/* <i className="select-icon icon-down-arrow" />  */}
                <IconsWrap style={{ fontSize: "10px", margin: "5px 2px" }}>
                  <i className="icon-DownArrow" />
                </IconsWrap>
              </div>
              {expand && (
                <List>
                  {language === "ar" && (
                    <li onClick={() => SwitchLanguage("En")}>Eng</li>
                  )}
                  {language === "en" && (
                    <li onClick={() => SwitchLanguage("Ar")}>Arb</li>
                  )}
                </List>
              )}
            </LanguageSelect>
          </ClickAwayListener>
        }

        <IconsWrap
          direction={direction}
          onClick={() => navigate("/aglut/orders")}
        >
          <i className="icon-Bell" />
          {NotificationCount > 0 && <span>{NotificationCount}</span>}
        </IconsWrap>

        <InfoSection>
          {RestaurentInfo ? (
            <img
              src={
                `${aqlutstorage}` +
                `${containerProfile}` +
                `${RestaurentInfo?.logo}`
              }
              alt="Aglut Background"
            />
          ) : (
            <img src={AglutBackground} alt="Aglut Background" />
          )}
          {direction === "ltr" ? (
            <p>{RestaurentInfo ? RestaurentInfo?.name : "Restaurant Name"}</p>
          ) : (
            <p>
              {RestaurentInfo ? RestaurentInfo?.ar_name : "Restaurant Name"}
            </p>
          )}
        </InfoSection>

        <DownArrow>
          <i
            className="icon-DownArrow"
            onClick={() => setLogoutSection(!logoutSection)}
          />
        </DownArrow>
      </InnerBox>

      {logoutSection && (
        <Logout dir={direction} onClick={logoutUser}>
          <i className="icon-Logout" />
          <span>Logout</span>
        </Logout>
      )}
    </HeaderWrapper>
  );
}

const Logout = styled.div`
  width: 140px;
  height: 45px;
  cursor: pointer;
  position: absolute;
  top: 70px;
  left: ${({ dir }) => dir === "rtl" && "40px"};
  right: ${({ dir }) => dir === "ltr" && "40px"};

  background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 2px 2px 10px #000;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
    margin: 0 10px;
  }
`;

const DownArrow = styled.div`
  font-size: 10px;
  line-height: 17px;
  color: inherit;
  cursor: pointer;

  @media (max-width: 360px) {
    margin: 0px;
  }
`;
