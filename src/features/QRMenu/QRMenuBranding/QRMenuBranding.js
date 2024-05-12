import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  BlackButton,
  BoxContainer,
  ButtonWrapper,
  LoadingWrapper,
  SubHeader,
} from "../../../style/Gobalstyle";
import { ColorPick } from "../../../Utils/Images";
import {
  BrandingContainer,
  BrandingInputWrap,
  HomePage,
  InputWrapText,
  Upload,
  WelcomePage,
} from "../QRStyle";
import * as yup from "yup";
import ColorPickerField from "../../../validation/ColorPickerField";
import TextArea from "../../../validation/TextArea";
import { useEffect } from "react";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import {
  brandingTheme,
  updateBrandingTheme,
  profileDeleteTheme
} from "../../../services/Collection";
import { useMemo } from "react";
import { CircularProgress, Switch } from "@mui/material";
import styled from "styled-components";
import {
  aqlutstorage,
  containerMenuBranding,
} from "../../../Utils/ContainerPath";
import { ProfileTransparentWrapper } from "../../Profile/Profilestyle";
import IntlMessage from "../../../Utils/IntlMessage";

export default function QRMenuBranding() {
  const direction = useSelector((state) => state.languageDirection.direction);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null)
  const qrMenuPermission = useSelector((state) => state.loginAuth.permissions.qr_menu);

  const changePhoto = (e) => {
    const [file] = e.target.files;
    setPreview(URL.createObjectURL(file));
    setFile(file)
  };

  

  const initialValues = useMemo(() => {
    if (theme) {
      
      return {
        displayImage: "true",
        webbackground: theme.webpage_background_color,
        webbuttonText: theme.welcome_button_text_color,
        webbuttonBackground: theme.welcome_button_bg_color,
        homebackground: theme.home_webpage_bg_color,
        hometext: theme.home_text_color,
        homepriceText: theme.home_price_text_color,
        homebuttonText: theme.home_button_text_color,
        homebuttonBackground: theme.home_button_bg_color,
        homeheading: theme.home_heading_text_color,
        description: theme.welcome_text,
        descriptionAr: theme.ar_welcome_text,
      };
    }
    return {
      displayImage: "",
      webbackground: "",
      webbuttonText: "",
      webbuttonBackground: "",
      homebackground: "",
      hometext: "",
      homepriceText: "",
      homebuttonText: "",
      homebuttonBackground: "",
      homeheading: "",
      description: "",
      descriptionAr: "",
    };
  }, [theme]);

  const EnRegex = "([a-zA-Z]s*)+";
  const ArRegex = "[\u0600-\u06FF]";

  // Yup is used for validation.
  let schema = yup.object().shape({
    webbackground: yup.string().required("Required"),
    webbuttonText: yup.string().required("Required"),
    webbuttonBackground: yup.string().required("Required"),
    homebackground: yup.string().required("Required"),
    hometext: yup.string().required("Required"),
    homepriceText: yup.string().required("Required"),
    homebuttonText: yup.string().required("Required"),
    homebuttonBackground: yup.string().required("Required"),
    homeheading: yup.string().required("Required"),
    description: yup
      .string()
      .matches(EnRegex, "Only English letters allow")
      .required("Required"),
    descriptionAr: yup
      .string()
      .matches(ArRegex, "Only Arabic letters allow")
      .required("Required"),
  });

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    setLoading(true);
    const fd = new FormData();
    fd.append("menu_branding_id", theme.id);
    fd.append("display_image_for_web_background", values.displayImage);
    fd.append("webpage_background_color", values.webbackground);
    fd.append("welcome_button_text_color", values.webbuttonText);
    fd.append("welcome_button_bg_color", values.webbuttonBackground);
    fd.append("welcome_text", values.description);
    fd.append("ar_welcome_text", values.descriptionAr);
    fd.append("home_webpage_bg_color", values.homebackground);
    fd.append("home_text_color", values.hometext);
    fd.append("home_price_text_color", values.homepriceText);
    fd.append("home_button_text_color", values.homebuttonText);
    fd.append("home_button_bg_color", values.homebuttonBackground);
    fd.append("home_heading_text_color", values.homeheading);
    if (file) {
      fd.append("displayimage", file, file?.name);
    }

    let res = await updateBrandingTheme(fd);
    if (res.status === 200) {
      setLoading(false);
      toast.info(res.message);
      getTheme();
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      setLoading(false);
      toast.error(message);
    }
  };
  

  const getTheme = async () => {
    setLoading(true);
    let res = await brandingTheme();
    if (res.status === 200) {
      setTheme(res.data);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTheme();
  }, []);


  const removeImage = async () => {
    setLoading(true);
    // const fd = new FormData();
    // fd.append("menu_branding_id", theme.id);
    // fd.append("display_image_for_web_background", null);
    // fd.append("webpage_background_color", theme.webpage_background_color);
    // fd.append("welcome_button_text_color", theme.welcome_button_text_color,);
    // fd.append("welcome_button_bg_color", theme.welcome_button_bg_color);
    // fd.append("welcome_text", theme.welcome_text);
    // fd.append("ar_welcome_text", theme.ar_welcome_text);
    // fd.append("home_webpage_bg_color", theme.home_webpage_bg_color);
    // fd.append("home_text_color", theme.home_text_color);
    // fd.append("home_price_text_color", theme.home_price_text_color);
    // fd.append("home_button_text_color", theme.home_button_text_color);
    // fd.append("home_button_bg_color", theme.home_button_bg_color);
    // fd.append("home_heading_text_color", theme.home_heading_text_color);
    // if (file) {
    //   fd.append("displayimage", file, file?.name);
    // }

   const req = {
      menu_branding_id:theme.id
    }

    let res = await profileDeleteTheme(req);
    if (res.status === 200) {
      setLoading(false);
      toast.info(res.message);
      window.location.reload();
      getTheme();
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      setLoading(false);
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <LoadingWrapper>
        <CircularProgress sx={{ color: "#f55a2c" }} />
      </LoadingWrapper>
    );
  }

  return (
    <div>
      {!qrMenuPermission &&
        <ProfileTransparentWrapper />
      }
      <SubHeader>
        <p><IntlMessage id="qrMenu.qrMenuBranding.Heading"/></p>
      </SubHeader>

      <BoxContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
          render={({ values, setFieldValue }) => (
            <Form>
              <BrandingContainer>
                <WelcomePage>
                  <header><IntlMessage id="qrMenu.qrMenuBranding.welcomePage"/></header>
                  <section>
                    <BrandingInputWrap dir={direction}>
                      <label><IntlMessage id="qrMenu.qrMenuBranding.displayImage"/></label>
                    </BrandingInputWrap>
                    <div style={{ margin: "10px 0" }}>
                      {qrMenuPermission &&
                        <Switch
                          name="displayImage"
                          value="true"
                          checked={values.displayImage === "true"}
                          onChange={(event, checked) => {
                            setFieldValue(
                              "displayImage",
                              checked ? "true" : "false"
                            );
                          }}
                        />
                      }
                    </div>
                  </section>

                  <section>
                    <Upload>
                      <input
                        type="file"
                        accept=".jpg , .png"
                        onChange={(e) => changePhoto(e)}
                      />

                      {preview ? (
                        <img src={preview} alt="Profile" />
                      ) : theme?.display_image ? (
                        <>
                          <img
                            src={
                              `${aqlutstorage}` +
                              `${containerMenuBranding}` +
                              `${theme?.display_image}`
                            }
                            alt=""
                          />
                        </>
                      ) : (
                        <>
                          <i className="icon-Upload" />
                          <span><IntlMessage id="qrMenu.qrMenuBranding.uploadImg"/></span>
                        </>
                      )}
                    </Upload>
                    {
                      qrMenuPermission &&
                      <>
                        <WhiteButtonchange>
                          <input
                            type="file"
                            accept=".jpg , .png"
                            onChange={(e) => changePhoto(e)}
                          />
                          <IntlMessage id="button.change"/>
                        </WhiteButtonchange>
                        <OrangeButtonRemove onClick={() => removeImage()}>
                        <IntlMessage id="button.remove"/>
                        </OrangeButtonRemove>
                      </>
                    }
                  </section>

                  <section>
                    <BrandingInputWrap dir={direction}>
                      <label><IntlMessage id="qrMenu.qrMenuBranding.webBackColor"/></label>
                      <section>
                        <span>{values.webbackground}</span>
                        <Field
                          dir="ltr"
                          type="color"
                          name="webbackground"
                          component={ColorPickerField}
                          // getHexCode={getHexCode}
                          className="Field"
                        />
                        <img src={ColorPick} alt="color" />
                      </section>
                    </BrandingInputWrap>
                  </section>

                  <section>
                    <BrandingInputWrap dir={direction}>
                      <label><IntlMessage id="qrMenu.qrMenuBranding.welButtonTextColor"/></label>
                      <section>
                        <span>{values.webbuttonText}</span>
                        <Field
                          dir="ltr"
                          type="color"
                          name="webbuttonText"
                          component={ColorPickerField}
                          // // getHexCode={getHexCode}
                          className="Field"
                        />

                        <img src={ColorPick} alt="color" />
                      </section>
                    </BrandingInputWrap>
                  </section>

                  <section>
                    <BrandingInputWrap dir={direction}>
                      <label><IntlMessage id="qrMenu.qrMenuBranding.welButtonBackgroundColor"/></label>
                      <section>
                        <span>{values.webbuttonBackground}</span>
                        <Field
                          dir="ltr"
                          type="color"
                          name="webbuttonBackground"
                          component={ColorPickerField}
                          // getHexCode={getHexCode}
                          className="Field"
                        />
                        <img src={ColorPick} alt="color" />
                      </section>
                    </BrandingInputWrap>
                  </section>

                  <InputWrapText dir={direction}>
                    <section>
                      <label><IntlMessage id="qrMenu.qrMenuBranding.welText"/></label>
                    </section>

                    <Field
                      dir="ltr"
                      type="description"
                      name="description"
                      placeholder="Welcome Text"
                      component={TextArea}
                    />

                    <Field
                      dir="rtl"
                      type="description"
                      name="descriptionAr"
                      placeholder="Welcome Text"
                      component={TextArea}
                    />
                  </InputWrapText>
                </WelcomePage>

                <HomePage>
                  <header><IntlMessage id="qrMenu.qrMenuBranding.homePage"/></header>

                  <section>
                    <BrandingInputWrap dir={direction}>
                      <label><IntlMessage id="qrMenu.qrMenuBranding.webBackColor"/></label>
                      <section>
                        <span>{values.homebackground}</span>
                        <Field
                          dir="ltr"
                          type="color"
                          name="homebackground"
                          component={ColorPickerField}
                          // // getHexCode={getHexCodeHome}
                          className="Field"
                        />
                        <img src={ColorPick} alt="color" />
                      </section>
                    </BrandingInputWrap>
                  </section>

                  <section>
                    <BrandingInputWrap dir={direction}>
                      <label><IntlMessage id="qrMenu.qrMenuBranding.textColor"/></label>
                      <section>
                        <span>{values.hometext}</span>
                        <Field
                          dir="ltr"
                          type="color"
                          name="hometext"
                          component={ColorPickerField}
                          // // getHexCode={getHexCodeHome}
                          className="Field"
                        />
                        <img src={ColorPick} alt="color" />
                      </section>
                    </BrandingInputWrap>
                  </section>

                  <section>
                    <BrandingInputWrap dir={direction}>
                      <label><IntlMessage id="qrMenu.qrMenuBranding.priceTextColor"/></label>
                      <section>
                        <span>{values.homepriceText}</span>
                        <Field
                          dir="ltr"
                          type="color"
                          name="homepriceText"
                          component={ColorPickerField}
                          // // getHexCode={getHexCodeHome}
                          className="Field"
                        />
                        <img src={ColorPick} alt="color" />
                      </section>
                    </BrandingInputWrap>
                  </section>

                  <section>
                    <BrandingInputWrap dir={direction}>
                      <label><IntlMessage id="qrMenu.qrMenuBranding.homeButtonTextColor"/></label>
                      <section>
                        <span>{values.homebuttonText}</span>
                        <Field
                          dir="ltr"
                          type="color"
                          name="homebuttonText"
                          component={ColorPickerField}
                          // // getHexCode={getHexCodeHome}
                          className="Field"
                        />
                        <img src={ColorPick} alt="color" />
                      </section>
                    </BrandingInputWrap>
                  </section>

                  <section>
                    <BrandingInputWrap dir={direction}>
                      <label><IntlMessage id="qrMenu.qrMenuBranding.homeButtonBackGroundColor"/></label>
                      <section>
                        <span>{values.homebuttonBackground}</span>
                        <Field
                          dir="ltr"
                          type="color"
                          name="homebuttonBackground"
                          component={ColorPickerField}
                          // // getHexCode={getHexCodeHome}
                          className="Field"
                        />
                        <img src={ColorPick} alt="color" />
                      </section>
                    </BrandingInputWrap>
                  </section>

                  <section>
                    <BrandingInputWrap dir={direction}>
                      <label><IntlMessage id="qrMenu.qrMenuBranding.headingTextColor"/></label>
                      <section>
                        <span>{values.homeheading}</span>
                        <Field
                          dir="ltr"
                          type="color"
                          name="homeheading"
                          component={ColorPickerField}
                          // getHexCode={getHexCodeHome}
                          className="Field"
                        />
                        <img src={ColorPick} alt="color" />
                      </section>
                    </BrandingInputWrap>
                  </section>
                </HomePage>
              </BrandingContainer>
              <ButtonWrapper>
                {qrMenuPermission &&
                  <BlackButton type="submit"><IntlMessage id="button.generate"/></BlackButton>
                }
              </ButtonWrapper>
            </Form>
          )}
        ></Formik>
      </BoxContainer>
    </div>
  );
}

export const WhiteButtonchange = styled.button`
  background: #ffffff;
  border: 1px solid #f55a2c;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #f55a2c;
  padding: 10px 14px;
  margin: 5px 0px;
  cursor: pointer;
  position: relative;

  input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }

  @media (max-width: 620px) {
    padding: 10px 10px;
    margin: 5px 0px;

  }
`;

export const OrangeButtonRemove = styled.span`
  background: #f55a2c;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  padding: 10px 14px;
  margin: 5px 10px;
  cursor: pointer;
  @media (max-width: 620px) {
    padding: 10px 10px;
    margin: 5px 20px;

  }
`;
