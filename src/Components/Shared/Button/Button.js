import React from "react";
import "./Button.css";

export default function Button(props) {
  const { onClickHandler, value, disabled } = props;
  return (
    <button
      className="custom-button"
      onClick={onClickHandler}
      disabled={disabled}
    >
      {value}
    </button>
  );
}
