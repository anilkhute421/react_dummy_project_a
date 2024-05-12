import { useField } from "formik";
import React from "react";
import { FormikWrap } from "./ValidationStyle";

export default function InputField(props) {
  const [field, meta] = useField(props.field);

  return (
    <FormikWrap>
      <input {...field} {...props} />
      {meta.touched && meta.error && (
        <div className="error" dir={props.dir}>
          {meta.error}
        </div>
      )}
    </FormikWrap>
  );
}
