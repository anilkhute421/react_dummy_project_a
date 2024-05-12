import { CircularProgress, Dialog, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import {
  BlackButtonMobile,
  Cancel,
  OrangeButton,
} from "../../style/Gobalstyle";

import { Field, Form, Formik } from "formik";
import {
  BoxContent,
  CreateWrapper,
  InputWrap,
  MiddleContent,
} from "./IntegrationStyle";
import InputField from "../../validation/InputField";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import { EditPosDetails } from "../../services/Collection";

export default function EditPos({ open, handleClose, fetchData, data }) {
  const direction = useSelector((state) => state.languageDirection.direction);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);

  const initialValues = useMemo(() => {
    if (data) {
      return {
        posUrl: data.pos_url,
        employeeNumber: data.employee_no,
        revenueCenter: data.revenue_center,
      };
    }
    return {
      posUrl: "",
      employeeNumber: "",
      revenueCenter: "",
    };
  }, [data]);

  console.log("data", data);

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

      let res = await EditPosDetails(req);
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
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <BoxContent>
                  <MiddleContent>
                    <header>
                      {/* <IntlMessage id="Menu.createMenu.Heading" /> */}
                      Edit POS Info
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
