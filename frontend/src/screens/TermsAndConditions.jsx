import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const TermsAndConditions = () => {
  return (
    <Container className="my-4">
      <Card className="text-center bg-light mb-4">
        <Card.Body>
          <Card.Title className="display-4">Terms and Conditions</Card.Title>
          <Card.Text>
            Please read these terms carefully before using our services.
          </Card.Text>
        </Card.Body>
      </Card>

      <Row className="mb-4" id="terms">
        <Col>
          <h2>1. Introduction</h2>
          <p>
            These terms and conditions govern your use of our website and
            services. By accessing or using our website, you agree to be bound
            by these terms.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2>2. Use of the Website</h2>
          <p>
            You must not misuse our website. You will only use the website for
            lawful purposes and in a way that does not infringe on the rights of
            others.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2>3. Orders and Payment</h2>
          <p>
            All orders placed through our website are subject to acceptance. We
            reserve the right to refuse any order for any reason.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2>4. Delivery</h2>
          <p>
            Delivery times may vary based on your location. We are not
            responsible for delays caused by external factors.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2>5. Returns and Refunds</h2>
          <p>
            Our return policy allows you to return items within 7 days of
            receiving your order. Refunds will be processed according to our
            policy.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2>6. Limitation of Liability</h2>
          <p>
            We will not be liable for any indirect or consequential losses
            arising from your use of the website.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to update these terms at any time. Changes will
            be effective immediately upon posting on our website.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2>8. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with
            the laws of your current residing Country.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about these terms, please contact us at provided contact details.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsAndConditions;
