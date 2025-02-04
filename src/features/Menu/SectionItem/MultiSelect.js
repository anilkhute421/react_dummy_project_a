import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ options }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleDelete = (e, value) => {
    e.preventDefault();
    const index = personName.indexOf(value);
    if (index > -1) {
      const freshArray = personName.filter((item) => item !== value);
      setPersonName(freshArray);
    }
  };
  //Output limit
  const SelectOutputLimit = (selected) => {
    let more = selected.selected.length - 2;

    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, color: "red" }}>
          {selected.selected.map(
            (ele, idx) =>
              idx < 2 && (
                <Chip
                  style={{
                    color: "rgba(245, 90, 44, 1)",
                    background: "rgba(245, 90, 44, 0.25)",
                  }}
                  key={idx}
                  label={ele}
                  clickable
                  deleteIcon={
                    <CancelIcon
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  }
                  onDelete={(e) => handleDelete(e, ele)}
                />
              )
          )}
        </Box>
        {selected.selected.length > 2 && `+${more}More`}
      </Box>
    );
  };
  //See chnges whren select change
  React.useEffect(() => {
  }, [personName]);

  return (
    <div>
      <FormControl
        sx={{ m: 1, width: "100%", margin: "8px 0", bordeRadius: "10px" }}
      >
        <Select
          SX={{}}
          multiple
          value={personName}
          onChange={handleChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return;
            }

            return (
              <SelectOutputLimit
                style={{ color: "red", background: "yellow" }}
                selected={selected}
              />
            );
          }}
          MenuProps={MenuProps}
        >
          {options?.map((el) => (
            <MenuItem
              key={el.id}
              value={el.name}
              style={getStyles(el, personName, theme)}
            >
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
