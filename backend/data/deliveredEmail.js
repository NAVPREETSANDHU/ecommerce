const deliveredEmail = (link) => {
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
          <h1>Your order has been delivered to your address!</h1>
        </div>
        <div class="content">
          <p>Dear Customer,</p>
          <p>Your order has been delivered today.</p>
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
  
  export default deliveredEmail;
  