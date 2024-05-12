import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  BoxContainer,
  SubHeader,
  OrangeButton,
  LoadingWrapper,
} from "../../style/Gobalstyle";
import { Field, FieldArray, Form, Formik } from "formik";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import * as yup from "yup";


import {
  offerItemDeatils,
  editDiscount,
  viewDiscountDetails,
} from "../../services/Collection";
import {
  Button,
  DeleteButton,
  DiscountInputWrap,
  InputWrap,
  ItemDeleteButton,
  ItemFreeButton,
  ItemFreeContainer,
  ItemFreeWrapper,
  ItemPriceDiscount,
  ItemPriceWrapper,
  SelectDiscount,
  TotalPriceDiscount,
} from "./DiscountStyle";
import TextArea from "../../validation/TextArea";
import InputField from "../../validation/InputField";
import { DependentField } from "../../validation/DependentField";
import { SelectInput } from "../Menu/MenuStyle";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import IntlMessage from "../../Utils/IntlMessage";

export default function EditDiscount() {
  const direction = useSelector((state) => state.languageDirection.direction);
  const [selectedDiscount, setSelectedDiscount] = useState("itemFree");
  const [offerItemListing, setofferItemListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailData, setDetailData] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const initialValues = useMemo(() => {
    let itemFreeArray = [];
    detailData?.DiscountFreeItems?.map((el) => {
      let newObjectOfferItem = {
        name: el.offer_item_names,
        id: el.offer_item_id,
      };
      let arr = [];
      el.free_item_id.map((ele) => {
        arr.push({
          freeItemname: { name: ele.free_item_name, id: ele.free_item_id },
        });
      });

      itemFreeArray.push({
        offerItem: newObjectOfferItem,
        quantity: el.quantity,
        freeItem: arr,
      });
    });


    // for item price. 
    let arr1 = [];
    detailData?.DiscountItemPrices?.map((el) => {
      arr1.push({
        "offerItemId": { name: el.offer_item_name, id: el.offer_item_id },
        "itemPriceDiscount": el.discount,
        "minimumQuantity": el.minimum_quantity
      })
    });


    if (detailData && itemFreeArray.length === 0 && (!detailData.maximum_order_amount)) {

      return {
        discount_id: detailData.id,
        title: detailData.title,
        ar_title: detailData.ar_title,
        description: detailData.description,
        ar_description: detailData.ar_description,
        discount_type: detailData.discount_type,
        discount_item_free: [
          {
            offerItem: "",
            quantity: 1,
            freeItem: [{ freeItemname: "" }],
          },
        ],
        discountItemPrices: arr1,
        maximum_order_amount: detailData.maximum_order_amount,
        minimum_order_amount: detailData.minimum_order_amount,
        discount: detailData.discount,
      };
    }

    if (detailData && arr1.length === 0 && (!detailData.maximum_order_amount)) {

      return {
        discount_id: detailData.id,
        title: detailData.title,
        ar_title: detailData.ar_title,
        description: detailData.description,
        ar_description: detailData.ar_description,
        discount_type: detailData.discount_type,
        discount_item_free: itemFreeArray,
        discountItemPrices: [
          {
            offerItemId: "",
            minimumQuantity: 1,
            itemPriceDiscount: 0,
          },
        ],
        maximum_order_amount: detailData.maximum_order_amount,
        minimum_order_amount: detailData.minimum_order_amount,
        discount: detailData.discount,
      };
    }

    if (detailData && arr1.length === 0  && itemFreeArray.length === 0) {
      return {
        discount_id: detailData.id,
        title: detailData.title,
        ar_title: detailData.ar_title,
        description: detailData.description,
        ar_description: detailData.ar_description,
        discount_type: detailData.discount_type,
        discount_item_free: [
          {
            offerItem: "",
            quantity: 1,
            freeItem: [{ freeItemname: "" }],
          },
        ],
        discountItemPrices: [
          {
            offerItemId: "",
            minimumQuantity: 1,
            itemPriceDiscount: 0,
          },
        ],
        maximum_order_amount: detailData.maximum_order_amount,
        minimum_order_amount: detailData.minimum_order_amount,
        discount: detailData.discount,
      };
    }

    return {
      title: "",
      ar_title: "",
      description: "",
      ar_description: "",
      discount_type: "",
      discount_item_free: [
        {
          offerItem: "",
          quantity: 1,
          freeItem: [{ freeItemname: "" }],
        },
      ],
      discountItemPrices: [
        {
          offerItemId: "",
          minimumQuantity: 1,
          itemPriceDiscount: 0,
        },
      ],
      maximum_order_amount: 0,
      minimum_order_amount: 0,
      discount: 0,
    };
  }, [detailData]);


  const getViewDiscount = async () => {
    setLoading(true);

    let res = await viewDiscountDetails(Number(params.id));
    if (res.status === 200) {
      setDetailData(res.data);
      if (res.data.discount_type == 1) setSelectedDiscount("itemFree");
      if (res.data.discount_type == 2) setSelectedDiscount("itemPriceDiscount");
      if (res.data.discount_type == 3)
        setSelectedDiscount("totalPriceDiscount");
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };



  const EnRegex = "([a-zA-Z]s*)+";
  const ArRegex = "[\u0600-\u06FF]";
  const NumRegex = "(\d)";

  // Yup is used for validation.
  let schema = yup.object().shape({
    title: yup
      .string()
      .matches(EnRegex, "Only English letters allow")
      .required("Please enter name"),
    ar_title: yup
      .string()
      .matches(ArRegex, "Only Arabic letters allow")
      .required("Please enter name"),
    description: yup
      .string()
      .matches(EnRegex, "Only English letters allow")
      .required("Please enter description"),
    ar_description: yup
      .string()
      .matches(ArRegex, "Only Arabic letters allow")
      .required("Please enter descriptionAR"),

   
  });




  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    setLoading(true);
    // for item free.
    let arr = [];
    values.discount_item_free.map((el) => {
      arr.push({
        offer_item_id: el.offerItem.id,
        free_item_id: el.freeItem.map((ele) => {
          return ele?.freeItemname.id;
        }),
        quantity: el.quantity,
      });
    });

    // for item price.
    let arr1 = [];
    values.discountItemPrices.map((el) => {
      arr1.push({
        offer_item_id: el.offerItemId.id,
        discount: el.itemPriceDiscount,
        minimum_quantity: el.minimumQuantity,
      });
    });

    let req = {
      title: values.title,
      ar_title: values.ar_title,
      discount_type:
        (selectedDiscount === "itemFree" && 1) ||
        (selectedDiscount === "itemPriceDiscount" && 2) ||
        (selectedDiscount === "totalPriceDiscount" && 3),
      description: values.description,
      ar_description: values.ar_description,
      maximum_order_amount: values.maximum_order_amount,
      minimum_order_amount: values.minimum_order_amount,
      discount: values.discount,
      discount_item_free: arr,
      discount_item_prices: arr1,
      discount_id: detailData.id,
    };

    let res = await editDiscount(req);
    if (res.status === 200) {
      setLoading(false);
      navigate(-1);
      toast.info(res.message);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      setLoading(false);
      toast.error(message);
    }
  };

  // offer for item , Free item ,
  const selectBoxListing = async () => {
    let res = await offerItemDeatils();
    if (res.status === 200) {
      setofferItemListing(res.data);
    }
  };

  useEffect(() => {
    selectBoxListing();
    getViewDiscount();
  }, []);

  return (
    <div>
      <SubHeader>
        <p><IntlMessage id="disFreeItems.editDisFreeItems.heading" /></p>
      </SubHeader>
      <BoxContainer>
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
                <DiscountInputWrap>
                  <InputWrap dir={direction}>
                    <section>
                      <label>Offer Title / عنوان العرض</label>
                    </section>
                    <Field
                      dir="ltr"
                      type="text"
                      placeholder="Name"
                      name="title"
                      component={InputField}
                    />
                    <Field
                      dir="rtl"
                      type="text"
                      placeholder="اسم"
                      name="ar_title"
                      component={InputField}
                    />
                  </InputWrap>
                </DiscountInputWrap>

                <DiscountInputWrap>
                  <InputWrap dir={direction}>
                    <section>
                      <label><IntlMessage id="disFreeItems.Type" /></label>
                    </section>
                  </InputWrap>
                  <SelectDiscount>
                    <div style={{ display: "flex" }}>
                      <input
                        type="radio"
                        name="seldiscount"
                        value="itemFree"
                        defaultChecked={
                          selectedDiscount === "itemFree" ? "checked" : null
                        }
                        onClick={(e) => setSelectedDiscount(e.target.value)}
                      />
                      <span><IntlMessage id="disFreeItems.itemFree" /></span>
                    </div>
                    <div style={{ display: "flex" }}>
                      <input
                        type="radio"
                        name="seldiscount"
                        value="itemPriceDiscount"
                        defaultChecked={
                          selectedDiscount === "itemPriceDiscount"
                            ? "checked"
                            : null
                        }
                        onClick={(e) => setSelectedDiscount(e.target.value)}
                      />
                      <span><IntlMessage id="disFreeItems.itemPriceDiscount" /></span>
                    </div>
                    <div style={{ display: "flex" }}>
                      <input
                        type="radio"
                        name="seldiscount"
                        value="totalPriceDiscount"
                        defaultChecked={
                          selectedDiscount === "totalPriceDiscount"
                            ? "checked"
                            : null
                        }
                        onClick={(e) => setSelectedDiscount(e.target.value)}
                      />
                      <span><IntlMessage id="disFreeItems.totalPricediscount" /></span>
                    </div>
                  </SelectDiscount>
                </DiscountInputWrap>
                {selectedDiscount === "itemFree" && (
                  <ItemFreeContainer>
                    <FieldArray name="discount_item_free">
                      {({ remove, push }) => (
                        <>
                  
                          {values?.discount_item_free?.length > 0 &&
                            values?.discount_item_free?.map((el, index) => (
                              <ItemFreeMainContainer
                                className="column"
                                key={index}
                              >
                                <ItemFreeWrapper>
                                  <InputWrap
                                    dir={direction}
                                    style={{ width: "100%" }}
                                  >
                                    <section>
                                      <label><IntlMessage id="disFreeItems.offerForItem" /></label>
                                    </section>
                                    <Field
                                      name={`discount_item_free.${index}.offerItem`}
                                      component={DependentField}
                                      getChanges={() => function Close() { }}
                                      options={offerItemListing}
                                      getOptionLabel={(option) =>
                                        option ? option?.name : ""
                                      }
                                      renderInput={(params) => (
                                        <div
                                          ref={params.InputProps.ref}
                                          style={{ position: "relative" }}
                                        >
                                          <SelectInput
                                            placeholder="Offer Item"
                                            Dir={direction}
                                            type="text"
                                            {...params.inputProps}
                                          />
                                          <SelectIconDiscount
                                            className="icon-DropDownArrow"
                                            dir="ltr"
                                          />
                                        </div>
                                      )}
                                    />


                                  </InputWrap>

                                  <InputWrap dir={direction}>
                                    <section>
                                      <label>
                                      <IntlMessage id="disFreeItems.quantity" />
                                      </label>
                                    </section>
                                    <ItemFreeButton>
                                      <label
                                        onClick={() =>
                                          setFieldValue(
                                            `discount_item_free.${index}.quantity`,
                                            el.quantity + 1
                                          )
                                        }
                                      >
                                        +
                                      </label>
                                      <p>{el.quantity}</p>

                                      {el.quantity > 0 ? (
                                        <label
                                          onClick={(e) =>
                                            setFieldValue(
                                              `discount_item_free.${index}.quantity`,
                                              el.quantity - 1
                                            )
                                          }
                                        >
                                          -
                                        </label>
                                      ) : (
                                        <label>-</label>
                                      )}
                                    </ItemFreeButton>
                                  </InputWrap>
                                </ItemFreeWrapper>
                                <div>
                                  <FieldArray
                                    name={`discount_item_free.${index}.freeItem`}
                                    render={(actions) => (
                                      <div>
                                        {Array.isArray(
                                          values.discount_item_free[index]
                                            .freeItem
                                        ) &&
                                          values.discount_item_free[
                                            index
                                          ].freeItem.map((_, nextIndex) => (
                                            <div
                                              key={`free-item-${index}-${nextIndex}`}
                                              className="test"
                                              style={{ display: "flex" }}
                                            >
                                              <InputWrap dir={direction}>
                                                <section>
                                                  <label><IntlMessage id="disFreeItems.freeItem" /></label>
                                                </section>
                                                <Field
                                                  name={`discount_item_free.${index}.freeItem.${nextIndex}.freeItemname`}
                                                  component={DependentField}
                                                  getChanges={() =>
                                                    function Close() { }
                                                  }
                                                  options={offerItemListing}
                                                  getOptionLabel={(option) =>
                                                    option ? option?.name : ""
                                                  }
                                                  renderInput={(params) => (
                                                    <div
                                                      ref={
                                                        params.InputProps.ref
                                                      }
                                                      style={{
                                                        position: "relative",
                                                      }}
                                                    >
                                                      <SelectInput
                                                        placeholder="Menus"
                                                        Dir={direction}
                                                        type="text"
                                                        {...params.inputProps}
                                                      />
                                                      <SelectIconDiscount
                                                        className="icon-DropDownArrow"
                                                        dir="ltr"
                                                      />
                                                    </div>
                                                  )}
                                                />
                                              </InputWrap>
                                              {values?.discount_item_free[index].freeItem.length > 1 && (
                                                <FreeItemDeleteButton
                                                  onClick={() =>
                                                    actions.remove(nextIndex)
                                                  }
                                                >
                                                  <i className="icon-Delete" />
                                                </FreeItemDeleteButton>
                                              )}
                                            </div>
                                          ))}

                                          {direction === "ltr" ? 
                                          <AddNewButtonWrapperFreeItem>
                                          <span type="button"
                                            onClick={() =>
                                              actions.push({ freeItemname: "" })
                                            }>+<IntlMessage id="button.addNew" />
                                          </span>
                                        </AddNewButtonWrapperFreeItem> :
                                        <AddNewButtonWrapperFreeIteme>
                                        <span type="button"
                                          onClick={() =>
                                            actions.push({ freeItemname: "" })
                                          }>+<IntlMessage id="button.addNew" />
                                        </span>
                                      </AddNewButtonWrapperFreeIteme>
                                        }
                                      </div>
                                    )}
                                  />
                                </div>
                                {values?.discount_item_free?.length > 1 && (
                                  <ItemDeleteButton onClick={() => remove(index)}>
                                    <i className="icon-Delete" />
                                  </ItemDeleteButton>
                                )}
                              </ItemFreeMainContainer>
                            ))}
                          <div>
                            <AddNewButtonWrapper>
                              <span type="button"
                                onClick={() =>
                                  push({
                                    offerItem: "",
                                    quantity: 0,
                                    freeItem: [{ freeItemname: '' }],
                                  })
                                }>+<IntlMessage id="button.addNew" /></span>
                            </AddNewButtonWrapper>
                          </div>
                        </>
                      )}
                    </FieldArray>
                  </ItemFreeContainer>
                )}

                {selectedDiscount === "itemPriceDiscount" && (
                  <ItemPriceDiscount>
                    <FieldArray name="discountItemPrices">
                      {({ insert, remove, push }) => (
                        <>
                          {values?.discountItemPrices?.length > 0 &&
                            values?.discountItemPrices?.map((el, index) => (
                              <ItemFreeMainContainer
                                className="column"
                                key={index}
                              >
                                
                                <ItemPriceWrapper>
                                <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                                  <InputWrap
                                    dir={direction}
                                    style={{ width: "100%" }}
                                  >
                                    <section>
                                      <label><IntlMessage id="disFreeItems.itemOffer" /></label>
                                    </section>

                                    <Field
                                      name={`discountItemPrices.${index}.offerItemId`}
                                      component={DependentField}
                                      getChanges={() => function Close() { }}
                                      options={offerItemListing}
                                      getOptionLabel={(option) =>
                                        option ? option?.name : ""
                                      }
                                      renderInput={(params) => (
                                        <div
                                          ref={params.InputProps.ref}
                                          style={{ position: "relative" }}
                                        >
                                          <SelectInput
                                            placeholder="Menus"
                                            Dir={direction}
                                            type="text"
                                            {...params.inputProps}
                                          />
                                          <SelectIconDiscount
                                            className="icon-DropDownArrow"
                                            dir="ltr"
                                          />
                                        </div>
                                      )}
                                    />

                                  </InputWrap>
                                  {values?.discountItemPrices?.length > 1 && (
                                    <DeleteButton>
                                      <i
                                        className="icon-Delete"
                                        type="button"
                                        onClick={() => remove(index)}
                                      />
                                    </DeleteButton>
                                  )}
                                  </div>
                                  <InputWrap dir={direction}>
                                    <section>
                                      <label><IntlMessage id="disFreeItems.minimumQuantity" /></label>
                                    </section>

                                    <Button>
                                      <label
                                        onClick={() =>
                                          setFieldValue(
                                            `discountItemPrices.${index}.minimumQuantity`,
                                            el.minimumQuantity + 1
                                          )
                                        }
                                      >
                                        +
                                      </label>
                                      <p>{el.minimumQuantity}</p>
                                      {el.minimumQuantity > 0 ? (
                                        <label
                                          onClick={(e) =>
                                            setFieldValue(
                                              `discountItemPrices.${index}.minimumQuantity`,
                                              el.minimumQuantity - 1
                                            )
                                          }
                                        >
                                          -
                                        </label>
                                      ) : (
                                        <label>-</label>
                                      )}
                                    </Button>
                                  </InputWrap>
                                  
                                </ItemPriceWrapper>
                                <DiscountValue>

                                  <InputWrape dir={direction}>
                                    <section>
                                      <label><IntlMessage id="disFreeItems.discountedValue" /> %</label>
                                    </section>
                                    {/* <input name="discount" dir="ltr" type="number" placeholder="Discounted Value %" /> */}
                                    <Field
                                      dir="ltr"
                                      type="number"
                                      placeholder="Discounted Value %"
                                      name={`discountItemPrices.${index}.itemPriceDiscount`}
                                      component={InputField}
                                    />
                                  </InputWrape>
                                  </DiscountValue>
                              </ItemFreeMainContainer>
                            ))}
                          <AddNewButtonWrapper>
                            <strong onClick={() =>
                              push({
                                offerItemId: "",
                                minimumQuantity: 0,
                                itemPriceDiscount: 0
                              })
                            }>+<IntlMessage id="button.addNew" /></strong>
                          </AddNewButtonWrapper>
                        </>
                      )}
                    </FieldArray>
                  </ItemPriceDiscount>
                )}

                {selectedDiscount === "totalPriceDiscount" && (
                  <TotalPriceDiscount>
                    <header><IntlMessage id="disFreeItems.totalOrderdiscount" /></header>

                    <section style={{ marginTop: 10 }}>
                    <TotalMainWrpper>
                        <InputWrap dir={direction}>
                          <section>
                            <label><IntlMessage id="disFreeItems.minimumOrderAmount" /></label>
                          </section>
                          {/* <input dir="ltr" type="text" placeholder="Minimum Order Amount" /> */}
                          <Field
                            dir="ltr"
                            type="number"
                            placeholder="Minimum Order Amount"
                            name="minimum_order_amount"
                            component={InputField}
                          />
                        </InputWrap>

                        <InputWrap dir={direction}>
                          <section>
                            <label><IntlMessage id="disFreeItems.maximumOrderAmount" /></label>
                          </section>
                          {/* <input dir="ltr" type="text" placeholder="Maximum Order Amount" /> */}
                          <Field
                            dir="ltr"
                            type="number"
                            placeholder="Maximum Order Amount"
                            name="maximum_order_amount"
                            component={InputField}
                          />
                        </InputWrap>
                        </TotalMainWrpper>
                      <DiscountValue>
                        <InputWrape dir={direction}>
                          <section>
                            <label><IntlMessage id="disFreeItems.discountedValue" /> %</label>
                          </section>
                          {/* <input dir="ltr" type="number" placeholder="Discounted Value %" /> */}
                          <Field
                            dir="ltr"
                            type="number"
                            placeholder="Discounted Value %"
                            name="discount"
                            component={InputField}
                          />
                        </InputWrape>
                      </DiscountValue>
                    </section>
                  </TotalPriceDiscount>
                )}

                <InputWrap dir={direction}>
                  <section>
                    <label>Description / وصف</label>
                  </section>
                  {/* <textarea dir="ltr" type="text" placeholder="Description" /> */}
                  <Field
                    type="description"
                    name="description"
                    placeholder="Description"
                    component={TextArea}
                    dir="ltr"
                  />
                  <Field
                    type="description"
                    name="ar_description"
                    placeholder="Description"
                    component={TextArea}
                    dir="rtl"
                  />
                  {/* <textarea dir="rtl" type="text" placeholder="وصف" /> */}
                </InputWrap>

                <div style={{ textAlign: "center" }}>
                  <OrangeButton><IntlMessage id="button.SUBMIT" /></OrangeButton>
                </div>
              </Form>
            )}
          />
        )}
      </BoxContainer>
    </div>
  );
}

