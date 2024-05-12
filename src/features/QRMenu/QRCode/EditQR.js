import React, { useEffect, useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import {
  BlackButtonMobile,
  Cancel,
  LoadingWrapper,
  OrangeButton,
} from "../../../style/Gobalstyle";
import { CreateQRWrapper, InputWrap } from "../QRStyle";
import { QRCode } from "react-qrcode-logo";
import { AglutLogo } from "../../../Utils/Images";
import { Field, Form, Formik } from "formik";
import InputField from "../../../validation/InputField";
import * as yup from "yup";
import { DependentField } from "../../../validation/DependentField";

import {
  editQrCode,
  listingMenuGroups,
  viewQrCode,
  getQrGroupListing,
} from "../../../services/Collection";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { SelectInput } from "../../Menu/MenuStyle";
import IntlMessage from "../../../Utils/IntlMessage";

export default function EditQR({ open, handleClose, payload, fetchData }) {
  const [menuGroupData, setMenuGroupData] = useState([]);
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const direction = useSelector((state) => state.languageDirection.direction);

  const initialValues = useMemo(() => {
    if (detailData) {
      return {
        qrCodeName: detailData?.name,
        qrCodeNameAr: detailData?.ar_name,
        menuGroup: detailData?.QrCodeGroup,
      };
    }

    return {
      qrCodeName: "",
      qrCodeNameAr: "",
      menuGroup: "",
    };
  }, [detailData]);

  const EnRegex = "([a-zA-Z]s*)+";
  const ArRegex = "[\u0600-\u06FF]";

  // Yup is used for validation.
  let schema = yup.object().shape({
    qrCodeName: yup
      .string()
      .matches(EnRegex, "Only English letters allow")
      .required("Reqiured"),
    qrCodeNameAr: yup
      .string()
      .matches(ArRegex, "Only Arabic letters allow")
      .required("Reqiured"),
    menuGroup: yup.object().required("Reqiured"),
  });

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    setLoading(true);

    let req = {
      qr_code_id: payload.id,
      qr_code_group_id: values.menuGroup.id,
      name: values.qrCodeName,
      ar_name: values.qrCodeNameAr,
      // qr_code_image: "string",
    };

    let res = await editQrCode(req);
    if (res.status === 200) {
      setDetailData(res.data);
      setLoading(false);
      handleClose();
      toast.info(res.message);
      fetchData();
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const getAllQrGroup = async () => {
    let res = await getQrGroupListing("1");
    if (res.status === 200) {
      setMenuGroupData(res.data);
    }
  };

  useEffect(() => {
    getAllQrGroup();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDetails = async () => {
    setLoading(true);
    let res = await viewQrCode(payload.id);
    if (res.status === 200) {
      setDetailData(res.data);
      setLoading(false);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  const generateQR = () => {
    getDetails();
    // setLoading(false);
  };

  useEffect(() => {
    getDetails();
    // getMenuGroups();
  }, []);

  if (loading && !detailData) {
    return (
      <Dialog
        fullScreen={fullScreen}
        open={true}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Cancel onClick={handleClose} dir={direction}>
          <i className="icon-CloseCross" />
        </Cancel>

        <LoadingWrapper style={{ minWidth: "413px" }}>
          <CircularProgress sx={{ color: "#f55a2c" }} />
        </LoadingWrapper>
      </Dialog>
    );
  }
  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Cancel onClick={handleClose} dir={direction}>
        <i className="icon-CloseCross" />
      </Cancel>

      <CreateQRWrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <Form>
            <header>
              <IntlMessage id="qrMenu.qRCodes.editQrCode.Heading" />
            </header>

            <InputWrap dir={direction}>
              <section>
                <label>QR Code Name / اسم رمز الاستجابة السريعة </label>
              </section>

              <Field
                dir="ltr"
                type="text"
                name="qrCodeName"
                placeholder="QR Code Name"
                component={InputField}
              />

              <Field
                dir="rtl"
                type="text"
                name="qrCodeNameAr"
                placeholder="سم رمز الاستجابة السريعة "
                component={InputField}
              />
            </InputWrap>

            <InputWrap dir={direction}>
              <section>
                <label>
                  <IntlMessage id="qrMenu.qRCodes.createQrCode.menuGroup" />
                </label>
              </section>
              <Field
                name="menuGroup"
                component={DependentField}
                options={menuGroupData}
                getOptionLabel={(option) => (option ? option?.group_name : "")}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <SelectInput
                      placeholder="Menu Group"
                      Dir={direction}
                      type="text"
                      r
                      {...params.inputProps}
                    />
                  </div>
                )}
              />
            </InputWrap>

            <p onClick={generateQR} style={{ cursor: "pointer" }}>
              <IntlMessage id="qrMenu.qRCodes.editQrCode.regenrateQr" />
            </p>

            <h4>
              <IntlMessage id="qrMenu.qRCodes.createQrCode.autoGen" />
            </h4>

            {!loading ? (
              <QRCode
                value={"https://aqlutuserfrontend.azurewebsites.net/"}
                logoImage={AglutLogo}
                padding={0}
                size={200}
                removeQrCodeBehindLogo={true}
                // qrStyle="dots"
                logoOpacity={0.7}
                logoWidth={20}
              />
            ) : (
              <LoadingWrapper>
                <CircularProgress sx={{ color: "#f55a2c" }} />
              </LoadingWrapper>
            )}

            {/* <button onClick={getImage} >Take</button> */}
            <div style={{ textAlign: "center" }}>
              <BlackButtonMobile onClick={() => handleClose()}>
                <IntlMessage id="button.close" />
              </BlackButtonMobile>
              <OrangeButton type="submit">
                <IntlMessage id="button.SUBMIT" />
              </OrangeButton>
            </div>
          </Form>
        </Formik>
      </CreateQRWrapper>
    </Dialog>
  );
}
