import React from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { BlackButtonMobile, Cancel } from "../../../style/Gobalstyle";
import styled from "styled-components";
import IntlMessage from "../../../Utils/IntlMessage";

export default function ViewMenuGroup({ open, handleClose, payload }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const direction = useSelector((state) => state.languageDirection.direction);
  return (
    <div>
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <Cancel onClick={handleClose} dir={direction}>
            <i className="icon-CloseCross" />
          </Cancel>

          <ViewQRWrapper>
            <h1><IntlMessage id="qrMenu.qrMenuGroups.Heading"/></h1>
            <InputWrap dir={direction}>
              <section>
                <label><IntlMessage id="qrMenu.qrMenuGroups.groupType"/></label>
              </section>
              <span>{payload?.group_type}</span>
            </InputWrap>

            <InputWrap dir={direction}>
              <section>
                <label><IntlMessage id="qrMenu.qrMenuGroups.groupName"/></label>
              </section>
              <span>{payload?.group_name}</span>
            </InputWrap>
            <div style={{ display: "flex", justifyContent: "center" , margin:"20px 0px 0px 0px" }}>
              <BlackButtonMobile onClick={() => handleClose()}>
              <IntlMessage id="button.close"/>
              </BlackButtonMobile>
            </div>
          </ViewQRWrapper>
        </Dialog>
      </div>
    </div>
  );
}

export const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  section {
    display: flex;
  }

  label {
    margin: 0 10px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
    opacity: 0.6;
  }

  span {
    display: flex;
    align-items: center;
    width: 100%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 20px;
    margin: 8px 0;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
  input:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;
  }
`;

const ViewQRWrapper = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  h1 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.1em;
    color: #000000;
    margin: 10px 0 30px 0;
  }

  @media (max-width: 599px) {
    h1 {
      margin: 35px 0;
    }
   }
`;
