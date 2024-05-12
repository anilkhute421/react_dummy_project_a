import { CircularProgress, Dialog, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  BlackButtonMobile,
  Cancel,
  OrangeButton,
} from "../../style/Gobalstyle";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import InputField from "../../validation/InputField";
import { useState } from "react";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { CreatePosDetails } from "../../services/Collection";
import { BoxContent, CreateWrapper, InputWrap, MiddleContent } from "./IntegrationStyle";

export default function PosSetupDetails({ open, handleClose, fetchData }) {
  const direction = useSelector((state) => state.languageDirection.direction);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);

  // Yup is used for validation.
  let schema = yup.object().shape({
    posUrl: yup.string().required("Please enter POS url"),
    employeeNumber: yup.string().required("Please enter employee number"),
    revenueCenter: yup.string().required("Please enter revenue center number"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    setLoading(true)

    let req = {
      pos_url: values.posUrl,
      employee_no: values.employeeNumber,
      revenue_center: values.revenueCenter,
    };

    let res = await CreatePosDetails(req);
    if (res.status === 200) {
      setLoading(false);
      handleClose();
      fetchData();
      toast.info(res.message);
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
        // fullWidth={true}
        aria-labelledby="responsive-dialog-title"
      >
        <Cancel onClick={handleClose} dir={direction}>
          <i className="icon-CloseCross" />
        </Cancel>
        <CreateWrapper>
          <Formik
            initialValues={{
              posUrl: "",
              employeeNumber: "",
              revenueCenter: "",
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <BoxContent>
                  <MiddleContent>
                    <header>
                      {/* <IntlMessage id="Menu.createMenu.Heading" /> */}
                      Add POS Info
                    </header>
                  </MiddleContent>

                  <div>
                    <InputWrap dir={direction}>
                      <section>
                        <label>POS URL</label>
                      </section>

                      <Field
                        name="posUrl"
                        placeholder="POS URL "
                        component={InputField}
                      />
                    </InputWrap>

                    <InputWrap dir={direction}>
                      <section>
                        <label>Employee Number</label>
                      </section>

                      <Field
                      type="number"
                        name="employeeNumber"
                        placeholder="Employee Number"
                        component={InputField}
                      />
                    </InputWrap>

                    <InputWrap dir={direction}>
                      <section>
                        <label>Revenue Center</label>
                      </section>

                      <Field
                      type="number"

                        name="revenueCenter"
                        placeholder="Revenue Center"
                        component={InputField}
                      />
                    </InputWrap>
                  </div>
                </BoxContent>

                <MiddleContent style={{ marginTop: "20px" }}>
                  {loading ? (
                    <CircularProgress sx={{ color: "#f55a2c" }} />
                  ) : (
                    <div style={{ display: "flex" }}>
                      <BlackButtonMobile onClick={() => handleClose()}>
                        {/* <IntlMessage id="button.close" /> */}
                        Close
                      </BlackButtonMobile>
                      <OrangeButton type="submit">
                        {/* <IntlMessage id="button.SUBMIT" /> */}
                        submit
                      </OrangeButton>
                    </div>
                  )}
                </MiddleContent>
              </div>
            </Form>
          </Formik>
        </CreateWrapper>
      </Dialog>
    </div>
  );
}
