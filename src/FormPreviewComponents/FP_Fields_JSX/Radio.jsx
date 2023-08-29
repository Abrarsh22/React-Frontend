import React, { useEffect, useState } from "react";
import "../FP_Fields_CSS/radio.css";
import { handleInput } from "../../redux/handlers.js";
import { useSelector } from "react-redux";

const Radio = ({ field }) => {
  const { inputFields } = useSelector((state) => state.form);

  const {
    id,
    label,
    description,
    options,
    defaultOptionChecked,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
    inputFieldWidth,
  } = field;

  const [selectedOption, setSelectedOption] = useState(defaultOptionChecked || inputFields[label] || "");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    handleInput(label, e.target.value)
  };

  useEffect(() => {
    handleInput(label, defaultOptionChecked);
  }, []);

  return (
    <div className="radio-previewer" style={{ width: inputFieldWidth ? inputFieldWidth : '100%' }}>
      <label>
        {!hideLabel && (
          <span
          className="rfb-fields-label"
          >
            {label}
          </span>
        )}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
        )}
      </label>
      <div id="options" className="radio-preview-input">
        {options &&
          options.map((option, index) => (
            <label key={index} style={{display: "flex", gap: '5px' }}>
              <input
                required={required}
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              <span className="rfb-fields-inputs-check"  style={{marginTop: '0.2rem'}}>{option}</span>
            </label>
          ))}
        {options.length === 0 && (
          <label style={{display: "flex"}}>
            <input type="radio" />
            <span className="rfb-fields-inputs-check"  style={{marginTop: '0.2rem'}}>No options</span>
          </label>
        )}
      </div>
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default Radio;
