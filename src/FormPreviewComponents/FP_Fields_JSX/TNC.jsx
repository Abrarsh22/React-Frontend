import React, { useEffect, useState } from "react";
import { handleInput } from "../../redux/handlers";
import { useSelector } from "react-redux";

const TNC = ({ field }) => {
  const { inputFields } = useSelector((state) => state.form);
  const { id, label, description, defaultChecked, required, inputFieldWidth } =
    field;

  const check = inputFields[label] ? inputFields[label] : false;

  useEffect(() => {
    handleInput(label, defaultChecked);
  }, [defaultChecked]);

  return (
    <div
      className="checkbox-previewer preview-component"
      style={{ width: inputFieldWidth ? inputFieldWidth : "100%" }}
    >
      <label style={{ display: "flex", gap: "5px" }}>
        <input
          type="checkbox"
          checked={check}
          required={required}
          onChange={(e) => {
            handleInput(label, e.target.checked);
          }}
        />
          <span className="rfb-fields-inputs-check" style={{ marginTop: "2px" }}>
            {label} {required && <span style={{ color: "red" }}>*</span>}
          </span>
      </label>
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default TNC;
