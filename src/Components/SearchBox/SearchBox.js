import React, { useState } from "react";
import { useHttpClient } from "../../hooks/useHttpHook";
import Button from "../Shared/Button/Button";
import Input from "../Shared/Input/Input";
import "./SearchBox.css";

export default function SearchBox(props) {
  const { setCurrentPolicy, setDisplayForm, setModalText } = props;
  const { sendRequest } = useHttpClient();
  const [searchByPolicyId, setSearchByPolicyId] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  /**
   * Retrieve Policy details through provided search value
   */
  const getPolicyDetails = async () => {
    try {
      setModalText("Loading...");
      const url = new URL(process.env.REACT_APP_BACKEND_URL);
      if (searchByPolicyId) {
        url.searchParams.append("policyId", searchValue);
      } else {
        url.searchParams.append("customerId", searchValue);
      }
      const responseData = await sendRequest(url);
      setCurrentPolicy(responseData);
      setDisplayForm(true);
      setModalText("");
    } catch (err) {
      setModalText(err.message);
    }
  };

  return (
    <div className="search-container">
      <div>
        <Input
          type="number"
          id={"policy-id-search"}
          value={searchValue}
          placeholder="Enter a value"
          onChangeHandler={(e) => {
            setSearchValue(e.target.value);
          }}
          onBlurHandler={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <Button
          onClickHandler={getPolicyDetails}
          value="Search"
          disabled={false}
        />
        <div className="radio-button-set">
          <b>Search Policies By:</b>
          <span className="radio-field">
            <input
              id="customer-id"
              type="radio"
              name="search-value-type"
              checked={!searchByPolicyId}
              onChange={(e) => {
                setSearchByPolicyId(!e.target.checked);
              }}
            />
            <label for="customer-id">Customer Id</label>
          </span>
          <span className="radio-field">
            <input
              id="policy-id"
              type="radio"
              name="search-value-type"
              checked={searchByPolicyId}
              onChange={(e) => {
                setSearchByPolicyId(e.target.checked);
              }}
            />
            <label for="policy-id">Policy Id</label>
          </span>
        </div>
      </div>
    </div>
  );
}
