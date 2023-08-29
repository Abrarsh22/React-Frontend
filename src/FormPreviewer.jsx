import React, { useEffect, useState, useCallback } from "react";
import FpFields from "./FormPreviewComponents/FpFields";
import Header from "./FormPreviewComponents/Header";
import Footer from "./FormPreviewComponents/Footer";
import AfterSubmit from "./FormPreviewComponents/AfterSubmit";
import { useSelector } from "react-redux";
import { handleReset } from "./redux/handlers";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
// const baseUrl = "https://shopify-formapp-apis-dev.dtengg.com";
// const baseUrl = "https://api.serverdigitalrangers.in";
// const baseUrl = "http://localhost:8080";
const baseUrl = "https://shopify-formapp-apis.dtstage.com";

const FormPreviewer = ({ id }) => {
  const [formKey, setFormKey] = useState(0);
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { inputFields } = useSelector((state) => state.form);
  const [header, setHeader] = useState();
  const [footer, setFooter] = useState();
  const [shopname, setShopname] = useState();
  const [afterSubmit, setAfterSubmit] = useState();
  const [fields, setFields] = useState([]);
  const [formtitle, setFormtitle] = useState("");
  const [formId, setFormId] = useState("");
  const [formCSS, setFormCSS] = useState({});
  const [formStatus, setFormStatus] = useState(false);
  const [ notifyFormStatus,setNotifyFormStatus] = useState(true)
  const [formSettings, setFormSettings] = useState({});
  const [klaviyoSettings, setklaviyoSettings] = useState({});
  const [error, setError] = useState("");
  const [errors, setErrors] = useState(false);
  const [shopifySettings, setShopifySettings] = useState({});
  const [formLoading, setFormLoading] = useState(true);

  console.log(inputFields)
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/forms/getform?id=${id}`);
        const data = await response.json();
        console.log('DATA',data)
        console.log("Form loaded successfully!");
        setFields(JSON.parse(data.forms.componentJSON));
        setHeader(JSON.parse(data.forms.headerJSON));
        setFooter(JSON.parse(data.forms.footerJSON));
        setAfterSubmit(JSON.parse(data.forms.afterSubmit));
        setFormSettings(JSON.parse(data.forms.formSettings));
        setFormtitle(data.forms.formtitle);
        setFormId(data.forms.id);
        setklaviyoSettings(JSON.parse(data.forms.klaviyoIntegration));
        setShopifySettings(JSON.parse(data.forms.shopifyIntegration));
        setShopname(data.forms.shopname);
        setFormCSS(JSON.parse(data.forms.formCSS));
        setFormStatus(data.forms.status);
        setNotifyFormStatus(data.forms.notifyFormStatus);
        setFormLoading(false);

        let ipAddress = localStorage.getItem("RFB_CIPAdd");
        if(!ipAddress){
          let response = await fetch("https://api.ipify.org/?format=json");
          let data = await response.json();
          localStorage.setItem("RFB_CIPAdd", data.ip);
        }
      } catch (error) {
        console.log("Error>>>>>>>", error.message);
      }
    };

    fetchFormData();
  }, []);

  const onVerify = useCallback((token) => {
    setToken(token);
  }, []);

  const handleInputValidation = () => {
    setErrors(false);
    const requiredLabels = fields
      .filter((field) => field.required)
      .map((field) => field.label);

    // checks that key and value pair for all the required fields is present ot not
    for (let label of requiredLabels) {
      if (!(label in inputFields)) {
        setErrors(true);
        setError(`${label} is required!`);
        setTimeout(() => {
          setErrors(false);
        }, 1500);
        return false;
      }
    }

    // checks whether value for all the required fields is not empty
    for (const label of requiredLabels) {
      const value = inputFields[label];
      if (Array.isArray(value)) {
        if (value.length === 0) {
          setErrors(true);
          setError(
            `${formSettings.languageErrors.selectionFieldError}:  ${label}`
          );
          setTimeout(() => {
            setErrors(false);
          }, 1500);
          return false;
        }
      } else if (typeof value === "string") {
        if (value.trim().length === 0) {
          setErrors(true);
          setError(
            `${formSettings.languageErrors.selectionFieldError}:  ${label}`
          );
          setTimeout(() => {
            setErrors(false);
          }, 1500);
          return false;
        }
      }
    }
    return true;
  };
let pid= localStorage.getItem("RFB_PID");
let pAvailable = localStorage.getItem("RFB_PAvailable");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      formtitle: formtitle,
      fields: inputFields,
      recaptchaEnabled: formSettings.googleRecaptcha.enable,
      adminMailSettings: formSettings.adminMail,
      autoResponseSettings: formSettings.autoResponse,
      recaptchaToken: token,
      shopname: shopname,
      klaviyoSettings: klaviyoSettings,
      formId: formId,
      formFields: fields,
      status:formStatus,
      notifyFormStatus:notifyFormStatus,
      isDuplicate: formSettings.subUniqueIdentifier,
      shopifySettings: shopifySettings,
      productid : pid,
      productAvailable : pAvailable
    };
    if (handleInputValidation()) {
      console.log(formData)
      try {
        const response = await fetch(`${baseUrl}/api/forms/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log(result.insertId);

        if (result.error) {
          console.log(JSON.stringify(result.error));
          throw new Error(result.error);
        }
        setFormSubmitted(true);
        handleReset();

        // Trigger re-render by incrementing the formKey
        setFormKey((prevKey) => prevKey + 1);
        setTimeout(() => {
          // setFormSubmitted(false)
        }, 5500);
      } catch (error) {
        setErrors(true);
        setError(`${error}`);
        setTimeout(() => {
          setErrors(false);
        }, 1500);
      }
      setRefreshReCaptcha((r) => !r);
    } else {
      setTimeout(() => {
        setErrors(false);
      }, 1500);
    }
  };
  const openForm = () =>{
    setFormSubmitted(false)
  }
  return (
    <>
      <style>
        {`        
        #rfb-${formId} .formbuilder-form, #rfb-${formId} .rfb-afterSubmit {
          max-width: ${formCSS.form_width}px !important;
          width: ${formCSS.form_width_size} !important;
          background-color: ${formCSS.form_background_color} !important;
          border: 1.5px solid #000000;
          max-height: 100% !important;
           }
        .rfb-afterSubmit{
          padding-top: 40px !important;
       
        }

        #rfb-${formId} .formbuilder-form .rfb-header .rfb-header-text, .rfb-header-text h1, .rfb-header-text h2, .rfb-header-text h3, .rfb-header-text h4, .rfb-header-text h5, .rfb-header-text h6, .rfb-header-text p, .rfb-header-text span, .rfb-header-text a, .rfb-afterSubmit-text {
          color: ${formCSS.header_title_color} !important;
        }
        
        #rfb-${formId} .formbuilder-form .rfb-header .rfb-header-desc, .rfb-header-desc h1, .rfb-header-desc h2, .rfb-header-desc h3, .rfb-header-desc h4, .rfb-header-desc h5, .rfb-header-desc h6, .rfb-header-desc p, .rfb-header-desc span, .rfb-header-desc a{
          color: ${formCSS.header_desc_color} !important;
        }
        
        #rfb-${formId} .formbuilder-form .rfb-fields .rfb-fields-label {
          color: ${formCSS.input_label_color} !important;
          font-size: ${formCSS.label_font_size}px !important;
          word-break: break-all;
        }
        
        #rfb-${formId} .formbuilder-form .rfb-fields .rfb-fields-inputs, .phone-previewer input {
          border: 1px solid ${formCSS.input_border_color} !important;
          background-color: ${formCSS.input_background_color} !important;
          color: ${formCSS.input_text_color} !important;
          font-size: ${formCSS.input_texts_font_size}px !important;
          outline: none;
        }
        #rfb-${formId} .formbuilder-form .rfb-fields .rfb-fields-inputs:focus {
          border: 1px solid ${formCSS.input_focus_color} !important;
        }
        #rfb-${formId} .formbuilder-form .rfb-fields .rfb-fields-inputs-check {
          color: ${formCSS.input_label_color} !important;
          font-size: ${formCSS.input_texts_font_size}px !important;
          word-break: break-all;
        }
        
        #rfb-${formId} .formbuilder-form .rfb-fields .rfb-fields-inputs::placeholder {
          font-size: ${formCSS.placeholder_font_size}px !important;
          color:  ${formCSS.input_placeholder_color} !important;
        }
        
        #rfb-${formId} .formbuilder-form .rfb-fields .rfb-fields-desc{
          font-size: ${formCSS.desc_font_size}px !important;
          color: ${formCSS.header_desc_color} !important;
        }
        
        #rfb-${formId} .rfb-footer .rfb-footer_buttons-save {
          background-color: ${formCSS.button_text_color} !important;
          color: ${formCSS.button_color} !important;
          border: 1px solid ${formCSS.button_border_color} !important;
          font-size: ${formCSS.button_font_size}px !important;
          margin-top: -25px !important;
          transition: "background-color 0.3s ease-in-out",
        }
        #rfb-${formId} .rfb-footer .rfb-footer_buttons-save:hover {
          background-color: ${formCSS.button_hover_background_color} !important;
          color: ${formCSS.button_hover_text_color} !important;
          border: 1px solid ${formCSS.button_hover_border_color} !important;
        }       
        #rfb-${formId} .rfb-footer .rfb-footer_disclaimer{
          color: ${formCSS.footer_disc_color} !important;
          font-size: ${formCSS.disclaimer_font_size}px !important;
        }
        `}
      </style>
      {formLoading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      {formStatus &&
        !(formSubmitted && afterSubmit.defaultOption === "Hide Form") && (
          <>
            <form
              key={formKey}
              onSubmit={handleFormSubmit}
              className="formbuilder-form"
            >
              {formSettings.googleRecaptcha.enable &&
                formSettings.googleRecaptcha.siteKey && (
                  <GoogleReCaptchaProvider
                    reCaptchaKey={formSettings.googleRecaptcha.siteKey}
                    language="en"
                    scriptProps={{
                      async: true,
                      defer: true,
                      appendTo: "head",
                    }}
                  >
                    <GoogleReCaptcha
                      onVerify={onVerify}
                      refreshReCaptcha={refreshReCaptcha}
                    />
                  </GoogleReCaptchaProvider>
                )}
              {header && <Header header={header} />}

              <div className="rfb-fields">
                {fields &&
                  fields.map((field) => (
                    <FpFields
                      key={field.id}
                      field={field}
                      formKey={formKey}
                      formSettings={formSettings}
                    />
                  ))}
              </div>
              {errors && (
                <div
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontStyle: "italic",
                    fontSize: "16px",
                  }}
                >
                  {error}
                </div>
              )}
              {footer && (
                <Footer footer={footer} handleFormSubmit={handleFormSubmit} />
              )}
            </form>
          </>
        )}
      {formSubmitted && (
          <AfterSubmit afterSubmit={afterSubmit} />
      )}
    </>
  );
};

export default FormPreviewer;
