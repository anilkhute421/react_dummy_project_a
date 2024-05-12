import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  BlackButtonMobile,
  Cancel,
  OrangeButton,
  RemoveImage,
} from "../../../style/Gobalstyle";
import {
  BoxContent,
  CreateWrapper,
  InputPageWrapper,
  InputWrap,
  MiddleContent,
  Upload,
} from "../MenuStyle";
import { Field, Form, Formik } from "formik";
import InputField from "../../../validation/InputField";
import TextArea from "../../../validation/TextArea";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { createMenu } from "../../../services/Collection";
import * as yup from "yup";
import { useSelector } from "react-redux";
import IntlMessage from "../../../Utils/IntlMessage";



export default function CreateMenu({ open, handleClose, fetchData }) {
  const direction = useSelector((state) => state.languageDirection.direction);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
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
    اسم: yup
      .string()
      .matches(ArRegex, "Only Arabic letters allow")
      .required("Please enter menu name"),
    description: yup
      .string()
      .matches(EnRegex, "Only English letters allow")
      .required("Please enter menu description"),
    وصف: yup
      .string()
      .matches(ArRegex, "Only Arabic letters allow")
      .required("Please enter menu description"),
  });

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    setLoading(true);
    var fd = new FormData();
    fd.append("name", values.name);
    fd.append("ar_name", values.اسم);
    fd.append("desc", values.description);
    fd.append("ar_desc", values.وصف);
    if (image) {
      fd.append("image", image, image?.name);
    }

    let res = await createMenu(fd);
    if (res.status === 200) {
      setLoading(false);
      handleClose();
      fetchData();
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
              اسم: "",
              description: "",
              وصف: "",
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <BoxContent>
                  <MiddleContent>
                    <header><IntlMessage id="Menu.createMenu.Heading"/></header>
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
                        type="name"
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
                        type="اسم"
                        name="اسم"
                        placeholder=" اسم"
                        component={InputField}
                      />
                    </InputWrap>

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
                        type="وصف"
                        name="وصف"
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
              </div>
            </Form>
          </Formik>
        </CreateWrapper>
      </Dialog>
    </div>
  );
}
