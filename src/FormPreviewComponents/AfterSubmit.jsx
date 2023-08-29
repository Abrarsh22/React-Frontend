import DOMPurify from "dompurify";

const AfterSubmit = ({ afterSubmit }) => {
  const { richText } = afterSubmit;
  let sanitizedTitle = DOMPurify.sanitize(richText);
  return (
    <div
      className="rfb-afterSubmit-text rfb-afterSubmit"
      style={{
        minHeight: "100px",
        padding: "10px 20px",
        textAlign: 'center'
      }}
      dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
    />
  );
};

export default AfterSubmit;
