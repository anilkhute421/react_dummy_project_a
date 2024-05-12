import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AglutLogo } from "../../../Utils/Images";
import { AuthBox, AuthWrapper, BoxContent, LogoWrapper } from "./Loginstyle";
import { Field, Form, Formik } from "formik";
import InputField from "../../../validation/InputField";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./LoginStore";
import { loginApi } from "../../../services/Authapi";
import { getErrorMessage } from "../../../Utils/ErrorMessage";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import * as yup from "yup";
import styled from "styled-components";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");


  // Yup is used for validation.
  let schema = yup.object().shape({
    email: yup.string().email().required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  });

  //password show and hide function.
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  // This function is called to submit the form.
  const handleSubmit = async (values) => {
    setLoading(true);
    let res = await loginApi(values);
    if (res.status === 200) {
      dispatch(loginSuccess(res.data));
      setLoading(false);
      toast.success(res.message);
    } else {
      const message = getErrorMessage(res, "Failed to connection");
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <section>
        <AuthBox>
          <LogoWrapper>
            <img src={AglutLogo} alt="AGLUT LOGO" />
          </LogoWrapper>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            <Form>
              <BoxContent>
                <header>Login to your account</header>
                <div>
                  <label>Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    component={InputField}
                  />
                </div>

                <div style={{ position: "relative" }}>
                  <label>Password</label>
                  <Field
                    type={passwordType}
                    name="password"
                    placeholder="Password"
                    component={InputField}
                  />
                  <IconsWrap>
                    <i
                      className="icon-View"
                      onClick={togglePassword}
                    />
                  </IconsWrap>
                </div>
                <h6 onClick={() => navigate("/forgotPassword")}>
                  Forgot Password?
                </h6>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <button type="submit">Sign In</button>
                )}
                <p>
                  Don’t have an account?<span> Contact Us</span>
                </p>
              </BoxContent>
            </Form>
          </Formik>
        </AuthBox>
      </section>
    </AuthWrapper>
  );
}

export const IconsWrap = styled.div`
  line-height: 25px;
  font-size: 20px;
  position: absolute !important;
  cursor: pointer;
  color: #f55a2c;
  right: 20px;
  top: 42px;
`;
