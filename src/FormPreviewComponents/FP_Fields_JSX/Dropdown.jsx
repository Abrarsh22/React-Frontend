import React, { useEffect, useState } from "react";
import { handleInput } from "../../redux/handlers.js";

const Dropdown = ({ field }) => {

  const {
    label,
    placeholder,
    description,
    options,
    defaultOptionChecked,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
    inputFieldWidth,
  } = field;

  const [selectedOption, setSelectedOption] = useState(defaultOptionChecked);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    handleInput(label, e.target.value)
  };

  useEffect(() => {
    handleInput(label, defaultOptionChecked);
  }, []);

  return (
    <div
      className="radio-previewer"
      style={{ width: inputFieldWidth ? inputFieldWidth : "100%" }}
    >
      <label>
        {!hideLabel && <span className="rfb-fields-label">{label}</span>}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
          )}
      </label>
      <select className="rfb-fields-inputs rfb_dropdown-inputs" value={selectedOption} required={required} onChange={handleOptionChange}>
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options &&
          options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
      </select>
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default Dropdown;
