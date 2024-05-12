import { Autocomplete } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";
import { FormikWrap } from "./ValidationStyle";

export default function SelectField({
  required,
  type,
  getChanges,
  label,
  form,
  field,
  options,
  fullWidth,
  margin,
  placeholder,
  ...props
}) {
  const { name, value } = field;
  const { setFieldValue, getFieldMeta } = useFormikContext();

  const handle = (name, value) => {
    setFieldValue(name, value);
    getChanges(value);
  };

  return (
    <FormikWrap>
      <Autocomplete
        type={type}
        name={name}
        value={value}
        onChange={(e, newvalue) => handle(name, newvalue)}
        options={options}
        sx={{
          color: "success.main",
          "&.MuiAutocomplete-root": {
            display: "contents",
          },
        }}
        {...props}
      />
      <div className="error"> {getFieldMeta(name).error}</div>
    </FormikWrap>
  );
}
