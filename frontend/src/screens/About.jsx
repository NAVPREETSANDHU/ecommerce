// src/pages/AboutUs.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/About.css';

const About = () => {
  return (
    <Container className="about-us-container py-5">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-4">About Us</h1>
          <p className="lead">Learn more about our company and team.</p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6}>
          <Card className="bg-light">
            <Card.Body>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text>
                Our mission is to provide the best e-commerce experience by offering high-quality products at competitive prices. We are dedicated to customer satisfaction and innovation.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="bg-light">
            <Card.Body>
              <Card.Title>Our Story</Card.Title>
              <Card.Text>
                Founded in 2024, as a group of 4 entrepreneur, we started with a vision to revolutionize the e-commerce industry. Our team is passionate about delivering exceptional service and products to our customers.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="text-center">
        <Col>
          <h2 className="mb-4">Meet Our Team</h2>
          <Row>
            <Col sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src="https://bazaarlia.s3.amazonaws.com/image-1725624846341.jpeg" alt="Team Member" />
                <Card.Body>
                  <Card.Title>Darshil Maheshbhai Prajapati</Card.Title>
                  <Card.Text>CEO & Founder</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src="https://bazaarlia.s3.amazonaws.com/image-1725624846341.jpeg" alt="Team Member" />
                <Card.Body>
                  <Card.Title>Dulguun Myagmarsuren</Card.Title>
                  <Card.Text>Chief Operating Officer</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src="https://bazaarlia.s3.amazonaws.com/image-1725624846341.jpeg" alt="Team Member" />
                <Card.Body>
                  <Card.Title>Navpreet Singh SANDHU</Card.Title>
                  <Card.Text>Software Engineer</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src="https://bazaarlia.s3.amazonaws.com/image-1725624846341.jpeg" alt="Team Member" />
                <Card.Body>
                  <Card.Title>Milan Korangi</Card.Title>
                  <Card.Text>Marketing Director</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
