import axios from 'axios';

export const checkLoyaltyStatusBeforePayment = (userId, cartItems) => async (dispatch) => {
    try {
        const { data } = await axios.post(`/api/loyalty/check-before-payment/${userId}`, { cartItems });
        dispatch({
            type: 'CHECK_LOYALTY_STATUS',
            payload: data
        });
    } catch (error) {
        dispatch({
            type: 'LOADING_ERROR',
            payload: error.response && error.response.data.message 
                      ? error.response.data.message 
                      : error.message
        });
    }
};