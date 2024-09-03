import React from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
  
  return (
    <>
      
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                123
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              paypal
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              
         
       
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Camera</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>123</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>123</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>123</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;