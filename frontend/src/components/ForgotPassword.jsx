import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForgotPasswordMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const [forgotPassword] = useForgotPasswordMutation();

  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else {
      try {
        const res = await forgotPassword({
          email,
        }).unwrap();
        toast.success(res.message);
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error);
      }
      setError("");
      setEmail("");
      setShow(false);
    }
  };

  const validateEmail = (email) => {
    // Basic regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <>
      <Button
        variant="link"
        style={{ textDecoration: "none", padding: 0 }}
        onClick={handleShow}
      >
        Forgot Password?
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                required
                value={email}
                placeholder="name@mail.com"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ForgotPassword;
