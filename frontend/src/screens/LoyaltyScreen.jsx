import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { useGetLoyaltyHistoryQuery, useAddLoyaltyRewardMutation } from "../slices/loyaltyApiSlice";

const LoyaltyScreen = () => {
  const [name, setName] = useState(""); 
  const [loyaltyStatus, setLoyaltyStatus] = useState(null);
  const [message, setMessage] = useState("");  

  const { userInfo } = useSelector((state) => state.auth);

  const { data: orders, isLoading: loadingOrders, error: ordersError } = useGetMyOrdersQuery();
  const { data: loyaltyHistory, isLoading, error, refetch } = useGetLoyaltyHistoryQuery();
  const [addLoyaltyReward, { isLoading: loadingReward }] = useAddLoyaltyRewardMutation();

  useEffect(() => {
    setName(userInfo.name);

    if (orders && loyaltyHistory) {
      const lastRedemption = loyaltyHistory[0]?.redeemedAt || null;
      calculateLoyaltyStatus(orders, lastRedemption);
    }
  }, [userInfo.email, userInfo.name, orders, loyaltyHistory]);

  const calculateLoyaltyStatus = (orders, lastRedeemedAt) => {
    const lastRedemptionDate = lastRedeemedAt ? new Date(lastRedeemedAt) : null;
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  
    // Consider only orders created after the last redemption and within the last 2 months.
    const recentOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate >= twoMonthsAgo &&
        (!lastRedemptionDate || orderDate > lastRedemptionDate) &&
        order.paymentResult?.status === "COMPLETED" &&
        !order.usedForLoyalty 
      );
    });
  
    const totalItems = recentOrders.reduce((acc, order) => {
      return acc + order.orderItems.reduce((sum, item) => sum + item.qty, 0);
    }, 0);
  
    const itemsNeededForReward = 6;
  
    // If the user has reached the threshold, they become eligible for a new reward.
    if (totalItems >= itemsNeededForReward) {
      const cheapestItem = recentOrders
        .flatMap((order) => order.orderItems)
        .reduce((cheapest, item) => item.price < cheapest.price ? item : cheapest);
  
      setLoyaltyStatus({
        eligible: true,
        rewardItem: {
          name: cheapestItem.name || "",  
          image: cheapestItem.image || "", 
          price: 0,                        
        },
        message: `Congratulations! You are eligible for a free item: ${cheapestItem.name}.`,
      });
    } else {
      const remaining = itemsNeededForReward - totalItems;
      setLoyaltyStatus({
        eligible: false,
        remainingItems: remaining,
        message: `You need ${remaining} more purchases to get a free item within the next 2 months.`,
      });
    }
  };

  const redeemItem = async () => {
    const { rewardItem } = loyaltyStatus;

    if (!rewardItem || !rewardItem.name || !rewardItem.image) {
      setMessage("Reward item is missing or incomplete.");
      return;
    }

    try {
      await addLoyaltyReward({ name: rewardItem.name, image: rewardItem.image, price: rewardItem.price || 0 });
      setMessage("Reward successfully redeemed! You need 6 more items to earn another reward.");
      refetch();

      // // After redemption, reset the eligibility to false and show the new progress message.
      // setLoyaltyStatus({
      //   eligible: false,
      //   remainingItems: 6,
      //   message: "You need 6 more items to earn another reward within the next 2 months.",
      // });
    } catch (error) {
      setMessage("There was an error redeeming your reward.");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>{name}</h2>
      </Col>
      <Col md={9}>
        <h2>Loyalty History</h2>

        {isLoading || loadingOrders ? (
          <Loader />
        ) : error || ordersError ? (
          <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : (
          <div>
            {loyaltyStatus && (
              <Message variant={loyaltyStatus.eligible ? "success" : "info"}>
                {loyaltyStatus.message}
              </Message>
            )}
            {message && <Message variant="info">{message}</Message>}  

            {loyaltyStatus?.eligible && (
              <div>
                <h4>Redeem your reward:</h4>
                <Card className="my-3 p-3 rounded" style={{ width: '36rem'}}>
                  <Card.Img
                    variant="top"
                    src={loyaltyStatus.rewardItem.image}
                    alt={loyaltyStatus.rewardItem.name}
                    style={{ objectFit: 'cover', width: '100%', height: 'auto' }} 
                  />
                  <Card.Body>
                    <Card.Title>{loyaltyStatus.rewardItem.name}</Card.Title>
                    <Card.Text>Price: $0 (Free)</Card.Text>
                    <Button onClick={redeemItem} variant="success">
                      Get Reward
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            )}

            <h4 className="mt-4">Redeemed Items History</h4>
            {loyaltyHistory?.length === 0 ? (
              <Message>No rewards redeemed yet.</Message>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ITEM</th>
                    <th>DATE REDEEMED</th>
                    <th>PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {loyaltyHistory.map((reward) => (
                    <tr key={reward._id}>
                      <td>{reward.rewardItem.name}</td>
                      <td>{new Date(reward.redeemedAt).toLocaleDateString()}</td>
                      <td>$0 (Free)</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        )}
      </Col>
    </Row>
  );
};

export default LoyaltyScreen;
