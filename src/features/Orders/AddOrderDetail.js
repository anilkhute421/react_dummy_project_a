import React, { useState } from "react";
import {
  BoxContainer,
  ButtonWrapper,
  LoadingWrapper,
  OrangeButton,
  SelectIcon,
  SubHeader,
  WhiteButton,
} from "../../style/Gobalstyle";
import { useNavigate } from "react-router-dom";
import {
  Button,
  DeleteButton,
  DetailBox,
  ExtraSection,
  ExtraSectionDetails,
  FieldGrid3,
  OptionSetWrap,
  SpecialNote,
  TotalSection,
} from "./OrderStyle";
import { Field, FieldArray, Form, Formik } from "formik";
import * as yup from "yup";
import { DependentField } from "../../validation/DependentField";
import { SelectInput } from "../Menu/MenuStyle";
import { useEffect } from "react";
import { activeMenuDetails, takeOrder } from "../../services/Collection";
import ExtraTable from "./ExtraTable";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import { CircularProgress } from "@mui/material";
import TextArea from "../../validation/TextArea";
import InputField from "../../validation/InputField";
import IntlMessage from "../../Utils/IntlMessage";

export default function AddOrderDetail() {
  const navigate = useNavigate();
  const [checkede, Setchecked] = useState(false);
  const [detailsActiveMenu, setDetailsActiveMenu] = useState([]);
  const [activeSection, setActiveSection] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const AddOrderValues = useSelector((state) => state.RestaurantOrder);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    // Case 1 : The user checks the box
    if (checked) {
      Setchecked(true);
    } else {
      Setchecked(false);
    }
  };

  // Yup is used for validation.
  let schema = yup.object().shape({
    order_items: yup.array().of(
      yup.object().shape({
        sections: yup.object().required("required"),
        sectionItems: yup.object().required("required"),
        quantity: yup.number().min(1, "required"),
      })
    ),
  });

  const TotalPrice = (payload) => {
    let sum = 0;
    if (payload?.quantity > 0) {
      payload?.extra.length > 0 &&
        payload?.extra?.map(
          (el) =>
            el?.extraprice && (sum = sum + el?.extraprice * payload?.quantity)
        );
      return (
        payload.quantity * payload?.sectionItems?.ItemPrices?.[0].price + sum
      );
    }
  };

  // This function is called to submit the form.

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    // setLoading(true);
    let newArr = [];
    values.order_items.map((el) => {
      let innerArr = [];
      newArr.push({
        section_id: el.sections.id,
        item_id: el.sectionItems.id,
        rough: !el?.extra
          ? []
          : el?.extra?.length > 0 &&
            el?.extra?.map((ele) =>
              innerArr?.push({
                option_group_id: ele.option_group_id,
                option_item_id: ele.id,
                price: ele.extraprice * el.quantity,
                quantity: ele.extraquantity * el.quantity,
              })
            ),

        order_items_addon: innerArr,

        special_notes: el.specialNote,
        ar_special_notes: "some random notes",
        amount:
          Number(el.sectionItems.ItemPrices[0].price) * Number(el.quantity),
        quantity: el.quantity,
      });
    });

    console.log("newArr", newArr);

    var returnArray = [];

    newArr?.map((el) => {
      if (returnArray.length > 0) {
        returnArray?.map((ele) => {
          if (el.item_id === ele.item_id) {
            el?.order_items_addon?.map((addons) => {
              ele?.order_items_addon?.map((returnArraddons) => {
                if (addons.option_item_id === returnArraddons.option_item_id) {

                } 
              });
            });
          } else {
            alert('dhbcc')
            returnArray.push(el);
          }
        });
      } else {
        returnArray.push(el);
      }
    });

    console.log("returnArray", returnArray);

    // var returnArray = [];
    // console.log("newArrn2u12u1j2uj12", newArr);
    // for (let i = 0; i <= newArr.length; i++) {
    //   if (returnArray.length > 0) {
    //     for (let j = 0; j <= returnArray.length; j++) {
    //       if (returnArray[j].item_id == newArr[i].item_id) {
    //         if (
    //           JSON.stringify(returnArray[j].order_items_addon) ==
    //           JSON.stringify(newArr[i].order_items_addon)
    //         ) {
    //           returnArray[j].quantity =
    //             returnArray[j].quantity + newArr[i].quantity;
    //           returnArray[j].amount = returnArray[j].amount + newArr[i].amount;
    //           for (
    //             let k = 0;
    //             k <= returnArray[j]?.order_items_addon?.length;
    //             k++
    //           ) {
    //             for (let l = 0; l <= newArr[i].order_items_addon.length; l++) {
    //               if (
    //                 (returnArray[j].order_items_addon[k].option_item_id =
    //                   newArr[i].order_items_addon[l].option_item_id)
    //               ) {
    //                 newArr[i].order_items_addon[l].price +=
    //                   returnArray[j].order_items_addon[k].price;
    //                 newArr[i].order_items_addon[l].quantity +=
    //                   returnArray[j].order_items_addon[k].quantity;
    //               }
    //             }
    //           }
    //         } else {
    //           console.log('newArr[i]' , newArr[i])
    //           returnArray.push(newArr[i]);
    //         }
    //       } else {
    //         console.log('newArr[i]00' , newArr[i])

    //         returnArray.push(newArr[i]);
    //       }
    //     }
    //   } else {
    //     console.log('newArr[i]666' , newArr[i])

    //     returnArray.push(newArr[i]);
    //   }
    // }

    let req = {
      customer_name: AddOrderValues?.addOrder?.customerName,
      remark: null,
      qr_code_id: AddOrderValues?.addOrder?.qrCodeName.id,
      qr_code_group_id: AddOrderValues?.addOrder?.qrCodeGroup.id,
      order_type: AddOrderValues?.addOrder?.qrCodeGroup?.group_type,
      phone_number: AddOrderValues?.addOrder?.phone_number,
      order_items: newArr,
    };

    console.log("req", req);

    let res = await takeOrder(req);
    if (res.status === 200) {
      setLoading(false);
      navigate("/aglut/orders");
      toast.info(res.message);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const getactiveMenuDetails = async () => {
    let res = await activeMenuDetails();
    if (res.status === 200) {
      setDetailsActiveMenu(res.data);
      setActiveSection(res.data.Sections);
    }
  };

  const selectedSectionDetails = (name, value) => {
    setSelectedItems(value?.Items);
  };

  const selectedSectionItemDetails = (name, value) => {
    return value?.MenuItemOptions;
  };

  const getsectionItemsList = (value) => {
    return value?.Items || [];
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

  useEffect(() => {
    getactiveMenuDetails();
  }, []);

  if (loading) {
    return (
      <LoadingWrapper>
        <CircularProgress sx={{ color: "#f55a2c" }} />
      </LoadingWrapper>
    );
  }

  return (
    <div>
      <SubHeader>
        <p><IntlMessage id="Orders.createOrder.addOrderDeatils.heading" /></p>
      </SubHeader>

      <Formik
        initialValues={{
          order_items: [
            {
              sections: "",
              sectionItems: "",
              quantity: 0,
              extra: [],
              specialNote: "",
            },
          ],
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
        render={({ values, setFieldValue }) => (
          <Form>
            <BoxContainer>
              <FieldArray name="order_items">
                {({ insert, remove, push, replace }) => (
                  <div>
                    {values?.order_items?.length > 0 &&
                      values?.order_items?.map((el, index) => (
                        <div className="row" key={index}>
                          <DetailBox>
                            <section>
                              <FieldGrid3>
                                <OptionSetWrap>
                                  <div>
                                    <p><IntlMessage id="Orders.createOrder.addOrderDeatils.section" /></p>
                                    <Field
                                      name={`order_items.${index}.sections`}
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

                                <OptionSetWrap>
                                  <div>
                                    <p><IntlMessage id="Orders.createOrder.addOrderDeatils.sectionItems" /></p>

                                    <Field
                                      name={`order_items.${index}.sectionItems`}
                                      component={DependentField}
                                      getChanges={selectedSectionItemDetails}
                                      options={getsectionItemsList(
                                        values?.order_items[index]?.sections
                                      )}
                                      getOptionLabel={(option) =>
                                        option ? option?.name : ""
                                      }
                                      resetExtra={(v) => {
                                        setFieldValue(
                                          `order_items.${index}.extra`,
                                          []
                                        );
                                      }}
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

                                <OptionSetWrap>
                                  <div>
                                    <p><IntlMessage id="Orders.createOrder.addOrderDeatils.quantity" /></p>
                                    <Button>
                                      <span
                                        onClick={() =>
                                          setFieldValue(
                                            `order_items.${index}.quantity`,
                                            el.quantity + 1
                                          )
                                        }
                                      >
                                        +
                                      </span>

                                      <Field
                                        className="quantityInput"
                                        type="text"
                                        value={el.quantity}
                                        name={`order_items.${index}.quantity`}
                                        component={InputField}
                                        readOnly
                                      />

                                      {el.quantity > 1 ? (
                                        <span
                                          onClick={(e) =>
                                            setFieldValue(
                                              `order_items.${index}.quantity`,
                                              el.quantity - 1
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
                                </OptionSetWrap>
                              </FieldGrid3>
                              <OptionSetWrap>
                                <p><IntlMessage id="Orders.createOrder.addOrderDeatils.extra" /></p>
                              </OptionSetWrap>

                              <ExtraSection>
                                <ExtraSectionDetails>
                                  {values?.order_items[index]?.sectionItems
                                    ?.MenuItemOptions?.length > 0 &&
                                    values?.order_items[
                                      index
                                    ].sectionItems?.MenuItemOptions?.map(
                                      (intgration1) =>
                                        intgration1?.OptionGroupModule?.OptionItemModules?.map(
                                          (intgration2) =>
                                            intgration2.status && (
                                              <Field
                                                name={`order_items.${index}.extra`}
                                                component={ExtraTable}
                                                getChanges={
                                                  selectedSectionItemDetails
                                                }
                                                intgration2={intgration2}
                                                index={index}
                                                allData={
                                                  intgration1?.OptionGroupModule
                                                    ?.OptionItemModules
                                                }
                                                allReadyExistExtra={
                                                  values?.order_items[index]
                                                    ?.extra
                                                }
                                                sendValues={(e, object) =>
                                                  setFieldValue(
                                                    `order_items.${index}.extra`,
                                                    updateFiledData(
                                                      object,
                                                      values?.order_items[index]
                                                        ?.extra,
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

                              <TotalSection>
                                <div>
                                  <input
                                    type="checkbox"
                                    name="special"
                                    value="specialnote"
                                    onChange={handleChange}
                                  />
                                  <label><IntlMessage id="Orders.createOrder.addOrderDeatils.specialNote" /></label>
                                </div>
                                <span>
                                <IntlMessage id="Orders.createOrder.addOrderDeatils.itemAmount" /> : QAR{" "}
                                  {TotalPrice(values?.order_items[index])}
                                </span>
                              </TotalSection>

                              {checkede && (
                                <SpecialNote>
                                  <Field
                                    type="text"
                                    name={`order_items.${index}.specialNote`}
                                    placeholder="Special Note"
                                    component={TextArea}
                                  />
                                </SpecialNote>
                              )}
                            </section>
                            {values?.order_items?.length > 1 && (
                              <DeleteButton onClick={() => remove(index)}>
                                <i className="icon-Delete" />
                              </DeleteButton>
                            )}
                          </DetailBox>
                        </div>
                      ))}

                    <div className="justifyLeft">
                      <WhiteButton
                        type="button"
                        onClick={() =>
                          push({
                            sections: "",
                            sectionItems: "",
                            quantity: 0,
                            extra: "",
                          })
                        }
                      >
                        + <IntlMessage id="button.ADDORDER" />
                      </WhiteButton>
                    </div>
                  </div>
                )}
              </FieldArray>

              <ButtonWrapper>
                <OrangeButton
                  // onClick={() => navigate("/aglut/orders/OrderDetails/:123")}
                  type="submit"
                >
                  <IntlMessage id="button.SUBMIT" />
                </OrangeButton>
              </ButtonWrapper>
            </BoxContainer>
          </Form>
        )}
      />
    </div>
  );
}
