import { Alert } from "react-bootstrap";

//Message Component
const Message = ({ variant = "info", children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
