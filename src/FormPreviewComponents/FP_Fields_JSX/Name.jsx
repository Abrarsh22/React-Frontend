import { useEffect, useState } from "react";
import { handleInput, handledisablesubmitButton } from "../../redux/handlers";
import { useSelector } from "react-redux";

const alphanumericRegex1 = /^[a-zA-Z0-9]+$/; // without in-between spaces
const alphanumericRegex2 = /^[a-zA-Z0-9\s]+$/;

const Name = ({ field, formSettings }) => {
  const { inputFields } = useSelector((state) => state.form);
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    label,
    name,
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


  const handleValidName = (value) => {
    const isValid = name === "full_name" ? alphanumericRegex2.test(value) : alphanumericRegex1.test(value);
    setErrorMessage(name === "full_name" ? formSettings.languageErrors.fullnameFieldError : formSettings.languageErrors.fnlnameFieldError);

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
        handledisablesubmitButton(true);
      }
    }
  }

  useEffect(() => {
    let value;
    switch (name) {
      case "full_name":
        value = localStorage.getItem("RFB_CFullName");
        handleInput(label, value);
        break;
      case "first_name":
        value = localStorage.getItem("RFB_CFirstName");
        handleInput(label, value);
        break;
        case "last_name":
        value = localStorage.getItem("RFB_CLastName");
        handleInput(label, value);
        break;
      default:
        value = "";
        handleInput(label, value);
        break;
    }
    handleValidName(value)
  }, []);
  
  const handleChange = (e) => {
    const value = e.target.value;
    handleInput(label, value)
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
      handleValidName(value)
    }
  };

  return (
    <div
      className="rfb-fields_text"
      style={{ width: inputFieldWidth ? inputFieldWidth : "100%" }}
    >
      <label>
        {!hideLabel && <span className="rfb-fields-label">{label}</span>}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
        )}
      </label>
      <input
        className="rfb-fields-inputs"
        type="text"
        name={name}
        required={required}
        value={inputFields[label] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        />
      <span className="rfb-fields-desc">{description}</span>
      {error && (
      <span  className="input_validation_error">{"   "}{errorMessage}</span>
    )}
    </div>
  );
};

export default Name;