export const InputWrape = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  section {
    display: flex;
  }

  i {
    font-size: 18px;
  }

  label {
    // margin: 0 10px;
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
    padding: 0 20px;
    margin: 8px 0;
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
    margin: 8px 0;
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

  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: end;
    padding: 5px 0;
    cursor: pointer;
    color: #f55a2c;
  }

  strong {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    text-align: end;
    padding: 5px 0;
    cursor: pointer;
    color: #f55a2c;
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

  @media (max-width: 850px){
    input {
      width: 100%;
    }
  }
`;


export const TotalMainWrpper = styled.div`

display:flex;

@media (max-width: 850px){
  margin: 10px 0px 0px 0px;
  display:unset;
}

`;


export const DiscountValue = styled.div`

width:40%;
text-align:end;

@media (max-width:850px){
  width:100%;
  text-align:unset;

}

`;


export const ItemFreeMainContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 122px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 850px) {
    display: unset;
  }
`;

export const SelectIconDiscount = styled.i`
  position: absolute;
  top: 23px;
  right: ${({ dir }) => dir === "ltr" && "40px"};
  left: ${({ dir }) => dir === "rtl" && "40px"};
  font-size: 12px !important;
`;

export const AddNewButtonWrapper = styled.div`
font-family: "Montserrat";
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 12px;
// text-align: end;
padding: 0px 0px 5px 0px;
cursor: pointer;
color: #f55a2c;
`;

export const FreeItemDeleteButton = styled.div`
  width: 40px;
  height: 35px;
  background: #ffffff;
  // border: 1px solid #f55a2c;
  // box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-top: 25px;
  margin: 25px 0px 0 0px;

  i {
    font-size: 15px;
    color: #f55a2c;
  }
`;

export const AddNewButtonWrapperFreeItem = styled.div`
font-family: "Montserrat";
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 12px; 
// text-align: end;
padding: 0px 0px 10px 0px;
cursor: pointer;
color: #f55a2c;

@media (max-width: 850px){
  float:right;
  // float:${({ dir }) => dir === "rtl" ? "left" : "right"};  
  // float:${({ direction }) => direction === "rtl" ? "left" : "right"};  
  font-size: 10px;
line-height: 0px;
}
`;


export const AddNewButtonWrapperFreeIteme = styled.div`
font-family: "Montserrat";
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 12px; 
// text-align: end;
padding: 0px 0px 10px 0px;
cursor: pointer;
color: #f55a2c;

@media (max-width: 850px){
  float:left; 
  font-size: 10px;
  line-height: 0px;
}
`;