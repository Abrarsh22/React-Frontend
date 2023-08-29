import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import { handleInput, handledisablesubmitButton } from "../../redux/handlers";
import '../FP_Fields_CSS/rating.css';

const Rating = ({ field }) => {
  const {
    label,
    description,
    count,
    defaultCount,
    allowHalf,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
    inputFieldWidth
  } = field;

  const [rating, setRating] = useState(parseInt(defaultCount));
  const [error, setError] = useState(false);

  useEffect(() => {
    setRating(parseInt(defaultCount));
    handleInput(label, parseInt(defaultCount));
  }, [defaultCount]);

  const handleChange = (value) => {
    setRating(value)
    handleInput(label, value);
  }

  useEffect(() => {
    if(required && rating === 0){
      setError(true);
      handledisablesubmitButton(true);
    }else{
      setError(false);
      handledisablesubmitButton(false);
    }
  }, [rating]);

  return (
    <div
      className="preview-component"
      style={{ width: inputFieldWidth ? inputFieldWidth : "100%" }}
    >
      <label>
        {!hideLabel && <span className="rfb-fields-label">{label}</span>}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
        )}
        {error && (
          <span style={{ color: "red" }}>
            {"   "}Rating is required!
          </span>
        )}
      </label>
      <div>
        <Rate allowHalf={allowHalf} defaultValue={parseInt(defaultCount)} count={parseInt(count)} value={rating} onChange={handleChange}/>
      </div>
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default Rating;
