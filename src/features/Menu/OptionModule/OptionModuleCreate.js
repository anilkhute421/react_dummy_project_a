import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  BlackButtonMobile,
  Cancel,
  OrangeButton,
  WhiteButton,
} from "../../../style/Gobalstyle";
import { useSelector } from "react-redux";
import {
  DeleteButton,
  InputWrapOptionModule,
  ModifiersWrapper,
  OrangeOutput,
} from "../MenuStyle";
import { Field, Form, Formik, FieldArray } from "formik";
import * as yup from "yup";
import InputField from "../../../validation/InputField";
import { createModifier } from "../../../services/Collection";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { CircularProgress, Switch } from "@mui/material";
import styled from "styled-components";
import IntlMessage from "../../../Utils/IntlMessage";

// import { CreateQRWrapper, InputWrap } from "../QRStyle";

export default function OptionModuleCreate({
  open,
  handleClose,
  values,
  action,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const direction = useSelector((state) => state.languageDirection.direction);
  const currency = useSelector(
    (state) => state.profileDetails.restaurantDetails.currency
  );
  const [loading, setLoading] = useState(false);

  const EnRegex = "([a-zA-Z]s*)+";
  const ArRegex = "[\u0600-\u06FF]";

  // Yup is used for validation.
  let schema = yup.object().shape({
    name: yup
      .string()
      .matches(EnRegex, "Only English letters allow")
      .required("Please enter name"),
    ar_name: yup
      .string()
      .matches(ArRegex, "Only Arabic letters allow")
      .required("Please enter name"),
    modifier: yup.array().of(
      yup.object().shape({
        name: yup
          .string()
          .matches(EnRegex, "Only English letters allow")
          .required("Please enter name"),
        ar_name: yup
          .string()
          .matches(ArRegex, "Only Arabic letters allow")
          .required("Please enter name"),
        price: yup.string().required("Please enter price"),
        calories: yup.string().optional("Please enter caloris"),
      })
    ),
  });

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    setLoading(true);
    let modifierToSend = [];

    for (let i = 0; i < values.modifier.length; i++) {
      modifierToSend.push({
        name: values.modifier[i].name,
        ar_name: values.modifier[i].ar_name,
        price: values.modifier[i].price,
        calories: values.modifier[i].calories,
        status: values.modifier[i].status,
      });
    }

    let req = {
      name: values.name,
      ar_name: values.ar_name,
      modifier: modifierToSend,
    };

    let res = await createModifier(req);
    if (res.status === 200) {
      setLoading(false);
      handleClose();
      // window.location.reload();
      action();
      toast.info(res.message);
    } else {
      handleClose();
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
        <Cancel onClick={handleClose} dir={direction}>
          <i className="icon-CloseCross" />
        </Cancel>

        <CreateQRWrapper>
          <header>
            <IntlMessage id="Menu.createOptionModule.Heading" />
          </header>

          <Formik
            initialValues={{
              name: "",
              ar_name: "",
              modifier: [
                {
                  status: false,
                  name: "",
                  ar_name: "",
                  price: "",
                  calories: "",
                },
              ],
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
            render={({ values, setFieldValue }) => (
              <Form>
                <InputWrapOptionModule dir={direction}>
                  <section>
                    <label>Name / اسم</label>
                  </section>
                  <Field
                    dir="ltr"
                    type="text"
                    placeholder="Name"
                    name={`name`}
                    component={InputField}
                  />
                  <Field
                    dir="rtl"
                    type="text"
                    placeholder="اسم"
                    name={`ar_name`}
                    component={InputField}
                  />
                </InputWrapOptionModule>

                <InputWrapOptionModule dir={direction}>
                  <section>
                    <label>Modifiers / الصفات التعريفية</label>
                  </section>
                </InputWrapOptionModule>

                <FieldArray
                  name="modifier"
                  render={(arrayHelpers) => {
                    const modifier = values?.modifier;
                    return (
                      <div>
                        {modifier && modifier.length > 0
                          ? modifier?.map((modifier, index) => (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "baseline",
                                }}
                              >
                                <div>
                                  <Switch
                                    name={`modifier.${index}.status`}
                                    checked={
                                      values.modifier[index].status === true
                                    }
                                    onChange={(event, checked) => {
                                      setFieldValue(
                                        `modifier.${index}.status`,
                                        checked ? true : false
                                      );
                                    }}
                                  />
                                </div>
                                <ModifiersWrapper>
                                  <InputWrapOptionModule dir={direction}>
                                    <Field
                                      dir="ltr"
                                      type="text"
                                      placeholder="Name"
                                      name={`modifier.${index}.name`}
                                      component={InputField}
                                    />
                                    <Field
                                      dir="rtl"
                                      type="text"
                                      placeholder="اسم"
                                      name={`modifier.${index}.ar_name`}
                                      component={InputField}
                                    />
                                  </InputWrapOptionModule>

                                  <OrangeOutput dir={direction}>
                                    <Field
                                      dir="ltr"
                                      type="number"
                                      placeholder="1.00"
                                      name={`modifier.${index}.price`}
                                      component={InputField}
                                    />
                                    <span>{currency}</span>
                                  </OrangeOutput>
                                  <OrangeOutput dir={direction}>
                                    <Field
                                      dir="ltr"
                                      type="number"
                                      placeholder="1.00"
                                      name={`modifier.${index}.calories`}
                                      component={InputField}
                                    />
                                    <span>Cal</span>
                                  </OrangeOutput>
                                </ModifiersWrapper>
                                <div>
                                  <DeleteButton
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <i className="icon-Delete" />
                                  </DeleteButton>
                                </div>
                              </div>
                            ))
                          : null}

                        <div className="justifyLeft">
                          <WhiteButton
                            onClick={() =>
                              arrayHelpers.push({
                                status: false,
                                name: "",
                                ar_name: "",
                                price: "",
                                calories: "",
                              })
                            }
                          >
                            + <IntlMessage id="button.addModifier" />
                          </WhiteButton>
                        </div>

                        <div style={{ textAlign: "center" }}>
                          {loading ? (
                            <CircularProgress sx={{ color: "#f55a2c" }} />
                          ) : (
                            <>
                              <BlackButtonMobile onClick={() => handleClose()}>
                                <IntlMessage id="button.close" />
                              </BlackButtonMobile>
                              <OrangeButton type="submit">
                                <IntlMessage id="button.SUBMIT" />
                              </OrangeButton>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  }}
                />
              </Form>
            )}
          />
        </CreateQRWrapper>
      </Dialog>
    </div>
  );
}

export const CreateQRWrapper = styled.div`
  width: 600px;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 30px 20px;
  overflow-y: auto;

  img {
    margin: 20px 0;
  }

  header {
    text-align: center;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #000000;
  }

  @media (max-width: 1200px) {
    width: 100%;
    height: 100%;
  }
`;
