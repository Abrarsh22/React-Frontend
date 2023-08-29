import React, { useState } from "react";
import { handleInput, handledisablesubmitButton } from "../../redux/handlers.js";
import { useSelector } from "react-redux";
import "../FP_Fields_CSS/textarea.css";


const TextArea = ({ field, formSettings }) => {
  const { inputFields } = useSelector((state) => state.form);
  const [error, setError] = useState();
  const {
    label,
    placeholder,
    description,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
    inputFieldWidth,
    limitCharacter,
    minLength,
    maxLength,
  } = field;

  const handleInputChange = (value) => {
    handleInput(label, value);
    if(limitCharacter && value.length > maxLength){
      setError(true);
      handledisablesubmitButton(true)
    }else if(limitCharacter && value.length < minLength){
      setError(true);
      handledisablesubmitButton(true)
    }else{
      handledisablesubmitButton(false)
      setError(false)
    }
  }

  return (
    <div className="rfb-fields_textarea" style={{ width: inputFieldWidth ? inputFieldWidth : '100%' }}>
      <label>
        {!hideLabel && (
          <span className="rfb-fields-label">{label}</span>
        )}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
        )}
      </label>
      <textarea
        rows="4"
        className="rfb-fields-inputs"
        required={required}
        value={inputFields[label] || ""}
        onChange={(e) => handleInputChange(e.target.value)}
        type="textarea"
        placeholder={placeholder}
        />
      <span className="rfb-fields-desc">{description}</span>
        {error && (
          <span  className="input_validation_error">{formSettings.languageErrors.textareaFieldError}</span>
        )}
    </div>
  );
};

export default TextArea;