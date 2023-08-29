import React from "react";	
import DOMPurify from 'dompurify';	
	
const HTML = ({ field }) => {	
  const { htmlCode } = field;	
  const sanitizedHtmlCode = DOMPurify.sanitize(htmlCode);	
  return (	
      <div className="html-previewer">	
        <div dangerouslySetInnerHTML={{ __html: sanitizedHtmlCode }}/>	
      </div>	
  );	
};	
export default HTML;