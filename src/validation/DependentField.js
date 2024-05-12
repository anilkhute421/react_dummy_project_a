import { Autocomplete } from "@mui/material";
import { useFormikContext } from "formik";
import { FormikWrap } from "./ValidationStyle";

export const DependentField = ({
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
  childname,
  getsectionItemsList,
  resetExtra,
  ...props
}) => {
  const { name, value } = field;
  const { setFieldValue, getFieldMeta } = useFormikContext();

  const handle = (name, value) => {
    // setFieldValue(childname, value);
    setFieldValue(name, value);
    getChanges(name, value);
    if (name === "menus") {
      setFieldValue("sections", "");
    }
    if (resetExtra) {
      resetExtra(value);
    }
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
};
