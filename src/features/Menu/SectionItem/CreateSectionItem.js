import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  BlackButton,
  BoxContainer,
  LoadingWrapper,
  OrangeButton,
  SelectIcon,
  SubHeader,
  WhiteButton,
} from "../../../style/Gobalstyle";
import {
  ForLabelOnly,
  InnerLeftWrapper,
  InnerWrapper,
  InputPageLeftWrapper,
  InputPageRightWrapper,
  InputPageWrapper,
  InputPriceBoxWrapper,
  MiddleContent,
  OptionSetWrap,
  OptionSetWrapAddOrder,
  PriceBox,
  PriceContainer,
  PriceInnerBox,
  SelectInput,
  UpdateImageSection,
  Upload,
} from "../MenuStyle";
import InputField from "../../../validation/InputField";
import { DependentField } from "../../../validation/DependentField";
import { useSelector } from "react-redux";
import TextArea from "../../../validation/TextArea";
import { CircularProgress, Switch, TextField } from "@mui/material";
import { CustomMultiSelect } from "../../../validation/CustomMultiSelect";
import * as yup from "yup";
import {
  createRestaurentSectionItem,
  existingSectionMenusListing,
  getAllergiesList,
  optionListing,
  sectionByMenu,
  sectionItemListing,
} from "../../../services/Collection";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import IntlMessage from "../../../Utils/IntlMessage";

