import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  BlackButton,
  BlackButtonMobile,
  OrangeButton,
} from "../../../style/Gobalstyle";
import styled from "styled-components";
import InputField from "../../../validation/InputField";
import { Field, Form, Formik } from "formik";
import "../../../style/CustomClasses.css";
import * as yup from "yup";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { changePassword } from "../../../services/Collection";
import { CircularProgress } from "@mui/material";
import IntlMessage from "../../../Utils/IntlMessage";
// import IntlMessage from "../../Utils/IntlMessage";


export default function ChangePassword({ open, handleClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);

  let schema = yup.object().shape({
    currentPassword: yup.string().required("Current password is reqiured"),
    newPassword: yup
      .string()
      .required("New Password password is reqiured")
      .min(8, "New password must be greater than 8 words"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Current password is reqiured"),
  });

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    setLoading(true);

    let req = {
      old_password: values.currentPassword,
      new_password: values.confirmPassword,
    };
    let res = await changePassword(req);
    if (res.status === 200) {
      setLoading(false);
      handleClose();
      toast.success(res.message);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
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
        <Cancel onClick={() => handleClose()}>
          <i className="icon-CloseCross" />
        </Cancel>
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <Form>
            <ChangePasswordWrapper>
              <BoxContent>
                <header><IntlMessage id="profileSection.changePassowrd.heading" /></header>
                <div>
                  <label><IntlMessage id="profileSection.changePassowrd.currPass" /></label>
                  <Field
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    component={InputField}
                  />
                </div>

                <div>
                  <label><IntlMessage id="profileSection.changePassowrd.newPass" /></label>
                  <Field
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    component={InputField}
                  />
                </div>

                <div>
                  <label><IntlMessage id="profileSection.changePassowrd.confPass" /></label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    component={InputField}
                  />
                </div>

                {loading ? (
                  <CircularProgress sx={{ color: "#f55a2c" }} />
                ) : (
                  <>
                    <BlackButtonMobile onClick={() => handleClose()}>
                    <IntlMessage id="button.close" />
                    </BlackButtonMobile>
                    <OrangeButton type="submit"><IntlMessage id="button.SUBMIT" /></OrangeButton>
                  </>
                )}
              </BoxContent>
            </ChangePasswordWrapper>
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
}

const Cancel = styled.span`
  width: 48px;
  height: 48px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  right: -18px;
  top: -18px;
  cursor: pointer;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ChangePasswordWrapper = styled.div`
  width: 413px;
  padding: 30px 20px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const BoxContent = styled.div`
  width: 100%;
  padding: 0 15px;
  text-align: center;

  header {
    font-family: "Jost", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 40px;
    color: #242424;
    padding: 20px 0;
  }
  label {
    text-align: start;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 15px;
    color: #000000;
    padding: 10px 0;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  input {
    height: 48px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    margin: 0 1px 20px 1px;
    padding: 0 16px;

    ::placeholder {
      font-family: "Jost", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      color: #989898;
    }
  }
`;
