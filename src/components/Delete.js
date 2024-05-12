import React from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  BlackButton,
  BlackButtonMobile,
  Cancel,
  LoadingWrapper,
} from "../style/Gobalstyle";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import IntlMessage from "../Utils/IntlMessage";

export default function Delete({
  open,
  handleClose,
  handleConfirm,
  payload,
  loading,
}) {
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
        <DeleteWrapper dir={direction}>
          <DeleteButton>
            <i className="icon-Delete" />
          </DeleteButton>

          <p><IntlMessage id="sure" />?</p>

          {loading ? (
            <CircularProgress sx={{ color: "#f55a2c" }} />
          ) : (
            <div style={{ display: "flex" }}>
              <BlackButtonMobile onClick={() => handleClose()}>
              <IntlMessage id="button.close" />
              </BlackButtonMobile>
              <BlackButton onClick={() => handleConfirm(payload.id)}>
              <IntlMessage id="button.DELETE" />
              </BlackButton>
            </div>
          )}
        </DeleteWrapper>
      </Dialog>
    </div>
  );
}

export const DeleteButton = styled.div`
  width: 40px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 18px;
    color: #f55a2c;
  }
`;

const DeleteWrapper = styled.div`
  width: 320px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 29px;
    color: #000000;
    margin: 25px 0;
  }

  @media (max-width: 599px) {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
