import React from "react";
import { Container, Row, Col, Stack, Nav, NavLink } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container fluid className="mt-5">
        <Row className="bg-dark text-white p-4">
          {/* Column 1 */}
          <Col className="mx-5">
            <Stack>
              <h2>Bazaarlia</h2>
              <p>Complete online Shop</p>
            </Stack>
          </Col>

          {/* Column 2 */}
          <Col>
            <Nav className="flex-column fs-6">
              <NavLink href="/" className="text-white">
                {" "}
                Home{" "}
              </NavLink>
              <NavLink href="/about" className="text-white">
                About{" "}
              </NavLink>
              <NavLink href="/cart" className="text-white">
                Cart
              </NavLink>
            </Nav>
          </Col>

          {/* Column 3 */}
          <Col>
            <h6>Contact us!</h6>
            <p>info@bazaarlia.com</p>
            <p>Phone: +61 0404111000</p>
          </Col>
        </Row>
        <Row className="bg-dark text-white">
          <Col className="text-center py-3">
            <p>Bazaarlia &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
