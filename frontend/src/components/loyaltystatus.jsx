import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkLoyaltyStatusBeforePayment } from '../action/loyaltyaction';
import PropTypes from 'prop-types';

const LoyaltyStatus = ({ userId, cartItems = [], pastItemsCount }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [isEligible, setIsEligible] = useState(false);
    const [freeItem, setFreeItem] = useState(null);

    useEffect(() => {
        const checkLoyaltyStatus = async () => {
            if (userId && Array.isArray(cartItems) && cartItems.length > 0) {
                try {
                    await dispatch(checkLoyaltyStatusBeforePayment(userId, cartItems));
                    const { isEligible, freeItem } = checkEligibility(userId, cartItems, pastItemsCount);
                    setIsEligible(isEligible);
                    setFreeItem(freeItem);
                } catch (error) {
                    console.error("Error checking loyalty status:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        checkLoyaltyStatus();
    }, [dispatch, userId, cartItems, pastItemsCount]);

    const checkEligibility = (userId, cartItems, pastItemsCount) => {
        const currentItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
        const totalItemsCount = currentItemsCount + pastItemsCount;
        const isEligible = totalItemsCount >= 6;

        let freeItem = null;

        if (isEligible) {
            const cheapestItem = cartItems.reduce((cheapest, item) => {
                return !cheapest || item.price < cheapest.price ? item : cheapest;
            }, null);

            if (cheapestItem) {
                freeItem = {
                    _id: cheapestItem._id || 'free-item-id', // Ensure this is unique
                    name: `${cheapestItem.name} (Free Loyalty Reward)`,
                    price: 0, // Set price to zero
                    qty: 1,
                    product: cheapestItem.product || cheapestItem._id, // Ensure this is valid
                };
            }
        }

        return { isEligible, freeItem };
    };

    if (loading) {
        return <p>Loading loyalty status...</p>;
    }

    return (
        <div>
            <h3>Loyalty Program</h3>
            {isEligible ? (
                <p>
                    Congratulations! You have completed loyalty status and you are eligible for a loyalty reward! <br />
                    Free Item: <strong>{freeItem ? freeItem.name : 'Cheapest Item'}</strong> (worth ${freeItem ? freeItem.price.toFixed(2) : '0.00'})
                </p>
            ) : (
                <p>You are not eligible for a loyalty reward.</p>
            )}
        </div>
    );
};

// Define PropTypes for better type checking
LoyaltyStatus.propTypes = {
    userId: PropTypes.string.isRequired,
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            qty: PropTypes.number.isRequired,
            product: PropTypes.string.isRequired, // Ensure product is a string (ID)
        })
    ).isRequired,
    pastItemsCount: PropTypes.number.isRequired, // Count of past items
};

export default LoyaltyStatus;
