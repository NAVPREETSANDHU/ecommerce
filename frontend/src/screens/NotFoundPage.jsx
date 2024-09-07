// src/pages/404Page.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../css/404Page.css';

const NotFoundPage = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <h2>Page Not Found</h2>
          <p className="lead">
            Oops! The page you are looking for does not exist.
          </p>
          <Link to="/">
            <Button variant="primary">Go to Homepage</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
