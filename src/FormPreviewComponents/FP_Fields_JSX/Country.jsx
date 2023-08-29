import React, { useEffect, useState } from "react";
import en from "react-phone-number-input/locale/en";
import CountrySelectDropdown from '../../utils/CountrySelectDropdown'
import { handleInput } from "../../redux/handlers";

const Country = ({ field }) => {
  const {
    label,
    placeholder,
    description,
    defaultCountry,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
    inputFieldWidth
  } = field;

  const [country, setCountry] = useState(defaultCountry);

  const handleChange = (value) => {
    setCountry(value);
    handleInput(label, value);
  }

  useEffect(() => {
    handleInput(label, defaultCountry);
  }, []);

  return (
    <div
      className="radio-previewer preview-component"
      style={{ width: inputFieldWidth ? inputFieldWidth : "100%" }}
    >
      <label>
        {!hideLabel && <span className="rfb-fields-label">{label}</span>}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
        )}
      </label>
      <CountrySelectDropdown
        labels={en}
        value={country}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className="rfb-fields-inputs rfb_dropdown-inputs"
      />
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default Country;
