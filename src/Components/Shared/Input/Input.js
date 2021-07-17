import React from "react";
import "./Input.css";

export default function Input(props) {
  const {
    id,
    name,
    max,
    type,
    onChangeHandler,
    onBlurHandler,
    value,
    disabled,
    defaultValue,
    placeholder,
    checked
  } = props;
  return (
    <input
      type={type}
      id={id}
      max={max}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      defaultValue={defaultValue}
      value={value}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      checked={checked}
      className="custom-input"
    />
  );
}
