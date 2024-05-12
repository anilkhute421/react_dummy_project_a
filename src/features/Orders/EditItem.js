import React from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  BlackButtonMobile,
  ButtonWrapper,
  Cancel,
  LoadingWrapper,
  OrangeButton,
  SelectIcon,
} from "../../style/Gobalstyle";
import styled from "styled-components";
import {
  BoxContent,
  Button,
  DetailBox,
  ExtraSection,
  ExtraSectionDetails,
  FieldGrid3,
  OptionSetWrap,
  SpecialNote,
  TotalSection,
} from "./OrderStyle";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { DependentField } from "../../validation/DependentField";
import { SelectInput } from "../Menu/MenuStyle";
import InputField from "../../validation/InputField";
import { useState } from "react";
import {
  activeMenuDetails,
  editExistingItemsinOrder,
  getItemDetails,
} from "../../services/Collection";
import { useEffect } from "react";
import ExtraTable from "./ExtraTable";
import { useCallback } from "react";
import TextArea from "../../validation/TextArea";
import { useMemo } from "react";
import { CircularProgress } from "@mui/material";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import IntlMessage from "../../Utils/IntlMessage";

export default function EditItem({
  open,
  handleClose,
  data,
  selectedData,
  dataFetch,
}) {
  const direction = useSelector((state) => state.languageDirection.direction);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeSection, setActiveSection] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [defaultSelectItems, setDefaultSelectItems] = useState([]);
  const [sectionItem, setSectionItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const RestaurantDetails = useSelector(
    (state) => state?.profileDetails?.restaurantDetails
  );

  const initialValues = useMemo(() => {
    if (sectionItem) {
      let ItemStatus = {
        payment: selectedData.payment_status === "1" ? "Pending" : "Paid",
      };

      let ModeOfPayment = {
        mode: selectedData.mode_of_payment === "1" ? "Cash" : "Card",
        id: selectedData.mode_of_payment === "1" ? "1" : "2",
      };

      return {
        name: selectedData?.customer_name,
        phoneNumber: selectedData?.phone_number,
        status: ItemStatus,
        mode: ModeOfPayment,
        sections: {
          section_name: selectedData?.category,
          section_id: selectedData?.section_id,
        },
        sectionItems: sectionItem,
        quantity: selectedData?.quantity,
        extra: selectedData?.OrderItemAddOns,
        specialNote: selectedData?.special_notes,
        offer_discount: selectedData?.offer_discount,
        specific_payment_amount: 0,
      };
    }

    return {
      name: "",
      phoneNumber: "",
      status: "",
      sections: "",
      sectionItems: "",
      quantity: 0,
      extra: [],
      specialNote: "",
      offer_discount: "",
      specific_payment_amount: "",
    };
  }, [sectionItem]);

  // Yup is used for validation.
  let schema = yup.object().shape({
    item_price: yup.array().of(
      yup.object().shape({
        // priceName: yup.boolean().when("show", {
        //   is: true,
        //   then: yup.string().required("Please enter price name"),
        // }),
        priceName: yup.string().optional("Please enter name"),
        price_ar_name: yup.string().optional("Please enter name"),
        price: yup
          .string()
          .matches("([0-9]s*)+", "Only number is allowed")
          .required("Please enter price"),
        calories: yup.string().optional(),
      })
    ),
    mode: yup.object().required("required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);

    let newArr = [];

    let innerArr = [];
    newArr.push({
      section_id: values.sections.id || values.sections.section_id,
      item_id: values.sectionItems.id,
      rough: !values?.extra
        ? []
        : values?.extra?.length > 0 &&
          values?.extra?.map((ele) =>
            innerArr?.push({
              option_group_id: ele.option_group_id,
              option_item_id: ele.option_item_id || ele.id,
              price: Number(ele.realprice) * values.quantity,
              quantity: values.quantity,
            })
          ),

      order_items_addon: innerArr,

      special_notes: values.specialNote,
      ar_special_notes: "some random notes",
      amount:
        Number(values.sectionItems.ItemPrices[0].price) *
        Number(values.quantity),
      quantity: values.quantity,
    });

    let specific_payment_amount =
      CalculateFinalPriceAfterCalDiscountAndTax(values);

    let discount = CalculateDiscount(values);

    var req = {
      order_id: selectedData.order_id,
      order_item_id: selectedData.id,
      customer_name: values.name,
      phone_number: values.phoneNumber,
      payment_status: values.status.payment === "Pending" ? "1" : "2",
      remark: "some random remark",
      mode_of_payment: values.mode.id,
      order_items: newArr,
      specific_payment_amount:
        values.status.payment === "Paid" ? specific_payment_amount : 0,
      discount: discount,
    };

    let res = await editExistingItemsinOrder(req);
    if (res.status === 200) {
      setLoading(false);
      handleClose();
      dataFetch();
      toast.info(res.message);
    } else {
      handleClose();
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const getactiveMenuDetails = async () => {
    let res = await activeMenuDetails();
    if (res.status === 200) {
      setActiveSection(res.data.Sections);
    }
  };

  const getactiveSectionItemsDetails = async () => {
    setLoading(true);
    let resItem = await getItemDetails(selectedData.item_id);
    if (resItem.status === 200) {
      setSectionItem(resItem.data);
      setLoading(false);
    }
  };

  const selectedSectionDetails = (name, value) => {
    setSelectedItems(value?.Items);
  };

  const getsectionItemsList = (value) => {
    return value?.Items || [];
  };

  const selectedSectionItemDetails = (name, value) => {
    return value?.MenuItemOptions;
  };

  const updateFiledData = useCallback((obj, arr, tick) => {
    if (tick) {
      if (Array.isArray(arr)) {
        if (arr.find((el) => el.id === obj.id)) {
          return arr.map((el) => {
            if (el.id === obj.id) {
              return obj;
            }
            return el;
          });
        } else {
          return [...arr, obj];
        }
      } else {
        return [obj];
      }
    } else {
      return arr.filter((el) => el.id !== obj.id);
    }
  }, []);

  const TotalPrice = (payload) => {
    let sum = 0;
    if (payload?.quantity > 0) {
      payload?.extra.length > 0 &&
        payload?.extra?.map((el) => (
          <>
            {payload.quantity > 1
              ? el?.realprice && (sum = sum + el?.realprice * payload.quantity)
              : el?.realprice &&
                (sum = sum + el?.realprice * payload?.quantity)}
          </>
        ));
      return (
        payload.quantity * payload?.sectionItems?.ItemPrices?.[0].price + sum
      );
    }
  };

  const CalculateDiscount = (values) => {
    if (values.offer_discount) {
      if (values.offer_discount.minimum_quantity <= values.quantity) {
        let sum = 0;
        if (values?.quantity > 0) {
          values?.extra.length > 0 &&
            values?.extra?.map((el) => (
              <>
                {values.quantity > 1
                  ? el?.realprice &&
                    (sum = sum + el?.realprice * values.quantity)
                  : el?.realprice &&
                    (sum = sum + el?.realprice * values?.quantity)}
              </>
            ));

          let finalPrice =
            values.quantity * values?.sectionItems?.ItemPrices?.[0].price + sum;

          let discount = (finalPrice * values.offer_discount.discount) / 100;
          return discount;
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const CalculateFinalPriceAfterCalDiscountAndTax = (payload) => {
    let tax = RestaurantDetails?.vat + RestaurantDetails?.service_charge;
    let sum = 0;
    if (payload?.quantity > 0) {
      payload?.extra.length > 0 &&
        payload?.extra?.map((el) => (
          <>
            {payload.quantity > 1
              ? el?.realprice && (sum = sum + el?.realprice * payload.quantity)
              : el?.realprice &&
                (sum = sum + el?.realprice * payload?.quantity)}
          </>
        ));

      let itemPrice =
        payload.quantity * payload?.sectionItems?.ItemPrices?.[0].price + sum;

      if (payload.offer_discount) {
        if (payload.offer_discount.minimum_quantity <= payload.quantity) {
          let sum = 0;
          if (payload?.quantity > 0) {
            payload?.extra.length > 0 &&
              payload?.extra?.map((el) => (
                <>
                  {payload.quantity > 1
                    ? el?.realprice &&
                      (sum = sum + el?.realprice * payload.quantity)
                    : el?.realprice &&
                      (sum = sum + el?.realprice * payload?.quantity)}
                </>
              ));

            let finalPrice =
              payload.quantity * payload?.sectionItems?.ItemPrices?.[0].price +
              sum;

            let discount = (finalPrice * payload.offer_discount.discount) / 100;
            let final = itemPrice - discount;

            return final + (final * tax) / 100;
          }
        } else {
          return itemPrice + (itemPrice * tax) / 100;
        }
      } else {
        return itemPrice + (itemPrice * tax) / 100;
      }
    }
  };

  useEffect(() => {
    if (activeSection) {
      activeSection.filter(
        (el) =>
          el.id === selectedData.section_id && setDefaultSelectItems(el.Items)
      );
    }
  }, [activeSection]);

  useEffect(() => {
    getactiveSectionItemsDetails();
    getactiveMenuDetails();
  }, []);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth={true}
        maxWidth={"md"}
      >
        <Cancel onClick={handleClose} dir={direction}>
          <i className="icon-CloseCross" />
        </Cancel>

        <DialogWrapper>
          {loading ? (
            <LoadingWrapper>
              <CircularProgress sx={{ color: "#f55a2c" }} />
            </LoadingWrapper>
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={handleSubmit}
              render={({ values, setFieldValue }) => (
                <Form>
                  <BoxContent>
                    <header><IntlMessage id="Orders.editOrder.editItem.heading" /></header>
                  </BoxContent>

                  <DetailBox>
                    <section style={{ width: "100%" }}>
                      <FieldGrid3>
                        <InputWrap>
                          <label><IntlMessage id="Orders.editOrder.editItem.name" /></label>
                          <Field
                            type="text"
                            name="name"
                            placeholder="Name"
                            component={InputField}
                            readOnly
                          />
                        </InputWrap>

                        <InputWrap>
                          <label><IntlMessage id="Order.orderDeatils.phoneNumber" /></label>
                          <Field
                            type="number"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            component={InputField}
                            readOnly
                          />
                        </InputWrap>

                        <OptionSetWrap>
                          <div>
                            <p><IntlMessage id="Orders.Status" /></p>
                            <Field
                              name="status"
                              component={DependentField}
                              getChanges={() => function Close() {}}
                              options={[
                                { payment: "Pending", id: "1" },
                                { payment: "Paid", id: "2" },
                              ]}
                              getOptionLabel={(option) =>
                                option ? option?.payment : ""
                              }
                              renderInput={(params) => (
                                <div
                                  ref={params.InputProps.ref}
                                  style={{ position: "relative" }}
                                >
                                  <SelectInput
                                    placeholder="Status"
                                    // Dir={direction}
                                    type="text"
                                    {...params.inputProps}
                                    readOnly
                                  />
                                  <SelectIcon
                                    className="icon-DropDownArrow"
                                    dir="ltr"
                                  />
                                </div>
                              )}
                            />
                          </div>
                        </OptionSetWrap>
                      </FieldGrid3>
                    </section>

                    <section style={{ width: "100%" }}>
                      <FieldGrid3>
                        <OptionSetWrap>
                          <div>
                            <p><IntlMessage id="sidebar.submenu.sections" /></p>
                            <Field
                              name="sections"
                              component={DependentField}
                              getChanges={selectedSectionDetails}
                              options={activeSection}
                              getOptionLabel={(option) =>
                                option ? option?.section_name : ""
                              }
                              renderInput={(params) => (
                                <div
                                  ref={params.InputProps.ref}
                                  style={{ position: "relative" }}
                                >
                                  <SelectInput
                                    placeholder="Sections"
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
                          </div>
                        </OptionSetWrap>

                        {/* //defaultSelectItems */}
                        <OptionSetWrap>
                          <div>
                            <p><IntlMessage id="sidebar.submenu.sectionItems" /></p>
                            <Field
                              name="sectionItems"
                              component={DependentField}
                              getChanges={selectedSectionItemDetails}
                              options={
                                getsectionItemsList(values?.sections).length ===
                                0
                                  ? defaultSelectItems
                                  : getsectionItemsList(values?.sections)
                              }
                              getOptionLabel={(option) =>
                                option ? option?.name : ""
                              }
                              renderInput={(params) => (
                                <div
                                  ref={params.InputProps.ref}
                                  style={{ position: "relative" }}
                                >
                                  <SelectInput
                                    placeholder="Section Items"
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
                          </div>
                        </OptionSetWrap>

                        <InputWrap>
                          <div>
                            <p><IntlMessage id="Orders.createOrder.addOrderDeatils.quantity" /></p>
                            <Button>
                              <span
                                onClick={() =>
                                  setFieldValue(`quantity`, values.quantity + 1)
                                }
                              >
                                +
                              </span>
                              <p name={`quantity`}>{values.quantity}</p>

                              {values.quantity > 1 ? (
                                <span
                                  onClick={(e) =>
                                    setFieldValue(
                                      `quantity`,
                                      values.quantity - 1
                                    )
                                  }
                                >
                                  -
                                </span>
                              ) : (
                                <span>-</span>
                              )}
                            </Button>
                          </div>
                        </InputWrap>
                      </FieldGrid3>

                      <FieldGrid3>
                        <OptionSetWrap>
                          <div>
                            <p><IntlMessage id="Orders.editOrder.editItem.ModeOfPayment" /></p>
                            <Field
                              name="mode"
                              component={DependentField}
                              getChanges={() => function Close() {}}
                              options={[
                                { mode: "Cash", id: "1" },
                                { mode: "Card", id: "2" },
                              ]}
                              getOptionLabel={(option) =>
                                option ? option?.mode : ""
                              }
                              renderInput={(params) => (
                                <div
                                  ref={params.InputProps.ref}
                                  style={{ position: "relative" }}
                                >
                                  <SelectInput
                                    placeholder="Status"
                                    // Dir={direction}
                                    type="text"
                                    {...params.inputProps}
                                    readOnly
                                  />
                                  <SelectIcon
                                    className="icon-DropDownArrow"
                                    dir="ltr"
                                  />
                                </div>
                              )}
                            />
                          </div>
                        </OptionSetWrap>
                      </FieldGrid3>

                      {selectedData.OrderItemAddOns.length > 0 && (
                        <div>
                          <OptionSetWrap>
                            <p><IntlMessage id="Orders.createOrder.addOrderDeatils.extra" /></p>
                          </OptionSetWrap>

                          <ExtraSection>
                            <ExtraSectionDetails>
                              {values.sectionItems?.MenuItemOptions?.map(
                                (intgration1) =>
                                  intgration1?.OptionGroupModule?.OptionItemModules?.map(
                                    (intgration2) =>
                                      intgration2.status && (
                                        <Field
                                          name="extra"
                                          component={ExtraTable}
                                          getChanges={
                                            selectedSectionItemDetails
                                          }
                                          intgration2={intgration2}
                                          selectedData={selectedData}
                                          // index={index}
                                          allData={
                                            intgration1?.OptionGroupModule
                                              ?.OptionItemModules
                                          }
                                          allReadyExistExtra={
                                            selectedData?.OrderItemAddOns
                                          }
                                          sendValues={(e, object) =>
                                            setFieldValue(
                                              "extra",
                                              updateFiledData(
                                                object,
                                                values?.extra,
                                                e
                                              )
                                            )
                                          }
                                        />
                                      )
                                  )
                              )}
                            </ExtraSectionDetails>
                          </ExtraSection>
                        </div>
                      )}
                      <SpecialNote style={{ marginTop: "10px" }}>
                        <InputWrap>
                          <label><IntlMessage id="Orders.createOrder.addOrderDeatils.specialNote" /></label>
                        </InputWrap>
                        <Field
                          type="text"
                          name="specialNote"
                          placeholder="Special Note"
                          component={TextArea}
                        />
                      </SpecialNote>
                    </section>

                    <TotalSection>
                      <p><IntlMessage id="userManagement.rolePermission.discount" /> : QAR {CalculateDiscount(values)}</p>
                    </TotalSection>

                    <TotalSection>
                      <span><IntlMessage id="Orders.createOrder.addOrderDeatils.itemAmount" /> : QAR {TotalPrice(values)}</span>
                      <span>
                      <IntlMessage id="Orders.createOrder.addOrderDeatils.payableAmount" />: QAR{" "}
                        {CalculateFinalPriceAfterCalDiscountAndTax(values)}
                        <label>(<IntlMessage id="Orders.createOrder.addOrderDeatils.includingTaxes" />)</label>
                      </span>
                    </TotalSection>
                  </DetailBox>

                  <ButtonWrapper>
                    <OrangeButton type="sumbit"><IntlMessage id="button.SUBMIT" /></OrangeButton>
                    <BlackButtonMobile onClick={() => handleClose()}>
                    <IntlMessage id="button.close" />
                    </BlackButtonMobile>
                  </ButtonWrapper>
                </Form>
              )}
            />
          )}
        </DialogWrapper>
      </Dialog>
    </div>
  );
}

export const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
  }

  section {
    display: flex;
  }

  label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
  }

  input {
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
  input:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;
  }
`;

const DialogWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 10px 20px;
  margin: 22px 0;

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
`;
