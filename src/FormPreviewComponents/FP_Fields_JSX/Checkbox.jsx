import React, { useState, useEffect } from "react";
import "../FP_Fields_CSS/checkbox.css";
import { handleInput } from "../../redux/handlers.js";

const Checkbox = ({ field }) => {

  const {
    label,
    description,
    options,
    defaultOptionChecked,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
    inputFieldWidth,
  } = field;

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (e) => {
    const option = e.target.value;
    const isChecked = e.target.checked;

    setSelectedOptions((prevSelectedOptions) => {
      if (isChecked) {
        // add the option to the selected options array
        return [...prevSelectedOptions, option];
      } else {
        // remove the option from the selected options array
        return prevSelectedOptions.filter(
          (selectedOption) => selectedOption !== option
        );
      }
    });
  };

  useEffect(() => {
    if(defaultOptionChecked === ""){
      handleInput(label, []);
    }else{
      handleInput(label, [defaultOptionChecked]);
    }
  }, []);

  useEffect(() => {
    handleInput(label, selectedOptions);
  }, [label, selectedOptions]);

  return (
    <div
      className="checkbox-previewer"
      style={{ width: inputFieldWidth ? inputFieldWidth : "100%" }}
    >
      <label>
        {!hideLabel && <span className="rfb-fields-label">{label}</span>}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
        )}
      </label>
      <div id="options" className="checkbox-preview-input">
        {options &&
          options.map((option, index) => (
            <label key={index} style={{ display: "flex", gap: "5px" }}>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions?.includes(option)}
                onChange={handleOptionChange}
              />
              <span
                className="rfb-fields-inputs-check"
                style={{ marginTop: "0.2rem" }}
              >
                {option}
              </span>
            </label>
          ))}
        {options.length === 0 && (
          <label style={{ display: "flex" }}>
            <input type="checkbox" />
            <span
              className="rfb-fields-inputs-check"
              style={{ marginTop: "0.2rem" }}
            >
              No options
            </span>
          </label>
        )}
      </div>
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default Checkbox;
