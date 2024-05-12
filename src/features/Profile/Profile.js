import React, { useEffect, useMemo, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "../../app/Auth/ChangePassword/ChangePassword";
import {
  BlackButton,
  LoadingWrapper,
  OrangeButton,
  OrangeButtonSpan,
  SelectIcon,
  SubHeader,
  WhiteButton,
} from "../../style/Gobalstyle";
import IntlMessage from "../../Utils/IntlMessage";
import {
  BoxContainer,
  InnerBoxContainer,
  InnerLeftWrapper,
  InputPageLeftWrapper,
  InputPageRightWrapper,
  InputPageRightWrapperMobile,
  InputPageWrapper,
  InputWrap,
  LeftSection,
  ProfilePicturesWrapper,
  ProfileTransparentWrapper,
  ProfileWrapper,
  RightSection,
  WeekInput,
  WeekSelect,
} from "./Profilestyle";
import * as yup from "yup";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box } from "@mui/system";
import PhoneInput from "react-phone-input-2";
import InputField from "../../validation/InputField";
import { DependentField } from "../../validation/DependentField";
import { SelectInput } from "../Menu/MenuStyle";
import { CircularProgress, Switch } from "@mui/material";
import TextArea from "../../validation/TextArea";
import { getErrorMessage } from "../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import {
  changeProfileImage,
  getCurrencyList,
  getTimeZoneList,
  profileDetails,
  updateProfile,
  updateRestaurantTiming,
} from "../../services/Collection";
import { aqlutstorage, containerProfile } from "../../Utils/ContainerPath";
import { profileUpdated } from "./ProfileStore";
import moment from "moment";

