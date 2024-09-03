
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';

import Message from '../components/Message';

const OrderScreen = () => {


  const deliverHandler = async () => {
    
  };

  return (
    <>
      <h1>Order </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> abc
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a >abc@gmail.com</a>
              </p>
              <p>
                <strong>Address:</strong>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                paypal
              </p>      
                
                <Message variant='danger'>Not Paid</Message>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

                <Message>Order is empty</Message>
              
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
                  <Col>123</Col>
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
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;