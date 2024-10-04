import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../slices/usersApiSlice";

//reset password page
const ResetPasswordScreen = () => {
  const { id: userId } = useParams(); //get id from url hooks
  const navigate = useNavigate();

  const [error, setError] = useState(""); //set state for error
  const [newPassword, setNewPassword] = useState(""); //set state for new password
  const [confirmPassword, setConfirmPassword] = useState(""); //set state for confirm password

  const [resetPassword, { isLoading }] = useResetPasswordMutation(); //costum hooks to send reset password data to api

  //function to match two password and confirm password
  const handleConfirm = (e) => {
    setConfirmPassword(e.target.value);
    if (newPassword !== e.target.value) {
      setError("Password do not matched!");
    } else {
      setError("");
    }
  };

  //function to submit data of reset form
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
