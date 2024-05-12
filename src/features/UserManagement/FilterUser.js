import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  BlackButtonMobile,
  Cancel,
  LoadingWrapper,
  OrangeButton,
  OrangeButtonSpan,
} from "../../style/Gobalstyle";
import { useSelector } from "react-redux";

import { DependentField } from "../../validation/DependentField";
import { SelectInput } from "../Menu/MenuStyle";
import styled from "styled-components";
import InputField from "../../validation/InputField";
import { createUser } from "../../services/Collection";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import * as yup from "yup";
import IntlMessage from "../../Utils/IntlMessage";

export default function FilterUser({
  open,
  handleClose,
  getAllsection,
  callback,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const direction = useSelector((state) => state.languageDirection.direction);
  const [userRoleTListing, setuserRoleTListing] = useState([
    { id: 2, name: "Staff" },
  ]);
  const [loading, setLoading] = useState(false);
  const [userFilter, setUserFilter] = useState(null);

  const navigate = useNavigate();

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    setLoading(true);

    // let RoleObject = {name :values.role ==="2"?"Staff":"Owner" , id: values.id}

    // create payload for api
    let req = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      role: values.role.id,
    };

    let res = await createUser(req);
    if (res.status === 200) {
      setLoading(false);
      handleClose();
      getAllsection();
      toast.info(res.message);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      setLoading(false);
      toast.error(message);
    }
  };

  const handleCallback = () => {
    callback(userFilter);
    handleClose();
  };

  const reset = () => {
    callback(userFilter, "reset");
    handleClose();
  };

  // const reset = () => {
  //   setUser("");
  //   handleClose();
  //   getAllsection();
  // };

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

        <CreateFilterWrapper>
          <header
            style={{ display: "flex", marginTop: "20px", padding: "0px 20px" }}
          >
            <i className="icon-Filters" />
            <p style={{ margin: "0px 10px" }}>
              <IntlMessage id="button.Filters" />
            </p>
          </header>

          <InputWrap dir={direction}>
            <div style={{ padding: "0px 20px", margin: "15px 0px" }}>
              <section>
                <label>
                  {/* <IntlMessage id="userManagement.firstName" /> */}
                  Select Role
                </label>
              </section>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <WhiteButton
                  onClick={() => setUserFilter("2")}
                  color={userFilter}
                >
                  {/* <IntlMessage id="button.CHANGEPHOTO" />
                   */}
                  Staff
                </WhiteButton>
                <WhiteButtons
                  onClick={() => setUserFilter("1")}
                  color={userFilter}
                >
                  {/* <IntlMessage id="button.CHANGEPHOTO" />
                   */}
                  Owner
                </WhiteButtons>
              </div>
            </div>
            <div style={{ textAlign: "center", margin: "80px 0px 10px 0px" }}>
              {loading ? (
                <CircularProgress sx={{ color: "#f55a2c" }} />
              ) : (
                <>
                  <FilterFooter>
                    <WhiteButton onClick={reset}>
                      {/* <IntlMessage id="button.CHANGEPHOTO" />
                       */}
                      Reset
                    </WhiteButton>

                    <OrangeButton
                      style={{ margin: "5px 0" }}
                      onClick={handleCallback}
                    >
                      Apply
                    </OrangeButton>

                    <BlackButtonMobile onClick={() => handleClose()}>
                      <IntlMessage id="button.close" />
                    </BlackButtonMobile>
                  </FilterFooter>
                </>
              )}
            </div>
          </InputWrap>
        </CreateFilterWrapper>
      </Dialog>
    </div>
  );
}

export const FilterFooter = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0 20px;
  gap: 10px;

  button {
    width: 180px;
  }

  @media (max-width: 600px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const SelectIconDiscount = styled.i`
  position: absolute;
  top: 20px;
  right: ${({ dir }) => dir === "ltr" && "20px"};
  left: ${({ dir }) => dir === "rtl" && "20px"};
  font-size: 12px !important;
`;

export const CreateFilterWrapper = styled.div`
  width: 413px;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
//   padding: 0px 20px;
  @media (max-width: 599px) {
    width: 100%;
    height: 100%;
  }

  header {
    width:100%
    height:100%
    background:red;
  }

  p{
    font-family: 'Montserrat';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 15px;
width: 33px;
height: 15px;
  }
`;

export const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  background: #f7f7f7;
  border: 1px solid #f0f1f7;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
`;

export const WhiteButton = styled.button`
  width: 48%;
  border: 1px solid #f55a2c;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${({ color }) => (color === "2" ? "white" : "black")};
  background: ${({ color }) => (color === "2" ? "#F55A2C" : "#ffffff")};
  padding: 10px 0px;
  margin: 5px 0px;
  cursor: pointer;
  position: relative;

  @media (max-width: 430px) {
    font-size: 12px;
    padding: 10px;
  }
  @media (max-width: 380px) {
    margin: 5px 10px;
    padding: 10px 20px;
  }
`;

export const WhiteButtons = styled.button`
  width: 48%;
  // background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${({ color }) => (color === "1" ? "white" : "black")};
  background: ${({ color }) => (color === "1" ? "#F55A2C" : "#ffffff")};
  padding: 10px 0px;
  margin: 5px 0px;
  cursor: pointer;
  position: relative;

  @media (max-width: 430px) {
    font-size: 12px;
    padding: 10px;
  }
  @media (max-width: 380px) {
    margin: 5px 10px;
    padding: 10px 20px;
  }
`;
