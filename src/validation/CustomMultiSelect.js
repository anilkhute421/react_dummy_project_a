import { Autocomplete } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { FormikWrap } from "./ValidationStyle";

export const CustomMultiSelect = ({
  getChanges,
  required,
  type,
  label,
  form,
  field,
  options,
  fullWidth,
  margin,
  placeholder,
  defaultValue,
  ...props
}) => {
  const { name, value } = field;
  const { setFieldValue, getFieldMeta } = useFormikContext();
  const [meta] = useField(props.field);

  const handle = (name, newValue) => {
    setFieldValue(name, newValue);
  };
  return (
    <FormikWrap>
      <Autocomplete
        name={name}
        options={options}
        renderInput={{ ...props.renderInput }}
        sx={{
          color: "success.main",
          "&.MuiAutocomplete-root": {
            display: "contents",
          },
        }}
        {...props}
        onChange={(e, newvalue) => handle(name, newvalue)}
        value={value}
        isOptionEqualToValue={(option, value) => option.name === value.name}
      />

      {meta.touched && meta.error && <div className="error"> {meta.error}</div>}
    </FormikWrap>
  );
};
