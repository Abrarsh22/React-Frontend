import { Text , TextArea, Email, Radio, Checkbox, Phone, Hidden, HTML, TNC, Name, Number, Dropdown, Country, Rating } from "./FP_Fields_JSX/index"

const FpFields = ({ field, formKey, formSettings }) => {

  const handleAddField = (field) => {

    switch (field.type) {
      case "text":
          return <Text field={field} formSettings={formSettings}/>;
        case "textarea":
          return <TextArea field={field} formSettings={formSettings}/>;
        case "name":
          return <Name field={field} formSettings={formSettings}/>;
        case "number":
          return <Number field={field} formSettings={formSettings}/>;
        case "checkbox":
          return <Checkbox field={field}/>;
        case "radio":
          return <Radio field={field}/>;
        case "dropdown":
          return <Dropdown field={field}/>;
        case "email":
          return <Email field={field} formSettings={formSettings}/>;
        case "phone":
          return <Phone field={field} formSettings={formSettings}/>;
        case "hidden":
          return <Hidden field={field} formKey={formKey}/>;  
        case "html":
          return <HTML field={field}/>;  
        case "termsnconditions":
          return <TNC field={field}/>;  
        case "country":
          return <Country field={field}/>;  
        case "rating":
          return <Rating field={field}/>;  
        default:
          return null;
      }
  };
  
  return (
    <>
      {handleAddField(field)}
    </>
  );
};

export default FpFields;