export default function Profile() {
  const direction = useSelector((state) => state.languageDirection.direction);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [restaurentTiming, setRestaurentTiming] = useState(null);
  const [allCurrency, setAllCurrency] = useState([]);
  const [timeZoneListing, setTimeZoneListing] = useState([]);
  const dispatch = useDispatch();

  //userPermissionDecide.
  const profilePermission = useSelector(
    (state) => state.loginAuth?.permissions?.profile
  );

  const [openTiming, setOpenTiming] = useState({
    Sunday: null,
    Monday: null,
    Tuesday: null,
    Wednesday: null,
    Thursday: null,
    Friday: null,
    Saturday: null,
  });

  const [closeTiming, setCloseTiming] = useState({
    sunday: null,
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
  });

  const [disableOpeningTimes, setDisableOpeningTimes] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });
  const [disableOrderSwitch, setDisableOrderSwitch] = useState(false);


  const getChangeOpenTiming = async (
    name,
    newValue,
    prevObject,
    checkboxStatus
  ) => {
    let NewMintues = new Date(newValue.toString()).getMinutes();
    let PrevMintuesForOpen = new Date(
      prevObject?.open_time?.toString()
    ).getMinutes();

    let PrevOpenTiming = moment(new Date(prevObject?.open_time)).format("LT");
    let NewOpenTiming = moment(new Date(newValue)).format("LT");

    if (name === "open") {
      let onlyTime = new Date(newValue?._d);

      if (NewOpenTiming !== PrevOpenTiming) {
        if (NewMintues !== PrevMintuesForOpen) {
          let HourMintuesSecond = moment(onlyTime).format("HH:mm:ss");

          let req = {
            day: prevObject.day,
            operation_hours_id: prevObject.id,
            open_time: HourMintuesSecond,
            close_time: prevObject.close_time,
            status: checkboxStatus ? 1 : 0,
          };
          let res = await updateRestaurantTiming(req);
          if (res.status === 200) {
            setLoading(false);
            toast.success(res.message);
            getProfileDetails();
          } else {
            const message = getErrorMessage(res, "Failed to connection");
            toast.error(message);
            setLoading(false);
          }
        }
      }
    }

    if (name === "close") {
      let onlyTime = new Date(newValue?._d);
      let HourMintuesSecond = moment(onlyTime).format("HH:mm:ss");

      if (HourMintuesSecond !== prevObject?.close_time) {
        let req = {
          day: prevObject.day,
          operation_hours_id: prevObject.id,
          open_time: prevObject.open_time,
          close_time: HourMintuesSecond,
          status: checkboxStatus ? 1 : 0,
        };
        let res = await updateRestaurantTiming(req);
        if (res.status === 200) {
          setLoading(false);
          toast.success(res.message);
          getProfileDetails();
        } else {
          const message = getErrorMessage(res, "Failed to connection");
          toast.error(message);
          setLoading(false);
        }
      }
    }

    if (checkboxStatus !== undefined) {
      let req = {
        day: newValue.day,
        operation_hours_id: newValue.id,
        open_time: newValue.open_time,
        close_time: newValue.close_time,
        status: checkboxStatus ? "1" : "0",
      };
      let res = await updateRestaurantTiming(req);
      if (res.status === 200) {
        setLoading(false);
        toast.success(res.message);
        getProfileDetails();
      } else {
        const message = getErrorMessage(res, "Failed to connection");
        toast.error(message);
        setLoading(false);
      }
    }
  };

  const changePhoto = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    ChangeProfileImage(file);
    getProfileDetails();
  };

  const initialValues = useMemo(() => {
    let currencyobject = {
      id: 1,
      currency_name: details?.currency,
      createdAt: "2022-09-15T07:27:19.000Z",
      updatedAt: "2022-09-15T07:27:19.000Z",
    };
    let timeZoneObject = { name: details?.timezone };

    if (details) {
      return {
        disableOrders: details.disable_order,
        restaurantName: details.name,
        restaurantNameAr: details.ar_name,
        currency: currencyobject,
        mail: details.email,
        vat: details.vat,
        serviceCharge: details.service_charge,
        address: details.address,
        timeZone: timeZoneObject,
        restaurent_phones: details.RestaurentPhones,
        Whatsapp: details.whats_app_notification,
        restaurantBio: details.restaurent_bio,
        restaurantBioAr: details.ar_restaurent_bio,
      };
    } else {
      return {
        disableOrders: "",
        restaurantName: "",
        restaurantNameAr: "",
        currency: "",
        mail: "",
        vat: "",
        serviceCharge: "",
        address: "",
        timeZone: "",
        restaurent_phones: [{ country_code: "", phone_number: "" }],

        Whatsapp: "",
        restaurantBio: "",
        restaurantBioAr: "",
      };
    }
  }, [details]);

  const EnRegex = "([a-zA-Z]s*)+";
  const ArRegex = "[\u0600-\u06FF]";
  const Numbers = "([0-9]s*)+";

  let schema = yup.object().shape({
    restaurantName: yup
      .string()
      .matches(EnRegex, "Only English letters allow")
      .required("Please enter name"),
    restaurantNameAr: yup
      .string()
      .matches(ArRegex, "Only Arabic letters allow")
      .required("Please enter name"),

    phoneNumber: yup.array().of(
      yup.object().shape({
        phone: yup.number().required("Please enter name"),
      })
    ),

    currency: yup.object().required("required"),
    mail: yup.string().email("Invaild format").required("required"),
    vat: yup
      .string()
      .matches(Numbers, "Only number allow")
      .required("required"),
    serviceCharge: yup
      .string()
      .matches(Numbers, "Only number allow")
      .required("required"),
    timeZone: yup.object().required("required"),

    restaurantBio: yup
      .string()
      .matches(EnRegex, "Only English letters allow")
      .required("Please enter restaurant Bio"),
    restaurantBioAr: yup
      .string()
      .matches(ArRegex, "Only English letters allow")
      .required("Please enter restaurant BioArb"),
  });

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    setLoading(true);

    let req = {
      name: values.restaurantName,
      ar_name: values.restaurantNameAr,
      email: values.mail,
      address: values.address,
      state: null,
      street: null,
      country: null,
      restaurent_phones: values.restaurent_phones,
      latitude: 0,
      longitude: 0,
      timezone: values.timeZone.name,
      restaurent_bio: values.restaurantBio,
      ar_restaurent_bio: values.restaurantBioAr,
      currency: values.currency.currency_name,
      vat: values.vat,
      service_charge: values.serviceCharge,
      whats_app_notification: values.Whatsapp,
      // payment_enable: true,
      disable_order: values.disableOrders,
      // subscription_status: true,
      // pos_integration_status: true,
      // pos_name: values,
    };
    let res = await updateProfile(req);
    if (res.status === 200) {
      setLoading(false);
      dispatch(profileUpdated(req));
      toast.success(res.message);
      getProfileDetails();
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };


  const disableOrders = async (checked) => {
    setLoading(true);
    setDisableOrderSwitch(checked);
    let req = {
      disable_order: checked,
    };
    let res = await updateProfile(req);
    if (res.status === 200) {
      setLoading(false);
      dispatch(profileUpdated(req));
      toast.success(res.message);
      getProfileDetails();
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const ChangeProfileImage = async (file) => {
    setLoading(true);
    const fd = new FormData();
    fd.append("image", file, file?.name);

    let res = await changeProfileImage(fd);
    if (res.status === 200) {
      setDetails(res.data);
      toast.info(res.message, { theme: "colored" });
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const getProfileDetails = async () => {
    setLoading(true);

    let res = await profileDetails();
    if (res.status === 200) {
      setDetails(res.data);
      setRestaurentTiming(res.data.RestaurentOperationalHours);
      dispatch(profileUpdated(res.data));
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const getAllCurrency = async () => {
    let res = await getCurrencyList();
    if (res.status === 200) {
      setAllCurrency(res.data);
    }
  };

  const getTimeZone = async () => {
    let res = await getTimeZoneList();
    if (res.status === 200) {
      setTimeZoneListing(res.data);
    }
  };

  useEffect(() => {
    getProfileDetails();
    getAllCurrency();
    getTimeZone();
  }, []);

  if (loading) {
    return (
      <LoadingWrapper>
        <CircularProgress sx={{ color: "#f55a2c" }} />
      </LoadingWrapper>
    );
  }

  return (
    <ProfileWrapper>
      {!profilePermission && <ProfileTransparentWrapper />}
      {profilePermission && openChangePassword && (
        <ChangePassword
          open={openChangePassword}
          handleClose={() => setOpenChangePassword(false)}
        />
      )}
      <SubHeader>
        <p>
          <IntlMessage id="sidebar.profile" />
        </p>
        {profilePermission && (
          <OrangeButton onClick={() => setOpenChangePassword(true)}>
            <IntlMessage id="button.CHANGEPASSWORD" />
          </OrangeButton>
        )}
      </SubHeader>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        render={({ values, setFieldValue }) => (
          <Form>
            <>
              <BoxContainer>
                <InnerBoxContainer>
                  <LeftSection>
                    <ProfilePicturesWrapper>
                      {preview ? (
                        <img src={preview} alt="Profile" />
                      ) : details?.logo ? (
                        <>
                          <img
                            src={
                              `${aqlutstorage}` +
                              `${containerProfile}` +
                              `${details?.logo}`
                            }
                            alt=""
                          />
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
                    </ProfilePicturesWrapper>
                    {profilePermission && (
                      <div>
                        <WhiteButton>
                          <input
                            type="file"
                            accept=".jpg , .png"
                            onChange={(e) => changePhoto(e?.target?.files[0])}
                          />
                          <IntlMessage id="button.CHANGEPHOTO" />
                        </WhiteButton>
                        <OrangeButtonSpan onClick={() => setPreview(null)}>
                        <IntlMessage id="button.REMOVEPHOTO" />
                        </OrangeButtonSpan>
                      </div>
                    )}
                  </LeftSection>
                  <RightSection>
                    <section>
                      <p><IntlMessage id="profileSection.disableOrders" /></p>
                      <Switch
                        name="disableOrders"
                        // value="Y"
                        checked={disableOrderSwitch}
                        onChange={(event, checked) => {
                          disableOrders(checked);
                          // setFieldValue(
                          //   "disableOrders",
                          //   checked ? true : false
                          // );
                        }}
                      />
                    </section>
                  </RightSection>
                </InnerBoxContainer>
              </BoxContainer>

              <BoxContainer>
                <InputPageWrapper>
                  <InputWrap dir={direction}>
                    <section>
                      <i className="icon-Shop" />
                      <label>Restaurant Name/اسم المطعم</label>
                    </section>

                    <Field
                      dir="ltr"
                      type="text"
                      placeholder="Restaurant Name"
                      name="restaurantName"
                      component={InputField}
                    />
                    <Field
                      dir="rtl"
                      type="text"
                      placeholder="اسم المطعم"
                      name="restaurantNameAr"
                      component={InputField}
                    />
                  </InputWrap>

                  <InputWrap dir={direction}>
                    <section>
                      <i className="icon-Dollor" />
                      <label><IntlMessage id="profileSection.currency" /></label>
                    </section>

                    <Field
                      name="currency"
                      component={DependentField}
                      getChanges={() => function noFun() {}}
                      options={allCurrency}
                      getOptionLabel={(option) =>
                        option ? option?.currency_name : ""
                      }
                      renderInput={(params) => (
                        <div
                          ref={params.InputProps.ref}
                          style={{ position: "relative" }}
                        >
                          <SelectInput
                            placeholder="Currency"
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
                  <InputWrap dir={direction}>
                    <section>
                      <i className="icon-Message" />
                      <label><IntlMessage id="profileSection.mailAddress" /></label>
                    </section>
                    <Field
                      dir="ltr"
                      type="text"
                      placeholder="Mail"
                      name="mail"
                      component={InputField}
                    />
                  </InputWrap>
                  <InputPageWrapper>
                    <InputWrap dir={direction}>
                      <section>
                        <i className="icon-Vat" />
                        <label><IntlMessage id="profileSection.vat" />%</label>
                      </section>

                      <Field
                        dir="ltr"
                        type="text"
                        placeholder="VAT"
                        name="vat"
                        component={InputField}
                      />
                    </InputWrap>

                    <InputWrap dir={direction}>
                      <section>
                        <i style={{ width: "18px" }} />
                        <label><IntlMessage id="profileSection.serviceCharge" /> %</label>
                      </section>

                      <Field
                        dir="ltr"
                        type="text"
                        placeholder="Service Charge"
                        name="serviceCharge"
                        component={InputField}
                      />
                    </InputWrap>
                  </InputPageWrapper>

                  <InputPageLeftWrapper>
                    <InnerLeftWrapper>
                      <InputWrap dir={direction}>
                        <section>
                          <i className="icon-Address" />
                          <label><IntlMessage id="profileSection.address" /> </label>
                        </section>

                        <Field
                          dir="ltr"
                          type="text"
                          placeholder="Address"
                          name="address"
                          component={InputField}
                        />
                      </InputWrap>

                      <InputWrap dir={direction}>
                        <section>
                          <section>
                            <i className="icon-TimeZone" />
                            <label><IntlMessage id="profileSection.timeZone" /> </label>
                          </section>
                        </section>
                        <Field
                          name="timeZone"
                          component={DependentField}
                          getChanges={() => function noFun() {}}
                          options={timeZoneListing}
                          getOptionLabel={(option) =>
                            option ? option?.name : ""
                          }
                          renderInput={(params) => (
                            <div
                              ref={params.InputProps.ref}
                              style={{ position: "relative" }}
                            >
                              <SelectInput
                                placeholder="Time Zone"
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

                      <InputWrap dir={direction}>
                        <section>
                          <i className="icon-PhoneNumber" />
                          <label><IntlMessage id="profileSection.phoneNumber" /> </label>
                        </section>

                        <FieldArray name="restaurent_phones">
                          {({ insert, remove, push }) => (
                            <div>
                              {values?.restaurent_phones?.length > 0 &&
                                values?.restaurent_phones?.map((el, index) => (
                                  <div className="row" key={index}>
                                    <PhoneInput
                                      country={"qa"}
                                      value={el.country_code + el.phone_number}
                                      onChange={(value, data) => {
                                        setFieldValue(
                                          `restaurent_phones.${index}.country_code`,
                                          "+" + data.dialCode
                                        );
                                        setFieldValue(
                                          `restaurent_phones.${index}.phone_number`,
                                          value.substring(
                                            data.dialCode.length,
                                            20
                                          )
                                        );
                                      }}
                                      containerStyle={{
                                        width: "100%",
                                        height: "42px",
                                        background: "#fcfdfe",
                                        border: "1px solid #f0f1f7",
                                        borderRadius: "8px",
                                        margin: "8px 25px 0 25px",
                                      }}
                                      inputStyle={{
                                        border: "none",
                                        width: "100%",
                                        height: "40px",
                                      }}
                                      placeholder="Phone Number"
                                    />

                                    {values?.restaurent_phones?.length > 1 && (
                                      <OrangeButton
                                        style={{
                                          height: "35px",
                                          marginTop: "7px",
                                          fontSize: "10px",
                                          padding: "0px 14px",
                                          margin: "5px 22px",
                                        }}
                                        type="button"
                                        className="secondary"
                                        onClick={() => remove(index)}
                                      >
                                        <IntlMessage id="button.remove" /> 
                                      </OrangeButton>
                                    )}
                                  </div>
                                ))}

                              {values?.restaurent_phones?.length === 3
                                ? ""
                                : true && (
                                    <span
                                      style={{
                                        float: "right",
                                        margin: "0px -21px",
                                      }}
                                      type="button"
                                      onClick={() =>
                                        push({
                                          country_code: "",
                                          phone_number: "",
                                        })
                                      }
                                    >
                                      +<IntlMessage id="Menu.createItem.AddMore" />  
                                    </span>
                                  )}
                            </div>
                          )}
                        </FieldArray>
                      </InputWrap>

                      <section>
                        <InputWrap dir={direction}>
                          <section>
                            <i className="icon-WhatsApp" />
                            <label><IntlMessage id="profileSection.whatsappNotifications" /> </label>
                          </section>
                        </InputWrap>
                        <div style={{ margin: "5px 0 0 28px" }}>
                          <Switch
                            // name="disableOrders"
                            // // value="Y"
                            // checked={values.disableOrders}
                            // onChange={(event, checked) => {

                            name="Whatsapp"
                            checked={values.Whatsapp}
                            onChange={(event, checked) => {
                              setFieldValue("Whatsapp", checked ? true : false);
                            }}
                          />
                        </div>
                      </section>

                      <InputWrap dir={direction}>
                        <section>
                          <i className="icon-Bio" />
                          <label>Restaurant Bio / مطعم بيو</label>
                        </section>

                        <Field
                          dir="ltr"
                          type="text"
                          name="restaurantBio"
                          placeholder="Restaurant Bio"
                          component={TextArea}
                        />

                        <Field
                          dir="rtl"
                          type="text"
                          name="restaurantBioAr"
                          placeholder=" مطعم بيو<"
                          component={TextArea}
                        />
                      </InputWrap>
                    </InnerLeftWrapper>
                  </InputPageLeftWrapper>
                  <InputPageRightWrapper>
                    <InputWrap dir={direction}>
                      <section>
                        <i className="icon-OpeningTime" />
                        <label><IntlMessage id="profileSection.openingTimes" /></label>
                      </section>
                    </InputWrap>
                    <WeekSelect>
                      {restaurentTiming?.map((el) => (
                        <WeekInput
                          dir={direction}
                          disable={disableOpeningTimes.sunday}
                        >
                          <label>{el.day}</label>

                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <TimePicker
                              label="Basic example"
                              value={`Sat Jan 01 2022 ${el?.open_time}`}
                              onChange={() => {}}
                              onAccept={(newValue) => {
                                getChangeOpenTiming("open", newValue, el);
                              }}
                              renderInput={({
                                inputRef,
                                inputProps,
                                InputProps,
                              }) => (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    position: "relative",
                                  }}
                                >
                                  <input
                                    ref={inputRef}
                                    {...inputProps}
                                    readOnly
                                    className="textInput"
                                    type="text"
                                    placeholder="Open time"
                                  />

                                  {disableOpeningTimes.sunday ? (
                                    <div style={{ width: "8px" }} />
                                  ) : (
                                    <>{InputProps?.endAdornment}</>
                                  )}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>

                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <TimePicker
                              label="Basic example"
                              value={`Sat Jan 01 2022 ${el?.close_time}`}
                              onChange={() => {}}
                              onAccept={(newValue) =>
                                getChangeOpenTiming("close", newValue, el)
                              }
                              // ampm={false}
                              renderInput={({
                                inputRef,
                                inputProps,
                                InputProps,
                              }) => (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    position: "relative",
                                  }}
                                >
                                  <input
                                    ref={inputRef}
                                    {...inputProps}
                                    readOnly
                                    className="textInput"
                                    type="text"
                                    placeholder="Close time"
                                  />
                                  {disableOpeningTimes.sunday ? (
                                    <div style={{ width: "8px" }} />
                                  ) : (
                                    <div>{InputProps?.endAdornment}</div>
                                  )}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>

                          <input
                            className="checkInput"
                            type="checkbox"
                            name={el.day}
                            // value={el.status}
                            checked={el.status === "1" && "checked"}
                            onClick={(e) =>
                              getChangeOpenTiming(
                                null,
                                el,
                                null,
                                e.target.checked
                              )
                            }
                          />
                          <span><IntlMessage id="button.close" /></span>
                        </WeekInput>
                      ))}
                    </WeekSelect>
                  </InputPageRightWrapper>
                </InputPageWrapper>

                <InputPageRightWrapperMobile>
                  <InputWrap dir={direction}>
                    <section>
                      <i className="icon-OpeningTime" />
                      <label><IntlMessage id="profileSection.openingTimes" /></label>
                    </section>
                  </InputWrap>
                  <WeekSelect>
                    {restaurentTiming?.map((el) => (
                      <WeekInput
                        dir={direction}
                        disable={disableOpeningTimes.sunday}
                      >
                        <label>{el.day}</label>

                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <TimePicker
                            label="Basic example"
                            value={`Sat Jan 01 2022 ${el?.open_time}`}
                            onChange={() => {}}
                            onAccept={(newValue) => {
                              getChangeOpenTiming("open", newValue, el);
                            }}
                            renderInput={({
                              inputRef,
                              inputProps,
                              InputProps,
                            }) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  position: "relative",
                                }}
                              >
                                <input
                                  ref={inputRef}
                                  {...inputProps}
                                  readOnly
                                  className="textInput"
                                  type="text"
                                  placeholder="Open time"
                                />

                                {disableOpeningTimes.sunday ? (
                                  <div style={{ width: "8px" }} />
                                ) : (
                                  <>{InputProps?.endAdornment}</>
                                )}
                              </Box>
                            )}
                          />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <TimePicker
                            label="Basic example"
                            value={`Sat Jan 01 2022 ${el?.close_time}`}
                            onChange={() => {}}
                            onAccept={(newValue) =>
                              getChangeOpenTiming("close", newValue, el)
                            }
                            renderInput={({
                              inputRef,
                              inputProps,
                              InputProps,
                            }) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  position: "relative",
                                }}
                              >
                                <input
                                  ref={inputRef}
                                  {...inputProps}
                                  readOnly
                                  className="textInput"
                                  type="text"
                                  placeholder="Close time"
                                />
                                {disableOpeningTimes.sunday ? (
                                  <div style={{ width: "8px" }} />
                                ) : (
                                  <div>{InputProps?.endAdornment}</div>
                                )}
                              </Box>
                            )}
                          />
                        </LocalizationProvider>

                        <input
                          className="checkInput"
                          type="checkbox"
                          name={el.day}
                          // value={el.status}
                          checked={el.status === "1" && "checked"}
                          onClick={(e) =>
                            getChangeOpenTiming(
                              null,
                              el,
                              null,
                              e.target.checked
                            )
                          }
                        />
                        <span><IntlMessage id="button.close" /></span>
                      </WeekInput>
                    ))}
                  </WeekSelect>
                </InputPageRightWrapperMobile>

                {profilePermission && (
                  <div style={{ textAlign: "center", margin: "20px 0" }}>
                    <BlackButton type="submit"><IntlMessage id="button.UPDATE" /></BlackButton>
                  </div>
                )}
              </BoxContainer>
            </>
          </Form>
        )}
      />
    </ProfileWrapper>
  );
}
