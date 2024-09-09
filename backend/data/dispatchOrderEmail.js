const dispatchOrderEmail = (data) => {
  const { orderItems, totalPrice, taxPrice, shippingAddress, paymentMethod, trackingLink } = data;

  // Format the order items into an HTML list
  const orderItemsHtml = orderItems.map(item => `
    <li>
      <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;"/>
      ${item.name} - ${item.qty} x $${item.price.toFixed(2)}
    </li>
  `).join('');

  return `
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; }
      .container { width: 80%; margin: auto; padding: 20px; }
      .header { background-color: #f8f9fa; padding: 10px; text-align: center; }
      .content { margin-top: 20px; }
      .footer { margin-top: 20px; background-color: #f8f9fa; padding: 10px; text-align: center; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your tracking link for your order is provided below!</h1>
      </div>
      <div class="content">
        <p>Dear Customer,</p>
        <p>Thank you for ordering with Bazaarlia. Your order details are as follows:</p>
        
        <h2>Order Items:</h2>
        <ul>${orderItemsHtml}</ul>
        
        <h2>Total Price:</h2>
        <p>$${totalPrice.toFixed(2)}</p>
        
        <h2>Tax:</h2>
        <p>$${taxPrice.toFixed(2)}</p>
        
        <h2>Shipping Address:</h2>
        <p>${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}</p>
        
        <h2>Payment Method:</h2>
        <p>${paymentMethod}</p>

        <h2>Tracking Link:</h2>
        <p>${trackingLink}</p>
        
        <br>
        <p>Best regards,<br>Marketing Head, <br>Matt Leo</p>
      </div>
      <div class="footer">
        <p>©2024 Bazaarlia. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>`;
};

export default dispatchOrderEmail;
