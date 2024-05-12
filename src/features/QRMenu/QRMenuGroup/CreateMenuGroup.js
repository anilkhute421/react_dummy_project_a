import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { BlackButtonMobile, Cancel, OrangeButton } from "../../../style/Gobalstyle";
import { CreateQRWrapper, InputWrap } from "../QRStyle";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import InputField from "../../../validation/InputField";
import { createMenuGroups } from "../../../services/Collection";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import * as yup from "yup";
import { CircularProgress } from "@mui/material";
import { BoxContent } from "../../Menu/MenuStyle";
import IntlMessage from "../../../Utils/IntlMessage";

export default function CreateMenuGroup({ open, handleClose, fetchData }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const direction = useSelector((state) => state.languageDirection.direction);
  const [loading, setLoading] = useState(false);
  const [selectGroup, setSelectGroup] = useState("1");




  const EnRegex = "([a-zA-Z]s*)+";
  const ArRegex = "[\u0600-\u06FF]";

  // Yup is used for validation.
  let schema = yup.object().shape({
    groupname: yup.string().matches(EnRegex, "Only English letters allow").required("Please enter group name"),
    groupnameAr: yup.string().matches(ArRegex, "Only Arabic letters allow").required("Please enter group name ar"),
  });

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    setLoading(true);
    let req = {
      group_type: selectGroup,
      group_name: values.groupname,
      ar_group_name: values.groupnameAr,
    };

    let res = await createMenuGroups(req);

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
        aria-labelledby="responsive-dialog-title"
      >
        <Cancel onClick={handleClose} dir={direction}>
          <i className="icon-CloseCross" />
        </Cancel>

        <CreateQRWrapper>
        <BoxContent>

          <header><IntlMessage id="qrMenu.qrMenuGroups.createMenuGroups.Heading"/></header>

          <InputWrap dir={direction}>
            <section>
              <label><IntlMessage id="qrMenu.qrMenuGroups.groupType"/></label>
            </section>
          </InputWrap>
          <SelectGroup>
            <div>
              <input
                type="radio"
                value="1"
                name="GroupType"
                checked
                onChange={(e) => setSelectGroup(e.target.value)}
              />
              <label><IntlMessage id="qrMenu.qrMenuGroups.createMenuGroups.dineIn"/></label>
            </div>
            <div>
              <input
                type="radio"
                value="2"
                name="GroupType"
                onChange={(e) => setSelectGroup(e.target.value)}
              />
              <label><IntlMessage id="qrMenu.qrMenuGroups.createMenuGroups.Takeaway"/></label>
            </div>
          </SelectGroup>

          <Formik
            initialValues={{
              groupname: "",
              groupnameAr: "",
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            <Form>
              <InputWrap dir={direction}>
                <section>
                  <label>Group Name / أسم المجموعة</label>
                </section>
                <Field
                  dir="ltr"
                  type="text"
                  name="groupname"
                  placeholder="Group Name"
                  component={InputField}
                />

                <Field
                  dir="rtl"
                  type="text"
                  name="groupnameAr"
                  placeholder="أسم المجموعة"
                  component={InputField}
                />
              </InputWrap>

              <div style={{ textAlign: "center" }}>
                {loading ? (
                  <CircularProgress sx={{ color: "#f55a2c" }} />
                ) : (
                  <>
                  <BlackButtonMobile onClick={() => handleClose()}>
                  <IntlMessage id="button.close"/>
                    </BlackButtonMobile>
                    <OrangeButton type="submit"><IntlMessage id="button.SUBMIT"/></OrangeButton>
                  </>
                )}
              </div>
            </Form>
          </Formik>
          </BoxContent>
        </CreateQRWrapper>
      </Dialog>
    </div>
  );
}

const SelectGroup = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    margin: 0 20px;
  }
  label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    letter-spacing: 0.05em;
    margin: 20px 5px;
    color: #000000;
  }

  input {
    width: 20px;
    height: 20px;
  }
`;
