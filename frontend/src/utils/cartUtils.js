export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  export const updateCart = (state) => {
    // Calculate the items price in whole number (pennies) to avoid issues with
    // floating point number calculations
    const itemsPrice = state.cartItems.reduce(
      (acc, item) => acc + (item.price * 100 * item.qty) / 100,
      0
    );
    state.itemsPrice = addDecimals(itemsPrice);
  
    // Calculate the shipping price for 100 and less than 100
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    state.shippingPrice = addDecimals(shippingPrice);
  
    // Calculate the tax price 15%
    const taxPrice = 0.15 * itemsPrice;
    state.taxPrice = addDecimals(taxPrice);
  
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    // Calculate the total price
    state.totalPrice = addDecimals(totalPrice);
  
    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(state));
  
    return state;
  };