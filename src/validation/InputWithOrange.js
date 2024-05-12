import { useField } from "formik";
import React from "react";
import styled from "styled-components";

export default function InputWithOrange(props) {
  const [field, meta] = useField(props.field);
  return (
    <OrangeOutput>
      <input {...field} {...props} />
      <span>Cal</span>
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}s
    </OrangeOutput>
  );
}

export const OrangeOutput = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin-top: 25px;

  input {
    width: 100%;
    height: 42px;
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    border-radius: 8px;
    padding: 0 25px 0 10px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    position: absolute;
    left: ${({ dir }) => dir === "ltr" && 0};
    right: ${({ dir }) => dir === "rtl" && 0};
  }
  input:focus {
    outline: none;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px #f55a2c;
  }

  span {
    width: 41px;
    height: 42px;
    background: #f55a2c;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff !important;
    position: absolute;
    opacity: 1 !important;
    top: 0;
    right: ${({ dir }) => dir === "ltr" && 0};
    left: ${({ dir }) => dir === "rtl" && 0};
    bottom: 0;
    border-radius: ${({ dir }) =>
      dir === "ltr" ? "0 8px 8px 0" : "8px 0 0 8px"};
  }

  .error {
    margin: 0;
    color: #f44336;
    font-size: 10px;
    font-weight: 500;
    text-align: start;
    padding: 5px 0;
  }
`;
