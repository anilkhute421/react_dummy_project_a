import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  BoxContent,
  CreateWrapper,
  InputPageWrapper,
  InputWrap,
  MiddleContent,
  SelectInput,
  Upload,
} from "../MenuStyle";
import {
  BlackButtonMobile,
  Cancel,
  OrangeButton,
  RemoveImage,
  SelectIcon,
} from "../../../style/Gobalstyle";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import InputField from "../../../validation/InputField";
import { useSelector } from "react-redux";
import { DependentField } from "../../../validation/DependentField";
import { createMenuSection, menuListing } from "../../../services/Collection";
import TextArea from "../../../validation/TextArea";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { CircularProgress } from "@mui/material";
import IntlMessage from "../../../Utils/IntlMessage";

export default function CreateSection({ open, handleClose, getAllsection }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const direction = useSelector((state) => state.languageDirection.direction);

  

  const [menusList, setMenusList] = useState([]);
  // const [selectedMenu, setSelectedMenu] = useState(null);

  const changePhoto = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const EnRegex = "([a-zA-Z]s*)+";
  const ArRegex = "[\u0600-\u06FF]";
  // Yup is used for validation.
  let schema = yup.object().shape({
    name: yup
      .string()
      .matches(EnRegex, "Only English letters allow")
      .required("Please enter menu name"),
    nameAr: yup
      .string()
      .matches(ArRegex, "Only Arabic letters allow")
      .required("Please enter menu name"),
    menus: yup.object().required("required"),
    // menusAr: yup.object().required("required"),
    // sortOrderID: yup.number().required("required"),
    description: yup
      .string()
      .matches(EnRegex, "Only English letters allow")
      .required("Please enter menu description"),
    descriptionAr: yup
      .string()
      .matches(ArRegex, "Only Arabic letters allow")
      .required("Please enter menu description"),
  });

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    setLoading(true);
    var fd = new FormData();
    fd.append("menu_id", values.menus.id);
    fd.append("section_name", values.name);
    fd.append("ar_section_name", values.nameAr);
    fd.append("desc", values.description);
    fd.append("ar_desc", values.descriptionAr);
    if (image) {
      fd.append("image", image, image?.name);
    }

    let res = await createMenuSection(fd);
    if (res.status === 200) {
      setLoading(false);
      handleClose();
      getAllsection();
      toast.info(res.message);
    } else {
      handleClose();
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const getAllMenus = async () => {
    let res = await menuListing();
    if (res.status === 200) {
      setMenusList(res.data);
    } else {
      // const message = getErrorMessage(res, "Failed to connection");
      // toast.error(message);
    }
  };

  useEffect(() => {
    getAllMenus();
  }, []);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <Cancel onClick={handleClose} dir={direction}>
          <i className="icon-CloseCross" />
        </Cancel>
        <CreateWrapper>
          <Formik
            initialValues={{
              name: "",
              nameAr: "",
              menus: "",
              // menusAr: "",
              // sortOrderID: "",
              description: "",
              descriptionAr: "",
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            <Form>
              <BoxContent>
                <MiddleContent>
                  <header><IntlMessage id="Menu.createSection.Heading"/></header>
                  <Upload>
                    {preview ? (
                      <>
                        <img src={preview} alt="Profile" />

                        <RemoveImage>
                          <i className="icon-Cross" />
                          <input
                            type="file"
                            accept=".jpg , .png"
                            onChange={(e) => changePhoto(e?.target?.files[0])}
                          />
                        </RemoveImage>
                      </>
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
                </MiddleContent>

                <InputPageWrapper>
                  <InputWrap dir="ltr">
                    <section>
                      <label>Name</label>
                    </section>

                    <Field
                      type="text"
                      name="name"
                      placeholder="Name"
                      component={InputField}
                    />
                  </InputWrap>

                  <InputWrap dir="rtl">
                    <section>
                      <label> اسم</label>
                    </section>

                    <Field
                      type="text"
                      name="nameAr"
                      placeholder="اسم"
                      component={InputField}
                    />
                  </InputWrap>

                  <InputWrap dir="ltr">
                    <section>
                      <label>Menus</label>
                    </section>

                    <Field
                      name="menus"
                      component={DependentField}
                      getChanges={() => function Close() {}}
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
                          <SelectIcon
                            className="icon-DropDownArrow"
                            dir="ltr"
                          />
                        </div>
                      )}
                    />
                  </InputWrap>

                  <InputWrap dir="rtl">
                    <section>
                      <label> القوائم</label>
                    </section>
                    <Field
                      name="menus"
                      component={DependentField}
                      getChanges={() => function Close() {}}
                      options={menusList}
                      getOptionLabel={(option) =>
                        option ? option.ar_name : ""
                      }
                      renderInput={(params) => (
                        <div
                          ref={params.InputProps.ref}
                          style={{ position: "relative" }}
                        >
                          <SelectInput
                            placeholder="القوائم"
                            Dir={direction}
                            type="text"
                            {...params.inputProps}
                          />

                          <SelectIcon
                            className="icon-DropDownArrow"
                            dir="rtl"
                          />
                        </div>
                      )}
                    />
                  </InputWrap>

                  {/* <InputWrap dir="ltr">
                    <section>
                      <label>Sort Order ID</label>
                    </section>
                    <Field
                      type="number"
                      name="sortOrderID"
                      placeholder="Sort Order ID"
                      component={InputField}
                    />
                  </InputWrap>

                  <div></div> */}

                  <InputWrap dir="ltr">
                    <section>
                      <label>Description</label>
                    </section>

                    <Field
                      type="description"
                      name="description"
                      placeholder="Description"
                      component={TextArea}
                    />
                  </InputWrap>

                  <InputWrap dir="rtl">
                    <section>
                      <label> وصف</label>
                    </section>

                    <Field
                      type="description"
                      name="descriptionAr"
                      placeholder="وصف"
                      component={TextArea}
                    />
                  </InputWrap>
                </InputPageWrapper>
              </BoxContent>
              <MiddleContent style={{ marginTop: "20px" }}>
                {loading ? (
                  <CircularProgress sx={{ color: "#f55a2c" }} />
                ) : (
                  <div style={{ display: "flex" }}>
                    <BlackButtonMobile onClick={() => handleClose()}>
                    <IntlMessage id="button.close"/>
                    </BlackButtonMobile>
                    <OrangeButton type="submit"><IntlMessage id="button.SUBMIT"/></OrangeButton>
                  </div>
                )}
              </MiddleContent>
            </Form>
          </Formik>
        </CreateWrapper>
      </Dialog>
    </div>
  );
}
