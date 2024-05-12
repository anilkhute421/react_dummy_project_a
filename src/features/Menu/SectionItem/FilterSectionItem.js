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
} from "../../../style/Gobalstyle";
import { useSelector } from "react-redux";

import { DependentField } from "../../../validation/DependentField";
import { SelectInput } from "../../Menu/MenuStyle";
import styled from "styled-components";
import InputField from "../../../validation/InputField";
import {
  createUser,
  getAllergiesList,
  sectionItemListing,
  existingSectionMenusListing
} from "../../../services/Collection";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Switch } from "@mui/material";
import * as yup from "yup";
import IntlMessage from "../../../Utils/IntlMessage";
import ToggleSwitch from "../../../components/ToggleSwitch";
// import { InputWrap } from "./CreateSectionItem";

export default function FilterSectionItem({
  open,
  handleClose,
  getAllsection,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const direction = useSelector((state) => state.languageDirection.direction);
  const [userRoleTListing, setuserRoleTListing] = useState([
    { id: 2, name: "Staff" },
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [allergiesList, setAllergiesList] = useState([]);
  const [recommendedItemsList, setRecommendedItemsList] = useState([]);
  const [menusList, setMenusList] = useState([]);


  const [FilterSectionItem, setFilterSectionItem] = useState({
    new: false,
    sign: false,
    price: null,
    compare: null,
    recommneded: null,
    allergies: null,
    section: null,
    menu: null,
  });

  const getAllergies = async () => {
    let res = await getAllergiesList();
    if (res.status === 200) {
      setAllergiesList(res.data);
    }
  };

  const getRecommendedItems = async () => {
    let req = {
      pageNumber: 0,
      perPage: 0,
    };
    let res = await sectionItemListing(req);
    if (res.status === 200) {
      setRecommendedItemsList(res.data);
    }
  };

  const getAllMenus = async () => {
    let res = await existingSectionMenusListing();
    if (res.status === 200) {
      setMenusList(res.data);
    } else {
      // const message = getErrorMessage(res, "Failed to connection");
      // toast.error(message);
    }
  };

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

  useEffect(() => {
    getAllergies();
    getRecommendedItems();
    getAllMenus();
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

        <CreateFilterWrapper>
          <header
            style={{ display: "flex", marginTop: "20px", padding: "0px 20px" }}
          >
            <i className="icon-Filters" />
            <p style={{ margin: "0px 10px" }}>
              <IntlMessage id="button.Filters" />
            </p>
          </header>

          <InputWraper dir={direction}>
            <div
              style={{
                padding: "0px 20px",
                margin: "10px 0px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <section>
                <label>
                  <IntlMessage id="Menu.createItem.markSectionNew" />
                </label>
              </section>

              <ToggleSwitch
                label={1}
                isChecked={true}
                id={1}
                onChange={(status) => true}
                // ApiCall={(e, name, id ) => ApiCall(e, name, id)}
              />
            </div>

            <div
              style={{
                padding: "0px 20px",
                margin: "10px 0px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <section>
                <label>
                  <IntlMessage id="Menu.createItem.markSectionsign" />
                </label>
              </section>

              <ToggleSwitch
              // label={data.id}
              // isChecked={data.status}
              // id={data.id}
              // onChange={(status) => setIsChecked(status)}
              // ApiCall={(e, name, id ) => ApiCall(e, name, id)}
              />
            </div>

            <InputWrap
              dir={direction}
              style={{ width: "100%", padding: "0px 20px", margin: "10px 0px" }}
            >
              <section>
                <label>
                  {/* <IntlMessage id="userManagement.Email" /> */}
                  Price
                </label>
              </section>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  style={{ width: "48%" }}
                  dir="ltr"
                  type="email"
                  placeholder=""
                  name={`email`}
                  component={InputField}
                />
                <select
                  style={{ width: "48%" }}
                  dir="ltr"
                  type="email"
                  placeholder=""
                  name={`email`}
                  component={InputField}
                />
              </div>
            </InputWrap>

            <InputWrap
              dir={direction}
              style={{ width: "100%", padding: "0px 20px", margin: "10px 0px" }}
            >
              <section>
                <label>
                  {/* <IntlMessage id="userManagement.Email" /> */}
                  Recommended Items
                </label>
              </section>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
              <select>
                  {recommendedItemsList &&
                    recommendedItemsList?.map((list) => (
                      <>
                        <option hidden></option>
                        <option>{list.name}</option>
                      </>
                    ))}
                </select>
              </div>
            </InputWrap>

            <InputWrap
              dir={direction}
              style={{ width: "100%", padding: "0px 20px", margin: "10px 0px" }}
            >
              <section>
                <label>
                  {/* <IntlMessage id="userManagement.Email" /> */}
                  Allergies
                </label>
              </section>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <select onChange={(e)=>console.log('allergies value' , e.target.value)} >
                  {allergiesList &&
                    allergiesList?.map((list) => (
                      <>
                        <option hidden></option>
                        <option va>{list.name}</option>
                      </>
                    ))}
                </select>
              </div>
            </InputWrap>

            <InputWrap
              dir={direction}
              style={{
                flexDirection: "row",
                width: "100%",
                padding: "0px 20px",
                margin: "10px 0px",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "100%" }}>
                <section>
                  <label>
                    {/* <IntlMessage id="userManagement.Email" /> */}
                    Section
                  </label>
                </section>

                <select
                  style={{ width: "96%" }}
                  dir="ltr"
                  type="email"
                  placeholder=""
                  name={`email`}
                  component={InputField}
                />
              </div>

              <div style={{ width: "100%" }}>
                <section>
                  <label>
                    {/* <IntlMessage id="userManagement.Email" /> */}
                    Menu
                  </label>
                </section>

                <select onChange={(e)=>console.log('allergies value' , e.target.value)} >
                  {menusList &&
                    menusList?.map((list) => (
                      <>
                        <option hidden></option>
                        <option va>{list.name}</option>
                      </>
                    ))}
                </select>
              </div>
            </InputWrap>

            <div style={{ textAlign: "center", margin: "30px 0px 10px 0px" }}>
              {loading ? (
                <CircularProgress sx={{ color: "#f55a2c" }} />
              ) : (
                <>
                  <FilterFooter>
                    <WhiteButton style={{ color: "#F55A2C" }}>
                      {/* <IntlMessage id="button.CHANGEPHOTO" />
                       */}
                      Reset
                    </WhiteButton>

                    <OrangeButton style={{ margin: "5px 0" }}>
                      Apply
                    </OrangeButton>

                    <BlackButtonMobile onClick={() => handleClose()}>
                      <IntlMessage id="button.close" />
                    </BlackButtonMobile>
                  </FilterFooter>
                </>
              )}
            </div>
          </InputWraper>
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
  overflow-y: scroll;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
//   padding: 0px 20px;
::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
  }
  ::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 10px;
  }


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

export const InputWraper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  width: 100%;
  // height: 100px;
  background: #f7f7f7;
  border: 1px solid #f0f1f7;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  // padding: 0 10px;
  // margin: 5px 0;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #000000;

  section {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
  }
`;

export const WhiteButton = styled.button`
  width: 48%;
  background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: black;
  padding: 10px 0px;
  margin: 5px 0px;
  cursor: pointer;
  position: relative;

  input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }

  @media (max-width: 430px) {
    font-size: 12px;
    padding: 10px;
  }
  @media (max-width: 380px) {
    margin: 5px 10px;
    padding: 10px 20px;
  }
`;

export const InputWrap = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;

  @media (max-width: 599px) {
    width: 100%;
  }

  i {
    font-size: 18px;
  }

  label {
    margin: 0 0px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    color: #242424;
  }

  input {
    width: 100%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 20px;
    margin: 5px 0 0 0;
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

  textarea {
    width: 100%;
    height: 58px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 10px 20px;
    margin: 8px 0 0 0;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
  textarea:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;
  }

  select {
    width: 100%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 10px;
    margin: 5px 0;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
  select:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;
  }
`;