export default function CreateSectionItem() {
  const [menusList, setMenusList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [modifierGroupList, setModifierGroupList] = useState([]);
  const [allergiesList, setAllergiesList] = useState([]);
  const [recommendedItemsList, setRecommendedItemsList] = useState([]);
  const [selectedMenuforSection, setSelectedMenuforSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [multiItemPrice, setMultiItemPrice] = useState(false);

  const direction = useSelector((state) => state.languageDirection.direction);
  const navigate = useNavigate();

  const changePhoto = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    setPreview(null);
    setImage(null);
  };

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
    sections: yup.object().required("Required"),
    menus: yup.object().required("Required"),
    recommendeditem: yup.array().required("Required"),
    allergies: yup.array().required("Required"),
    description: yup
      .string()
      .matches(EnRegex, "Only English letters allow")
      .required("Please enter description"),
    description_ar: yup
      .string()
      .matches(ArRegex, "Only Arabic letters allow")
      .required("Please enter descriptionAR"),

    item_price: yup.array().of(
      yup.object().shape({
        // priceName: yup.boolean().when("show", {
        //   is: true,
        //   then: yup.string().required("Please enter price name"),
        // }),
        priceName: yup.string().optional("Please enter name"),
        price_ar_name: yup.string().optional("Please enter name"),
        price: yup
          .number()
          // .matches("([0-9]s*)+", "Only number is allowed")
          .required("Please enter price")
          .moreThan(3, "Must be grater than 3"),
        calories: yup.string().optional(),
      })
    ),

    optionSets: yup.array().of(
      yup.object().shape({
        modifiergroup: yup.object().optional("Required"),
        max: yup.string().optional("Required"),
        min: yup.string().optional("Required"),
        required: yup.object().optional("Required"),
      })
    ),
  });

  // This function is called to submit the form.

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    setLoading(true);
    let newAllergies = [];

    values.allergies.map((el) =>
      newAllergies.push({
        name: el.name,
        id: el.id,
      })
    );
    let newOptionSets = [];
    values.optionSets.map((el) =>
      newOptionSets.push({
        option_group_id: el.modifiergroup.id,
        max: el.max,
        min: el.min,
        required: el.required.name === "Yes" ? 1 : 0,
      })
    );

    const fd = new FormData();
    fd.append("menuId", values.menus.id);
    fd.append("sectionId", values.sections.id);
    fd.append("name", values.name);
    fd.append("ar_name", values.ar_name);
    fd.append("desc", values.description);
    fd.append("ar_desc", values.description_ar);
    fd.append("mark_section_as_new", values.markNewSection === "Y" ? 1 : 0);
    fd.append("mark_section_as_signature", values.signature === "Y" ? 1 : 0);
    fd.append("status", 1);
    fd.append("allergies", JSON.stringify(newAllergies));
    fd.append("recommended_item", JSON.stringify(values.recommendeditem));
    fd.append("item_price", JSON.stringify(values.item_price));
    fd.append("optionSets", JSON.stringify(newOptionSets));
    fd.append("is_price_multiple", JSON.stringify(multiItemPrice));
    if (image) {
      fd.append("image", image, image?.name);
    }

    let res = await createRestaurentSectionItem(fd);
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

  const getChanges = (name, value) => {
    setSelectedMenuforSection(value);
  };

  const getAllMenus = async () => {
    let res = await existingSectionMenusListing();
    if (res.status === 200) {
      setMenusList(res.data);
    } else {
      // const message = getErrorMessage(res, "Failed to connection");
      // toast.error(message);
    }
  };

  const getSections = async () => {
    let res = await sectionByMenu(selectedMenuforSection.id);
    if (res.status === 200) {
      setSectionList(res.data);
    }
  };

  const fetchData = async () => {
    let res = await optionListing();
    if (res.status === 200) {
      setModifierGroupList(res.data);
    }
  };

  const getAllergies = async () => {
    let res = await getAllergiesList();
    if (res.status === 200) {
      setAllergiesList(res.data);
    }
  };

  const getRecommendedItems = async () => {
    let req = {
      pageNumber : 0 , perPage : 0
    }
    let res = await sectionItemListing(req);
    if (res.status === 200) {
      setRecommendedItemsList(res.data);
    }
  };

  //Runs only on the first render

  useEffect(() => {
    if (selectedMenuforSection) {
      getSections();
    }
  }, [selectedMenuforSection]);

  useEffect(() => {
    getAllMenus();
    fetchData();
    getAllergies();
    getRecommendedItems();
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
        <p><IntlMessage id="Menu.createItem.Heading" /></p>
      </SubHeader>

      <BoxContainer>
        <Formik
          initialValues={{
            name: "",
            ar_name: "",
            sections: "",
            menus: "",
            markNewSection: "N",
            signature: "N",
            description: "",
            description_ar: "",
            recommendeditem: [],
            allergies: [],
            item_price: [
              {
                priceName: "",
                price_ar_name: "",
                price: "",
                calories: "",
              },
            ],
            optionSets: [
              // {
              //   modifiergroup: "",
              //   max: "",
              //   min: "",
              //   required: "",
              // },
            ],
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
          render={({ values, setFieldValue }) => (
            <Form>
              <UpdateImageSection>
                <Upload>
                  {preview ? (
                    <img src={preview} alt="Profile" />
                  ) : (
                    <>
                      <input
                        type="file"
                        accept=".jpg , .png"
                        onChange={(e) => changePhoto(e?.target?.files[0])}
                      />
                      <i className="icon-Upload" />
                    </>
                  )}
                </Upload>
                <div>
                  <WhiteButton>
                    <input
                      type="file"
                      accept=".jpg , .png"
                      onChange={(e) => changePhoto(e?.target?.files[0])}
                    />
                    <IntlMessage id="button.CHANGEPHOTO" />
                  </WhiteButton>
                  <OrangeButton onClick={removePhoto}>
                  <IntlMessage id="button.REMOVEPHOTO" />
                  </OrangeButton>
                </div>
              </UpdateImageSection>

              <InputPageWrapper>
                <InputWrap>
                  <section>
                    <label><IntlMessage id="Menu.sectionItem.Name" /></label>
                  </section>

                  <Field
                    dir="ltr"
                    type="text"
                    placeholder="Name"
                    name="name"
                    component={InputField}
                  />
                  <Field
                    dir="rtl"
                    type="text"
                    placeholder="اسم"
                    name="ar_name"
                    component={InputField}
                  />
                </InputWrap>

                <OptionSetWrapAddOrder>
                  <p><IntlMessage id="Menu.sectionItem.Menus" /></p>
                  <Field
                    name="menus"
                    component={DependentField}
                    getChanges={getChanges}
                    options={menusList}
                    getOptionLabel={(option) => (option ? option?.name : "")}
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

                        <SelectIcon className="icon-DropDownArrow" dir="ltr" />
                      </div>
                    )}
                  />
                </OptionSetWrapAddOrder>
              </InputPageWrapper>
              <InnerWrapper>
                <InputPageLeftWrapper>
                  <InnerLeftWrapper>
                    <OptionSetWrapAddOrder style={{ marginTop: "20px" }}>
                      <div>
                        <p><IntlMessage id="Menu.sectionItem.Section" /></p>
                        <Field
                          name="sections"
                          component={DependentField}
                          getChanges={() => function Close() {}}
                          options={sectionList}
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
                                Dir={direction}
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
                    </OptionSetWrapAddOrder>

                    <InputWrap>
                      <section>
                        <label>Description / وصف </label>
                      </section>

                      <Field
                        dir="ltr"
                        type="description"
                        name="description"
                        placeholder="Description"
                        component={TextArea}
                      />

                      <Field
                        dir="rtl"
                        type="description"
                        name="description_ar"
                        placeholder="وصف"
                        component={TextArea}
                      />
                    </InputWrap>

                    <div>
                      <InputWrap style={{ marginBottom: "10px" }}>
                        <section>
                          <label><IntlMessage id="Menu.createItem.markSectionNew" /></label>
                        </section>
                      </InputWrap>
                      <Switch
                        name="markNewSection"
                        value="Y"
                        checked={values.markNewSection === "Y"}
                        onChange={(event, checked) => {
                          setFieldValue("markNewSection", checked ? "Y" : "N");
                        }}
                      />
                    </div>

                    <ForLabelOnly>
                      <div>
                        <p><IntlMessage id="Menu.createItem.recommandedItems" /></p>

                        <Field
                          name="recommendeditem"
                          component={CustomMultiSelect}
                          multiple
                          options={recommendedItemsList}
                          getOptionLabel={(option) =>
                            option ? option?.name : ""
                          }
                          renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                              <TextField
                                // className="mobileResponsive"
                                style={{ width: "90%" }}
                                type="text"
                                {...params}
                              />
                            </div>
                          )}
                        />
                      </div>
                    </ForLabelOnly>
                  </InnerLeftWrapper>
                </InputPageLeftWrapper>
                <InputPageRightWrapper>
                  <PriceContainer>
                    <InputWrap>
                      <label>Price / سعر</label>
                      <label style={{ display: "flex" }}>
                        <h6><IntlMessage id="addMultiple" /></h6>
                        <input
                          type="checkbox"
                          style={checkboxStyle}
                          value={multiItemPrice}
                          onChange={(e) => setMultiItemPrice(e.target.checked)}
                        />
                      </label>
                    </InputWrap>
                    <PriceBox>
                      <FieldArray name="item_price">
                        {({ insert, remove, push }) => (
                          <div>
                            {values?.item_price?.length > 0 &&
                              values?.item_price?.map((el, index) => (
                                <div className="row" key={index}>
                                  <PriceInnerBox>
                                    <InputPriceBoxWrapper>
                                      {multiItemPrice && (
                                        <InputWrap>
                                          <section>
                                            <label>Name</label>
                                          </section>
                                          <Field
                                            dir="ltr"
                                            type="text"
                                            placeholder="Name"
                                            name={`item_price.${index}.priceName`}
                                            component={InputField}
                                          />
                                        </InputWrap>
                                      )}
                                      <InputWrap>
                                        <section>
                                          <label><IntlMessage id="Menu.sectionItem.Price" /></label>
                                        </section>
                                        <Field
                                          dir="ltr"
                                          type="text"
                                          placeholder="Price"
                                          name={`item_price.${index}.price`}
                                          component={InputField}
                                        />
                                      </InputWrap>

                                      <InputWrap>
                                        <section>
                                          <label><IntlMessage id="Menu.createItem.Calories" /></label>
                                        </section>
                                        <Field
                                          dir="ltr"
                                          type="text"
                                          placeholder="Calories"
                                          name={`item_price.${index}.calories`}
                                          component={InputField}
                                        />
                                      </InputWrap>

                                      {multiItemPrice && (
                                        <InputWrap>
                                          <section>
                                            <label>اسم</label>
                                          </section>

                                          <Field
                                            dir="rtl"
                                            type="text"
                                            placeholder="اسم"
                                            name={`item_price.${index}.price_ar_name`}
                                            component={InputField}
                                          />
                                        </InputWrap>
                                      )}

                                      {/* <InputWrap>
                                        <section>
                                          <label>سعر</label>
                                        </section>

                                        <Field
                                          dir="rtl"
                                          type="text"
                                          placeholder="سعر"
                                          name={`item_price.${index}.price`}
                                          component={InputField}
                                        />
                                      </InputWrap>

                                      <InputWrap>
                                        <section>
                                          <label>سعرات حراريه</label>
                                        </section>

                                        <Field
                                          dir="rtl"
                                          type="text"
                                          placeholder="سعرات حراريه"
                                          name={`item_price.${index}.calories`}
                                          component={InputField}
                                        />
                                      </InputWrap> */}

                                      {values?.item_price?.length > 1 && (
                                        <OrangeButton
                                          style={{
                                            height: "42px",
                                            marginTop: "28px",
                                          }}
                                          type="button"
                                          className="secondary"
                                          onClick={() => remove(index)}
                                        >
                                          <IntlMessage id="button.remove" />
                                        </OrangeButton>
                                      )}
                                    </InputPriceBoxWrapper>
                                  </PriceInnerBox>
                                </div>
                              ))}

                            {multiItemPrice && (
                              <span type="button" onClick={() => push({})}>
                                +<IntlMessage id="Menu.createItem.AddMore" />
                              </span>
                            )}
                          </div>
                        )}
                      </FieldArray>
                    </PriceBox>
                  </PriceContainer>

                  <ForLabelOnly>
                    <div>
                      <p><IntlMessage id="Menu.createItem.Allergies" /></p>

                      <Field
                        name="allergies"
                        component={CustomMultiSelect}
                        multiple
                        options={allergiesList}
                        getOptionLabel={(option) =>
                          option ? option?.name : ""
                        }
                        renderInput={(params) => (
                          <div ref={params.InputProps.ref}>
                            <TextField
                              style={{ width: "90%" }}
                              type="text"
                              {...params}
                            />
                          </div>
                        )}
                      />
                    </div>
                  </ForLabelOnly>

                  <div style={{ marginTop: "10px" }}>
                    <InputWrap style={{ marginBottom: "10px" }}>
                      <section>
                        <label><IntlMessage id="Menu.createItem.markSectionsign" /></label>
                      </section>
                    </InputWrap>

                    <Switch
                      name="signature"
                      value="Y"
                      checked={values.signature === "Y"}
                      onChange={(event, checked) => {
                        setFieldValue("signature", checked ? "Y" : "N");
                      }}
                    />
                  </div>
                </InputPageRightWrapper>
              </InnerWrapper>

              <OptionSetWrap style={{ margin: "80px 0 0 0" }}>
                <header><IntlMessage id="Menu.fastFood.optionSets" /></header>
                <FieldArray name="optionSets">
                  {({ insert, remove, push }) => (
                    <div>
                      {values?.optionSets?.length > 0 &&
                        values?.optionSets?.map((el, index) => (
                          <div className="row" key={index}>
                            <div style={{ margin: "20px 0 0 0" }}>
                              <section>
                                <div>
                                  <p><IntlMessage id="Menu.createItem.modifierGroup" /></p>
                                  <Field
                                    name={`optionSets.${index}.modifiergroup`}
                                    component={DependentField}
                                    getChanges={() => function Close() {}}
                                    options={modifierGroupList}
                                    getOptionLabel={(option) =>
                                      option ? option?.name : ""
                                    }
                                    renderInput={(params) => (
                                      <div ref={params.InputProps.ref}>
                                        <SelectInput
                                          style={{ margin: 0 }}
                                          placeholder="ModifierGroup"
                                          Dir={direction}
                                          type="text"
                                          {...params.inputProps}
                                        />
                                      </div>
                                    )}
                                  />
                                </div>
                                <div>
                                  <p><IntlMessage id="Menu.createItem.Max" /></p>

                                  <Field
                                    dir="ltr"
                                    type="number"
                                    placeholder="Max"
                                    name={`optionSets.${index}.max`}
                                    component={InputField}
                                  />
                                </div>

                                <div>
                                  <p><IntlMessage id="Menu.createItem.Min" /></p>
                                  <Field
                                    dir="ltr"
                                    type="number"
                                    placeholder="Min"
                                    name={`optionSets.${index}.min`}
                                    component={InputField}
                                  />
                                </div>

                                <div>
                                  <p><IntlMessage id="Menu.createItem.Required" /></p>
                                  <Field
                                    name={`optionSets.${index}.required`}
                                    component={DependentField}
                                    getChanges={() => function Close() {}}
                                    options={[{ name: "Yes" }, { name: "No" }]}
                                    getOptionLabel={(option) =>
                                      option ? option?.name : ""
                                    }
                                    renderInput={(params) => (
                                      <div ref={params.InputProps.ref}>
                                        <SelectInput
                                          style={{ margin: 0 }}
                                          placeholder="Required"
                                          Dir={direction}
                                          type="text"
                                          {...params.inputProps}
                                        />
                                      </div>
                                    )}
                                  />
                                </div>

                                <div>
                                  <p><IntlMessage id="Menu.createItem.Action" /></p>
                                  <div className="iconWrapper">
                                    <i
                                      className="icon-Delete"
                                      type="button"
                                      onClick={() => remove(index)}
                                    />
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        ))}

                      <span
                        type="button"
                        onClick={() =>
                          push({
                            modifiergroup: "",
                            max: "",
                            min: "",
                            required: "",
                          })
                        }
                      >
                        +<IntlMessage id="Menu.createItem.addOptionSet" />
                      </span>
                    </div>
                  )}
                </FieldArray>
              </OptionSetWrap>
              <MiddleContent style={{ marginTop: "20px" }}>
                <BlackButton><IntlMessage id="button.CREATE" /></BlackButton>
              </MiddleContent>
            </Form>
          )}
        />
      </BoxContainer>
    </div>
  );
}

export const InputWrap = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;

  @media (max-width: 599px) {
    width: 100%;
  }

  i {
    font-size: 18px;
  }

  label {
    margin: 0 0px;
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
    margin: 5px 0 0 0;
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
    margin: 8px 0 0 0;
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
`;

const checkboxStyle = {
  width: "15px",
  height: "15px",
  accentColor: "#f55a2c",
  margin: "0 10px",
};
