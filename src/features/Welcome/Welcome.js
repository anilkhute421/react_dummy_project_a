import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AglutLogo } from "../../Utils/Images";
import {
  WelcomeBox,
  WelcomeWrapper,
  BoxContent,
  LogoWrapper,
} from "./WelcomeStyle";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import * as yup from "yup";
import { dashboardDirection } from "../../layout/Dashboard/DashboardStore";

export default function Welcome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Yup is used for validation.
  let schema = yup.object().shape({
    email: yup.string().email().required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  });

  // This function is called to submit the form.
  const [lang, SelectLang] = useState("");

  function submit() {
    setLoading(true);
    if (lang === "en") {
      let obj = {
        language: lang,
        direction: "ltr",
      };
      dispatch(dashboardDirection(obj));
    } else if (lang == "ar") {
      let obj = {
        language: lang,
        direction: "rtl",
      };
      dispatch(dashboardDirection(obj));
    }
    setLoading(false);
    navigate(`/login`);
  }

  return (
    <WelcomeWrapper>
      <section>
        <WelcomeBox>
          <LogoWrapper>
            <img src={AglutLogo} alt="AGLUT LOGO" />
          </LogoWrapper>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={schema}
            // onSubmit={handleSubmit}
          >
            <Form>
              <BoxContent>
                <header>Welcome to Aqlut</header>
                <p>
                  Lorem Ipsum is simply dummy text of th printing and
                  typesetting industry.
                </p>
                <div>
                  <label>Language</label>
                  <select
                    onChange={(e) => SelectLang(e.target.value || null)}
                    value={lang || ""}
                  >
                    {/* <option selected="true" disabled hidden></option> */}
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>

                {loading ? (
                  <CircularProgress />
                ) : (
                  <button onClick={submit}>CONTINUE</button>
                )}
              </BoxContent>
            </Form>
          </Formik>
        </WelcomeBox>
      </section>
    </WelcomeWrapper>
  );
}
