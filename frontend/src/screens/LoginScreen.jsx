import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import ForgotPassword from "../components/ForgotPassword";

import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

//Login page
const LoginScreen = () => {
  const [email, setEmail] = useState(""); // hooks for storing and changing email
  const [password, setPassword] = useState(""); // hooks for storing and changing password

  const dispatch = useDispatch(); // hooks to dispatch action
  const navigate = useNavigate(); // hooks to navigate

  const [login, { isLoading }] = useLoginMutation(); //custom hooks to post login data

  const { userInfo } = useSelector((state) => state.auth); // hooks to fetch data in global store of redux

  const { search } = useLocation(); // hooks to get data in search
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  //hooks to main life cycle of login screen
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  //Login data submit handler function
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            required
            isInvalid={!/^\S+@\S+\.\S+$/.test(email)}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="mt-2 px-5"
        >
          Sign In
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row>
        <Col>
          <ForgotPassword />
        </Col>
      </Row>

      <Row>
        <Col>
          Are you new customer?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            style={{ textDecoration: "none" }}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
