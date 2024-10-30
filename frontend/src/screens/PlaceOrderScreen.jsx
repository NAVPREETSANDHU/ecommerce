import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import LoyaltyStatus from '../components/loyaltystatus'; // Adjust import as per your folder structure

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const [adjustedItemsPrice, setAdjustedItemsPrice] = useState(0);
  const [adjustedTotalPrice, setAdjustedTotalPrice] = useState(0);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  const getPastItemsCount = () => {
    // Implement logic to fetch past purchase count for the user
    return 3; // Replace with actual logic
  };

  // Calculate prices whenever cart or eligibility changes
  useEffect(() => {
    const calculateAdjustedPrices = () => {
      const pastItemsCount = getPastItemsCount();
      const currentItemsCount = cart.cartItems.reduce((acc, item) => acc + item.qty, 0);
      const totalItemsCount = currentItemsCount + pastItemsCount;

      // Check if the user is eligible for the loyalty program
      const isEligible = totalItemsCount >= 6;
      const cartItems = [...cart.cartItems]; // Clone current cart items

      let freeItemPrice = 0;
      let itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

      if (isEligible) {
        // Determine the cheapest item in the cart
        const cheapestItem = cartItems.reduce((cheapest, item) =>
          cheapest.price < item.price ? cheapest : item
        );

        // Set the price of the free item to be deducted
        freeItemPrice = cheapestItem.price;

        // Add the free item to the cart display (as a loyalty reward)
        cartItems.push({
          ...cheapestItem,
          price: 0, // Price of the free item is 0
          qty: 1, // Quantity of the free item is 1
          name: `${cheapestItem.name} (Free Loyalty Reward)`, // Updated name to indicate it's a reward
        });
      }

      // Calculate adjusted prices
      const adjustedItemsPrice = itemsPrice - (isEligible ? freeItemPrice : 0);
      const adjustedTotalPrice = adjustedItemsPrice + cart.shippingPrice + cart.taxPrice;

      // Set the adjusted values
      setAdjustedItemsPrice(Math.max(adjustedItemsPrice, 0));
      setAdjustedTotalPrice(Math.max(adjustedTotalPrice, 0));
    };

    calculateAdjustedPrices();
  }, [cart, getPastItemsCount]);

  const placeOrderHandler = async () => {
    try {
      const orderData = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: adjustedItemsPrice.toFixed(2), // Ensure decimal format
        shippingPrice: cart.shippingPrice.toFixed(2),
        taxPrice: cart.taxPrice.toFixed(2),
        totalPrice: adjustedTotalPrice.toFixed(2),
      };

      const res = await createOrder(orderData).unwrap();

      // Clear cart and navigate to order confirmation
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Error occurred while placing the order');
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong> {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              
              <ListGroup.Item>
                <LoyaltyStatus userId={userInfo?._id} cartItems={cart.cartItems} pastItemsCount={getPastItemsCount()} />
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${adjustedItemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${adjustedTotalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
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
