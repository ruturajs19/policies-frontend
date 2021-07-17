import React from "react";
import "./Dropdown.css";

export default function Dropdown(props) {
  const { onChangeHandler, options, disabled, id, defaultValue } = props;
  return (
    <select
      defaultValue={defaultValue}
      id={id}
      onChange={onChangeHandler}
      disabled={disabled}
      className="custom-dropdown"
    >
      {options.map((item) => (
        <option>{item}</option>
      ))}
    </select>
  );
}
