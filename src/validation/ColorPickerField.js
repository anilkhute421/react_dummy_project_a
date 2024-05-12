import { useField, useFormikContext } from "formik";
import React from "react";
import { FormikWrap } from "./ValidationStyle";

export default function ColorPickerField({ getHexCode, ...props }) {
  const [field, meta] = useField(props.field);
  const { setFieldValue } = useFormikContext();

  const getColor = (name, value) => {
    setFieldValue(name, value);
    getHexCode(name, value);
  };
  return (
    <FormikWrap>
      <input
        {...field}
        {...props}
        type={props.type}
        onChange={(e) => getColor(field.name, e.target.value)}
      />
      {meta.touched && meta.error && (
        <div className="error" dir={props.dir}>
          {meta.error}
        </div>
      )}
    </FormikWrap>
  );
}
