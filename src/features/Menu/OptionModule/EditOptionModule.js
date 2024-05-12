import React, { useState, useMemo, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  OrangeButton,
  WhiteButton,
  LoadingWrapper,
  Cancel,
  BlackButtonMobile,
} from "../../../style/Gobalstyle";
import * as yup from "yup";
import {
  editOptionMenu,
  viewOptionMenu,
  deleteModifieritem,
} from "../../../services/Collection";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { CircularProgress, Switch } from "@mui/material";
import { Field, Form, Formik, FieldArray } from "formik";
import InputField from "../../../validation/InputField";
import {
  InputWrap,
  ModifiersWrapper,
  OrangeOutput,
  DeleteButton,
  InputWrapOptionModule,
} from "../MenuStyle";
import IntlMessage from "../../../Utils/IntlMessage";

export default function EditOptionModule({
  open,
  handleClose,
  fetchdata,
  payload,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const direction = useSelector((state) => state.languageDirection.direction);
  const [optionData, setOptionData] = useState({});

  const [loading, setLoading] = useState(false);
  const currency = useSelector(
    (state) => state.profileDetails.restaurantDetails.currency
  );

  const initialValues = useMemo(() => {
    if (optionData) {
      let modifierToSend = [];
      optionData?.OptionItemModules?.map((el) =>
        modifierToSend.push({
          modifier_item_id: el.id,
          name: el.name,
          ar_name: el.ar_name,
          price: el.price,
          calories: el.calories,
          status: el.status,
        })
      );

      return {
        name: optionData.name,
        ar_name: optionData.ar_name,
        modifier: modifierToSend,
      };
    }

    return {
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
    };
  }, [optionData]);

  // Yup is used for validation.
  let schema = yup.object().shape({
    name: yup.string().required("Please enter name"),
    ar_name: yup.string().required("Please enter name"),
    modifier: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Please enter name"),
        ar_name: yup.string().required("Please enter name"),
        price: yup.string().required("Please enter price"),
        calories: yup.string().optional("Please enter caloris"),
      })
    ),
  });

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    setLoading(true);

    let obj = { ...values, group_module_id: optionData.id };

    let res = await editOptionMenu(obj);
    if (res.status === 200) {
      setLoading(false);
      handleClose();
      fetchdata();
      toast.info(res.message);
    } else {
      handleClose();
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const getDetails = async () => {
    setLoading(true);
    let res = await viewOptionMenu(payload.id);
    if (res.status === 200) {
      setOptionData(res.data);
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

  const deleteModifier = async (arrayHelpers, index, id) => {
    arrayHelpers.remove(index);
    setLoading(true);
    let res = await deleteModifieritem(id);
    if (res.status === 200) {
      // setOptionData(res.data);

      setLoading(false);
      handleClose();
      fetchdata();
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
        aria-labelledby="responsive-dialog-title"
      >
        {loading ? (
          <LoadingWrapper style={{minWidth: "413px"}}>
            <CircularProgress sx={{ color: "#f55a2c" }} />
          </LoadingWrapper>
        ) : (
          <>
            <Cancel onClick={handleClose} dir={direction}>
              <i className="icon-CloseCross" />
            </Cancel>
            <CreateQRWrapper>
              <header><IntlMessage id="Menu.editOptionModule.Heading" /></header>
              <Formik
                initialValues={initialValues}
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
                                        onClick={() =>
                                          deleteModifier(
                                            arrayHelpers,
                                            index,
                                            modifier.modifier_item_id
                                          )
                                        }
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
                                + Add Modifier
                              </WhiteButton>
                            </div>

                            <div style={{ textAlign: "center" }}>
                              {loading ? (
                                <CircularProgress sx={{ color: "#f55a2c" }} />
                              ) : (
                                <>
                                  <BlackButtonMobile
                                    onClick={() => handleClose()}
                                  >
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
          </>
        )}
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
