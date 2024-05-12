import React from "react";
import "../style/Toggle.css";

const ToggleSwitch = ({ id, isChecked, ApiCall, label, name }) => {
  const changeValue = (e) => {
    ApiCall(e, name, id);
  };

  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="checkbox"
        name={label}
        id={label}
        onChange={(e) => changeValue(e.target.checked)}
        defaultChecked={isChecked}
      />
      <label className="label" htmlFor={label}>
        <span className="inner" />
        <span className="switch" />
      </label>
    </div>
  );
};

export default ToggleSwitch;
