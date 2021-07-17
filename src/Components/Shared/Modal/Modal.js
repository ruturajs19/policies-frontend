import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";
import "./Modal.css";

export default function Modal({ modalText, closeModal }) {
  if (!modalText) return null;

  return ReactDOM.createPortal(
    <>
      <div className={"backdrop-modal"} />
      <div className="modal-content">
        <div className="modal-body">{modalText}</div>
        <div className="modal-footer">
          {!(modalText.includes("Loading")) && (
            <Button
              value={"Okay"}
              onClickHandler={closeModal}
            />
          )}
        </div>
      </div>
    </>,
    document.getElementById("modal-portal")
  );
}