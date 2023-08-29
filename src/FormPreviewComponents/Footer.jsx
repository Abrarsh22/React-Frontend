import DOMPurify from "dompurify";
import { handleReset } from "../redux/handlers";
import { useSelector } from "react-redux";

const Footer = ({ footer }) => {
  const { disablesubmitButton } = useSelector((state) => state.form);
  const { footerDisclaimer, submitBtnText, resetBtn, resetBtnText } = footer;
  const sanitizedHtml = DOMPurify.sanitize(footerDisclaimer);
  
  return (
      <div className="rfb-footer">
        <div className="rfb-footer_buttons">
          <button
            className="rfb-footer_buttons-save"
            type="submit" 
            style={{ cursor: disablesubmitButton ? 'no-drop' : 'pointer'}}
            disabled={disablesubmitButton}        
          >
            {submitBtnText}
          </button>
          {resetBtn && (
            <button className="rfb-footer_buttons-reset" type="reset" onClick={() => {handleReset()}}>
              {resetBtnText}
            </button>
          )}
        </div>
        <div className="rfb-footer_disclaimer" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
      </div>
  );
};

export default Footer;
