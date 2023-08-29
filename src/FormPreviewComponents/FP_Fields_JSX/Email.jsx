import React, { useState, useEffect } from "react";
import "../FP_Fields_CSS/email.css";
import { handleInput, handledisablesubmitButton } from "../../redux/handlers.js";
import { useSelector } from "react-redux";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Email = ({ field, formSettings }) => {
  const { inputFields } = useSelector((state) => state.form);
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    id,
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

  
  const handleValidEmail = (value) => {
    const isValid = emailRegex.test(value);
    if(value === ""){
      setError(false);
      handledisablesubmitButton(false);
    }else{
      // Perform validation and update input field value
      if (isValid) {
        setError(false);
        handledisablesubmitButton(false);
      } else {
        setError(true);
        setErrorMessage(formSettings.languageErrors.emailFieldError);
        handledisablesubmitButton(true);
      }
    }
  }
  
  useEffect(() => {
    const autofillEmail = localStorage.getItem('RFB_CEmail')
    if(autofillEmail !== undefined && autofillEmail !== null && autofillEmail !== ""){
      handleInput(label, autofillEmail);
      if(limitCharacter && autofillEmail.length > maxLength){
        setError(true);
        setErrorMessage(`Max character allowed is ${maxLength}`);
        handledisablesubmitButton(true)
      }else if(limitCharacter && autofillEmail.length < minLength){
        setError(true);
        setErrorMessage(`Min character allowed is ${minLength}`);
        handledisablesubmitButton(true)
      }else{
        handledisablesubmitButton(false)
        setError(false)
        handleValidEmail(autofillEmail)
      }
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    handleInput(label,  value);
    if(limitCharacter && value.length > maxLength){
      setError(true);
      setErrorMessage(`Max character allowed is ${maxLength}`);
      handledisablesubmitButton(true)
    }else if(limitCharacter && value.length < minLength){
      setError(true);
      setErrorMessage(`Min character allowed is ${minLength}`);
      handledisablesubmitButton(true)
    }else{
      handledisablesubmitButton(false)
      setError(false)
      handleValidEmail(value)
    }
  };


  return (
    <div className="email-previewer" style={{ width: inputFieldWidth ? inputFieldWidth : '100%' }}>
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
      <input
        required={required}        
        value={inputFields[label] || ""}
        onChange={handleChange}
        type="email"
        placeholder={placeholder}
        className="rfb-fields-inputs"
      />
      <span className="rfb-fields-desc">{description}</span>
      {error && (
      <span  className="input_validation_error">{"   "}{errorMessage}</span>
    )}
    </div>
  );
};

export default Email;
