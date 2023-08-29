import React, { useState } from "react";
import "../FP_Fields_CSS/phone.css";
import Input from "react-phone-number-input/input";
import PhoneInput, {
  isValidPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import "../../../node_modules/react-phone-number-input/style.css";
import { handleInput, handledisablesubmitButton } from "../../redux/handlers";
import { useSelector } from "react-redux";

const phoneNumberRegex = /^\+[1-9]\d{0,2}\s?\d{8,13}$/;

const Phone = ({ field, formSettings }) => {
  const { inputFields } = useSelector((state) => state.form);

  const {
    id,
    label,
    description,
    placeholder,
    defaultCountry,
    validateInternationalPhoneNumber,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
    inputFieldWidth,
  } = field;

  const [error, setError] = useState(false);

  const handleChange = (value) => {
    handleInput(label, value);
    const isValid = phoneNumberRegex.test(value);

    // Perform validation and update input field value
    if (value === undefined) {
      setError(false);
      handledisablesubmitButton(false);
    } else {
      if (isValid) {
        setError(false);
        handledisablesubmitButton(false);
      } else {
        setError(true);
        handledisablesubmitButton(true);
      }
    }
  };

  const handleIntPhoneNoChange = (value) => {
    handleInput(label, value);

    if (value === undefined) {
      setError(false);
      handledisablesubmitButton(false);
    } else {
      // Perform validation and update input field value
      if (
        value &&
        isValidPhoneNumber(formatPhoneNumberIntl(value).toString())
      ) {
        setError(false);
        handledisablesubmitButton(false);
      } else {
        setError(true);
        handledisablesubmitButton(true);
      }
    }
  };

  return (
    <div
      className="phone-previewer"
      style={{ width: inputFieldWidth ? inputFieldWidth : "100%" }}
    >
      <label>
        {!hideLabel && <span className="rfb-fields-label">{label}</span>}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
        )}
      </label>
      {validateInternationalPhoneNumber && (
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry={defaultCountry === "" ? "IN" : defaultCountry}
          placeholder={placeholder}
          value={inputFields[label]}
          onChange={handleIntPhoneNoChange}
          />
          )}
      {!validateInternationalPhoneNumber && (
        <Input
        placeholder={placeholder}
        value={inputFields[label]}
          onChange={handleChange}
          className="rfb-fields-inputs"
        />
      )}
      <span className="rfb-fields-desc">{description}</span>
      {error && (
        <span  className="input_validation_error">
          {"   "}{formSettings.languageErrors.phoneFieldError}
        </span>
      )}
    </div>
  );
};

export default Phone;
