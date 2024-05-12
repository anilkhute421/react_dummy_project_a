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
import { useSelector } from "react-redux";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { viewSectionMenu } from "../../../services/Collection";
import { aqlutstorage, containerSection } from "../../../Utils/ContainerPath";
import { CircularProgress } from "@mui/material";
import { InfoCard } from "../MenuStyle";
import IntlMessage from "../../../Utils/IntlMessage";

export default function ViewSection({ open, handleClose, payload }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [detailData, setDetailData] = useState({});
  const language = useSelector((state) => state.languageDirection.language);
  const direction = useSelector((state) => state.languageDirection.direction);

  const getDetails = async () => {
    setLoading(true);
    let res = await viewSectionMenu(payload.id);
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
          <i className="icon-CloseCross" />
        </Cancel>

        {!loading ? (
          <InfoCard>
            <div className="upperSection">
              {detailData.image ? (
                <img
                  src={
                    `${aqlutstorage}` +
                    `${containerSection}` +
                    `${detailData?.image}`
                  }
                  alt=""
                />
              ) : (
                <div>
                  <i className="icon-Menu" />
                  <span>No Image Found</span>
                </div>
              )}
            </div>

            {language === "en" ? (
              <section>
                <header>{detailData?.section_name}</header>
                <p>{detailData?.desc}</p>
              </section>
            ) : (
              <section>
                <header>{detailData?.section_name}</header>
                <p>{detailData?.desc}</p>
              </section>
            )}

            <div style={{ display: "flex", justifyContent: "center" }}>
              <BlackButtonMobile onClick={() => handleClose()}>
              <IntlMessage id="button.close"/>
              </BlackButtonMobile>
            </div>
          </InfoCard>
        ) : (
          <LoadingWrapper style={{minWidth: "413px"}}>
            <CircularProgress sx={{ color: "#f55a2c" }} />
          </LoadingWrapper>
        )}
      </Dialog>
    </div>
  );
}
