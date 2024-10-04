import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//Confirm modal component
function ConfirmModal({ handleConfirm, title, body, children }) {
  const [show, setShow] = useState(false);

  //function to close modal
  const handleClose = () => setShow(false);
  //function to show modal
  const handleShow = () => setShow(true);
  //fucntion handle confirmation from user
  const handleSuccess = () => {
    handleConfirm();
    handleClose();
  };

  return (
    <>
      {children(handleShow)}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSuccess}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
