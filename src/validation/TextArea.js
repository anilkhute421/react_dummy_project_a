import React from "react";
import { useField } from "formik";
import { FormikWrap } from "./ValidationStyle";

export default function TextArea(props) {
  const [field, meta] = useField(props.field);
  return (
    <FormikWrap>
      <textarea {...field} {...props} />
      {meta.touched && meta.error  && <div className="error">{meta.error}</div>}
    </FormikWrap>
  );
}
