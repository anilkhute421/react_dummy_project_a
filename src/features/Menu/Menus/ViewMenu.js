import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  BlackButtonMobile,
  Cancel,
  LoadingWrapper,
} from "../../../style/Gobalstyle";
import styled from "styled-components";
import { viewMenu } from "../../../services/Collection";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { aqlutstorage, containerMenu } from "../../../Utils/ContainerPath";
import { InfoCard } from "../MenuStyle";
import IntlMessage from "../../../Utils/IntlMessage";

export default function ViewMenu({ open, handleClose, payload }) {
  const direction = useSelector((state) => state.languageDirection.direction);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [detailData, setDetailData] = useState({});
  const language = useSelector((state) => state.languageDirection.language);

  const getDetails = async () => {
    setLoading(true);
    let res = await viewMenu(payload.id);
    if (res.status === 200) {
      setDetailData(res.data);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Cancel onClick={handleClose} dir={direction}>
          <i className="icon-CloseCross"/>
        </Cancel>

        {!loading ? (
          <InfoCard>
            <div className="upperSection">
              {detailData.image ? (
                <img
                  src={
                    `${aqlutstorage}` +
                    `${containerMenu}` +
                    `${detailData?.image}`
                  }
                  alt=""
                />
              ) : (
                <div>
                  <i className="icon-Menu" />
                  <span><IntlMessage id="NoImage"/></span>
                </div>
              )}
            </div>

            {language === "en" ? (
              <section>
                <header>{detailData.name}</header>
                <p>{detailData.desc}</p>
              </section>
            ) : (
              <section>
                <header>{detailData.ar_name}</header>
                <p>{detailData.ar_desc}</p>
              </section>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <BlackButtonMobile onClick={() => handleClose()}>
              <IntlMessage id="button.close"/>
              </BlackButtonMobile>
            </div>
          </InfoCard>
        ) : (
          <LoadingWrapper style={{minWidth: "400px"}}>
            <CircularProgress sx={{ color: "#f55a2c" }} />
          </LoadingWrapper>
        )}
      </Dialog>
    </div>
  );
}
