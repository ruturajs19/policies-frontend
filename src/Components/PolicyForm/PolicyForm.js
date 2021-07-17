import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/useHttpHook";
import Button from "../Shared/Button/Button";
import Dropdown from "../Shared/Dropdown/Dropdown";
import Input from "../Shared/Input/Input";
import { fieldType, policyFormFields } from "./PolicyForm.config";
import "./PolicyForm.css";

export default function PolicyForm(props) {
  const { currentPolicy, setDisplayForm, setModalText, setCurrentPolicy } =
    props;
  const { sendRequest } = useHttpClient();
  const [isFormValid, setFormValid] = useState(false);
  const [isFormEditable, setFormEditable] = useState(false);
  const [policy, setPolicy] = useState({});

  const validateFormFields = () => {
    for (let key in currentPolicy) {
      if (currentPolicy[key] !== policy[key]) {
        setFormValid(true);
        return;
      }
    }
    setFormValid(false);
  };
  useEffect(() => {
    validateFormFields();
  }, [JSON.stringify(policy)]);

  useEffect(() => {
    setPolicy({ ...currentPolicy });
    validateFormFields();
  }, [JSON.stringify(currentPolicy)]);

  /**
   * Function to handle changes in the input field
   * @param {*} value value of the field
   * @param {*} field field name
   * @param {*} max max value the field can intake
   */
  const numberInputChangeHandler = (value, field, max) => {
    if (Number(value) <= max) {
      setPolicy((prevState) => {
        return { ...prevState, [field]: value };
      });
    }
  };

  /**
   * Function to render number input fields
   * @param {*} id id of the field
   * @param {*} max max value the field can take
   * @param {*} content value to be displayed in the field
   * @returns
   */
  const renderNumberInputValue = (id, max, content) => {
    if (isFormEditable) {
      return (
        <div>
          <Input
            type="number"
            id={id}
            max={max}
            defaultValue={content}
            value={policy[id]}
            onChangeHandler={(e) => {
              numberInputChangeHandler(e.target.value, id, max);
            }}
            onBlurHandler={(e) => {
              numberInputChangeHandler(e.target.value, id, max);
            }}
          />
        </div>
      );
    }
    return (
      <div className="form-field-view" id={id}>
        {content}
      </div>
    );
  };

  /**
   * Function to handle changes in the dropdown field
   * @param {*} value value to be displayed in the field
   * @param {*} field field name
   * @param {*} toBeMapped flag to check if mapping required
   * @param {*} options options to be displayed for dropdown
   */
  const dropDownChangeHandler = (value, field, toBeMapped, options) => {
    let finalValue = value;
    if (toBeMapped) {
      finalValue = options.indexOf(value).toString();
    }
    setPolicy((prevState) => {
      return { ...prevState, [field]: finalValue };
    });
  };

  /**
   * Function to render dropdown field
   * @param {*} id id of the field
   * @param {*} content content to be displayed
   * @param {*} options options to be displayed for dropdown
   * @param {*} toBeMapped flag to check if mapping required
   * @returns
   */
  const renderDropDownValue = (id, content, options, toBeMapped = false) => {
    if (isFormEditable) {
      return (
        <div>
          <Dropdown
            defaultValue={toBeMapped ? options[Number(content)] : content}
            id={`${id}-edit-field`}
            options={options}
            onChangeHandler={(event) => {
              dropDownChangeHandler(
                event.target.value,
                id,
                toBeMapped,
                options
              );
            }}
          />
        </div>
      );
    }
    return (
      <div className="form-field-view" id={`${id}-view-field`}>
        {toBeMapped ? options[Number(content)] : content}
      </div>
    );
  };

  /**
   * Handles submission of Policy form with updated values
   */
  const submitHandler = async () => {
    if (isFormEditable) {
      try {
        setModalText("Loading...");
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/updatePolicy/${policy.policyId}`,
          "PATCH",
          JSON.stringify(policy),
          {
            "Content-Type": "application/json",
          }
        );
        setFormEditable(false);
        setCurrentPolicy({ ...policy });
        setModalText("Saved Successfully");
      } catch (error) {
        setModalText(error.message);
      }
    } else {
      setFormEditable(true);
    }
  };

  /**
   * Renders field in the form
   * @param {*} type type of field
   * @param {*} max max value of input field of type number
   * @param {*} id id of the field
   * @param {*} content values to be displayed in the field
   * @param {*} options options for dropdown field
   * @param {*} toBeMapped flag to check if mapping required to display custom values
   * @returns
   */
  const renderField = (type, max, id, content, options, toBeMapped) => {
    switch (type) {
      case fieldType.dropdown:
        return renderDropDownValue(id, content, options, toBeMapped);
      case fieldType.numberInput:
        return renderNumberInputValue(id, max, content);
      default:
        return <div className="form-field-view">{content}</div>;
    }
  };
  return (
    <div className="form-container">
      <div className="form">
        {policyFormFields.map((formField) => (
          <div className="field-container">
            <label htmlFor={formField.id} className="field-label">
              {formField.label}
            </label>
            {renderField(
              formField.type,
              formField.max,
              formField.id,
              policy[formField.id],
              formField.options,
              formField.toBeMapped
            )}
          </div>
        ))}
      </div>
      <footer className="form-footer">
        {isFormEditable && (
          <p>
            <b>Please Note:&nbsp;</b>Premium Shouldn't exceed 1 million
          </p>
        )}
        <Button onClickHandler={() => setDisplayForm(false)} value={"Cancel"} />
        <Button
          onClickHandler={submitHandler}
          value={isFormEditable ? "Save" : "Edit"}
          disabled={isFormEditable ? !isFormValid : false}
        />
      </footer>
    </div>
  );
}
