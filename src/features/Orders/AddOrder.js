import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  ButtonWrapper,
  Cancel,
  OrangeButton,
  SelectIcon,
  BlackButtonMobile,
} from "../../style/Gobalstyle";
import { useNavigate } from "react-router-dom";
import { AddOrderWrapper, BoxContent, InputWrap } from "./OrderStyle";
import PhoneInput from "react-phone-input-2";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import InputField from "../../validation/InputField";
import { DependentField } from "../../validation/DependentField";
import { SelectInput } from "../Menu/MenuStyle";
import { getQrGroupListing, viewMenusGroup } from "../../services/Collection";
import { useDispatch, useSelector } from "react-redux";
import { orderSection } from "./OrderStore";
import IntlMessage from "../../Utils/IntlMessage";

export default function AddOrder({ open, handleClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const direction = useSelector((state) => state.languageDirection.direction);
  const navigate = useNavigate();

  const [qrGroupList, setQrGroupList] = useState([]);
  const [qrCodeNameList, setQrCodeNameList] = useState([]);
  const [orderType, setOrderType] = useState([]);
  const dispatch = useDispatch();
  const AddOrderValues = useSelector((state) => state.RestaurantOrder);

  const initialValues = {
    customerName: "",
    qrCodeGroup: "",
    qrCodeName: "",
    orderType: "",
    country_code: "",
    phone_number: "",
  };
  // Yup is used for validation.
  let schema = yup.object().shape({
    customerName: yup.string().required("Please enter menu name"),
    qrCodeGroup: yup.object().required("required"),
    qrCodeName: yup.object().required("required"),
    phone_number: yup.string().required("Please enter menu name"),
  });

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    dispatch(orderSection({ values }));
    if (AddOrderValues?.addOrder) {
      navigate("/aglut/orders/addorder/details");
    }
  };

  const getQRGroupListDropdown = async () => {
    let res = await getQrGroupListing("2");
    if (res.status === 200) {
      setQrGroupList(res.data);
    }
  };

  const getQrName = async (name, value) => {
    setOrderType(value.group_type);
    let res = await viewMenusGroup(value.id);
    if (res.status === 200) {
      setQrCodeNameList(res.data.QrCodes);
    }
  };

  useEffect(() => {
    getQRGroupListDropdown();
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

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
          render={({ values, setFieldValue }) => (
            <Form>
              <AddOrderWrapper>
                <BoxContent>
                  <header><IntlMessage id="Orders.addOrder" /></header>

                  <InputWrap>
                    <section>
                      <label><IntlMessage id="Orders.createOrder.customerName" /></label>
                    </section>

                    <Field
                      type="text"
                      name="customerName"
                      placeholder="Customer name"
                      component={InputField}
                    />
                  </InputWrap>

                  <InputWrap dir="ltr">
                    <section>
                      <label><IntlMessage id="Orders.createOrder.qrCodeGroup" /></label>
                    </section>

                    <Field
                      name="qrCodeGroup"
                      component={DependentField}
                      getChanges={getQrName}
                      options={qrGroupList}
                      getOptionLabel={(option) =>
                        option ? option?.group_name : ""
                      }
                      renderInput={(params) => (
                        <div
                          ref={params.InputProps.ref}
                          style={{ position: "relative" }}
                        >
                          <SelectInput
                            placeholder="QR Code Group"
                            type="text"
                            {...params.inputProps}
                          />
                          <SelectIcon
                            className="icon-DropDownArrow"
                            dir="ltr"
                          />
                        </div>
                      )}
                    />
                  </InputWrap>

                  <InputWrap dir="ltr">
                    <section>
                      <label><IntlMessage id="Orders.createOrder.qrCodeName" /></label>
                    </section>

                    <Field
                      name="qrCodeName"
                      component={DependentField}
                      getChanges={() => function Close() {}}
                      options={qrCodeNameList}
                      getOptionLabel={(option) => (option ? option?.name : "")}
                      renderInput={(params) => (
                        <div
                          ref={params.InputProps.ref}
                          style={{ position: "relative" }}
                        >
                          <SelectInput
                            placeholder="QR Code Name"
                            type="text"
                            {...params.inputProps}
                          />
                          <SelectIcon
                            className="icon-DropDownArrow"
                            dir="ltr"
                          />
                        </div>
                      )}
                    />
                  </InputWrap>

                  <InputWrap dir="ltr">
                    <section>
                      <label><IntlMessage id="Orders.createOrder.orderType" /></label>
                    </section>

                    <input type="text" value={orderType} readOnly />
                  </InputWrap>

                  <InputWrap>
                    <section>
                      <label><IntlMessage id="Orders.createOrder.phoneNumber" /></label>
                    </section>

                    <PhoneInput
                      country={"us"}
                      onChange={(value, data) => {
                        setFieldValue(`country_code`, "+" + data.dialCode);
                        setFieldValue(
                          `phone_number`,
                          value.substring(data.dialCode.length, 20)
                        );
                      }}
                      containerStyle={{
                        width: "100%",
                        height: "42px",
                        background: "#fcfdfe",
                        border: "1px solid #f0f1f7",
                        borderRadius: "8px",
                        margin: "5px 0 20px 0",
                      }}
                      inputStyle={{
                        border: "none",
                        width: "100%",
                        height: "40px",
                      }}
                      placeholder="Phone Number"
                    />
                  </InputWrap>
                </BoxContent>
                <ButtonWrapper>
                <BlackButtonMobile onClick={() => handleClose()}>
                <IntlMessage id="button.close" />
                    </BlackButtonMobile>
                  <OrangeButton
                    // onClick={() => navigate("/aglut/orders/addorder/details")}
                    type="submit"
                  >
                    <IntlMessage id="button.SUBMIT" />
                  </OrangeButton>
                </ButtonWrapper>
              </AddOrderWrapper>
            </Form>
          )}
        />
      </Dialog>
    </div>
  );
}
