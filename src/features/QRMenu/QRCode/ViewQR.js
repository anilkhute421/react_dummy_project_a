import React from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { BlackButtonMobile, Cancel } from "../../../style/Gobalstyle";
import { QRCode } from "react-qrcode-logo";
import { AglutLogo } from "../../../Utils/Images";

import styled from "styled-components";
import IntlMessage from "../../../Utils/IntlMessage";

export default function ViewQR({ open, handleClose, payload }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const direction = useSelector((state) => state.languageDirection.direction);

  return (
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
          <QRCode
            value={`https://aqlutuserfrontend.azurewebsites.net/?id=${payload.id}`}
            logoImage={AglutLogo}
            padding={0}
            size={250}
            removeQrCodeBehindLogo={true}
            // qrStyle="dots"
            logoOpacity={1}
            logoWidth={40}
          />
          <h1>{payload.name}</h1>
          <p>{payload.group_type}</p>
          <div style={{ display: "flex", justifyContent: "center" , margin:"20px 0px 0px 0px" }}>
              <BlackButtonMobile onClick={() => handleClose()}>
              <IntlMessage id="button.close"/>
              </BlackButtonMobile>
            </div>
        </ViewQRWrapper>
       
      </Dialog>
    </div>
  );
}

const ViewQRWrapper = styled.div`
  width: 380px;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;

  img {
    margin: 30px 0;
  }

  h1 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.1em;
    color: #000000;
    margin: 10px 0;
  }

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.05em;
    color: #000000;
  }

  @media (max-width: 599px) {
    width: 100%;
    height: 100%;  
   }
`;
