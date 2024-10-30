export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Function to update the cart state
export const updateCart = (state) => {
  // Calculate the subtotal price of items (excluding free items)
  const itemsPrice = state.cartItems.reduce((acc, item) => {
      return item.price > 0 ? acc + item.price * item.qty : acc;
  }, 0);

  // Calculate shipping and tax
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Example: Free shipping over $100
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2)); // Example tax rate: 15%

  // Calculate the total price
  let totalPrice = itemsPrice + shippingPrice + taxPrice;

  // Check if the customer is eligible for a loyalty reward (at least 6 items in cart)
  if (state.cartItems.length >= 6) {
      // Find the cheapest item price in the cart (not zero)
      const eligiblePrices = state.cartItems
          .filter(item => item.price > 0) // Only consider items with a price greater than 0
          .map(item => item.price);

      if (eligiblePrices.length > 0) {
          // Get the price of the cheapest item
          const minEligiblePrice = Math.min(...eligiblePrices);
          // Apply the discount by subtracting the cheapest item price from the total price
          totalPrice -= minEligiblePrice;
          console.log(`Applying loyalty discount: -$${minEligiblePrice}`);

          // Find the index of the cheapest item in the cart
          const cheapestItemIndex = state.cartItems.findIndex(item => item.price === minEligiblePrice);

          // If the cheapest item is found, set its price to 0
          if (cheapestItemIndex !== -1) {
              state.cartItems[cheapestItemIndex].price = 0;
              console.log("Setting cheapest item price to 0.");
          } else {
              console.log("Cheapest item not found.");
          }
      } else {
          console.log("No eligible items found for loyalty discount.");
      }
  } else {
      console.log("Not enough items for loyalty discount. Current item count: ", state.cartItems.length);
  }

  // Format total price to two decimal places
  totalPrice = parseFloat(totalPrice.toFixed(2));

  // Update the state
  state.itemsPrice = itemsPrice;
  state.shippingPrice = shippingPrice;
  state.taxPrice = taxPrice;
  state.totalPrice = totalPrice;

  // Save updated state to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  // Log the updated state for debugging
  console.log("Updated cart state:", state);

  return state;
};



