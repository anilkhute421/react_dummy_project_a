import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  BlackButtonMobile,
  Cancel,
  LoadingWrapper,
  OrangeButton,
} from "../../style/Gobalstyle";
import { useSelector } from "react-redux";
import { CreateQRWrapper, InputWrap } from "./UserManagementStyle";
import { Field, FieldArray, Form, Formik } from "formik";
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

export default function CreateUser({ open, handleClose, getAllsection }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const direction = useSelector((state) => state.languageDirection.direction);
  const [userRoleTListing, setuserRoleTListing] = useState([
    { id: 2, name: "Staff" },{ id: 1, name: "Owner" }
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const EnRegex = "([a-zA-Z]s*)+";
  const ArRegex = "[\u0600-\u06FF]";
  // Yup is used for validation.
  const schema = yup.object().shape({
    first_name: yup.string().required("Please enter first name"),
    last_name: yup.string().required("Please enter last name"),
    email: yup
      .string()
      .email("Not a proper email")
      .required("Please enter email"),
    role: yup.object().required("Please select user"),
  });

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

        <CreateQRWrapper>
          <header><IntlMessage id="userManagement.addUser.heading" /></header>

          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              role: "",
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
            render={({ values, setFieldValue }) => (
              <Form>
                <InputWrap dir={direction}>
                  <section>
                    <label><IntlMessage id="userManagement.firstName" /></label>
                  </section>
                  <Field
                    dir="ltr"
                    type="text"
                    placeholder=""
                    name={`first_name`}
                    component={InputField}
                  />
                </InputWrap>

                <InputWrap dir={direction}>
                  <section>
                    <label><IntlMessage id="userManagement.lastName" /></label>
                  </section>
                  <Field
                    name={`last_name`}
                    dir="ltr"
                    type="text"
                    placeholder=""
                    component={InputField}
                  />
                </InputWrap>

                <InputWrap dir={direction}>
                  <section>
                    <label><IntlMessage id="userManagement.Email" /></label>
                  </section>
                  <Field
                    dir="ltr"
                    type="email"
                    placeholder=""
                    name={`email`}
                    component={InputField}
                  />
                </InputWrap>

                <InputWrap dir={direction}>
                  <section>
                    <label><IntlMessage id="userManagement.Role" /></label>
                  </section>
                  <Field
                    name={`role`}
                    component={DependentField}
                    getChanges={() => function Close() {}}
                    options={userRoleTListing}
                    getOptionLabel={(option) => (option ? option?.name : "")}
                    renderInput={(params) => (
                      <div
                        ref={params.InputProps.ref}
                        style={{ position: "relative" }}
                      >
                        <SelectInput
                          placeholder="Role"
                          Dir={direction}
                          type="text"
                          {...params.inputProps}
                        />
                        <SelectIconDiscount
                          className="icon-DropDownArrow"
                          dir={direction}
                        />
                      </div>
                    )}
                  />
                </InputWrap>

                <div style={{ textAlign: "center" }}>
                  {loading ? (
                    <CircularProgress sx={{ color: "#f55a2c" }} />
                  ) : (
                    <>
                      <BlackButtonMobile onClick={() => handleClose()}>
                      <IntlMessage id="button.close" />
                      </BlackButtonMobile>
                      <OrangeButton><IntlMessage id="button.SUBMIT" /></OrangeButton>
                    </>
                  )}
                </div>
              </Form>
            )}
          />
        </CreateQRWrapper>
      </Dialog>
    </div>
  );
}

export const SelectIconDiscount = styled.i`
  position: absolute;
  top: 20px;
  right: ${({ dir }) => dir === "ltr" && "20px"};
  left: ${({ dir }) => dir === "rtl" && "20px"};
  font-size: 12px !important;
`;
