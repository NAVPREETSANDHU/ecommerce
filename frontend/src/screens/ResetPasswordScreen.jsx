import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../slices/usersApiSlice";

const ResetPasswordScreen = () => {
  const { id: userId } = useParams();

  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleConfirm = (e) => {
    setConfirmPassword(e.target.value);
    if (newPassword !== e.target.value) {
      setError("Password do not matched!");
    } else {
      setError("");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({
        password: newPassword,
        _id: userId,
      }).unwrap();
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Reset Password</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            value={newPassword}
            required
            onChange={(e) => setNewPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            value={confirmPassword}
            required
            onChange={handleConfirm}
            isInvalid={!!error}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          disabled={!!error || confirmPassword === ""}
          variant="primary"
          className="mt-2 px-5"
        >
          Reset
        </Button>
      </Form>
      {isLoading && <Loader />}
    </FormContainer>
  );
};

export default ResetPasswordScreen;
