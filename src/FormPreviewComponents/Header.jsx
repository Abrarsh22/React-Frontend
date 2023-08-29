import React from "react";	
import DOMPurify from 'dompurify';	
	
const Header = ({ header }) => {	
  const { title, description } = header;	
  const sanitizedTitle = DOMPurify.sanitize(title);	
  const sanitizedDesc = DOMPurify.sanitize(description);	
  return (	
      <div className="rfb-header">	
        <div dangerouslySetInnerHTML={{ __html: sanitizedTitle }} className="rfb-header-text"/>	
        <div dangerouslySetInnerHTML={{ __html: sanitizedDesc }} className="rfb-header-desc"/>	
      </div>	
  );	
};	
export default Header;