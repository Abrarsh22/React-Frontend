import { useState } from "react";
import { handleInput, handledisablesubmitButton } from "../../redux/handlers.js";
import { useSelector } from "react-redux";

const Number = ({ field, formSettings }) => {
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
    if(limitCharacter && value > maxLength){
      setError(true);
      handledisablesubmitButton(true)
    }else if(limitCharacter && value < minLength){
      setError(true);
      handledisablesubmitButton(true)
    }else{
      handledisablesubmitButton(false)
      setError(false)
    }
  }

  return (
    <div className="rfb-fields_text" style={{ width: inputFieldWidth ? inputFieldWidth : '100%' }}>
      <label>
        {!hideLabel && (
          <span className="rfb-fields-label">
            {label}
          </span>
        )}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
        )}
      </label>
      <input
      className="rfb-fields-inputs"
        type="number"
        required={required}
        value={inputFields[label] || ""}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
        />
      <span className="rfb-fields-desc">{description}</span>
        {error && (
          <span  className="input_validation_error">{formSettings.languageErrors.numberFieldError}</span>
        )}
    </div>
  );
};

export default Number;
