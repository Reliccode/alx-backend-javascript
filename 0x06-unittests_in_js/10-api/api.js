// Importing the express module
const express = require('express');

// Creating an instance of the express application
const app = express();

// Port number on which the server will listen for incoming requests
const PORT = 7865;

// Middleware to parse incoming request bodies as JSON
app.use(express.json());

// Route handler for the root path ('/')
app.get('/', (_req, res) => {
  // Sending a welcome message to clients accessing the root path
  res.send('Welcome to the payment system');
});

// Route handler for the '/cart/:id' path
app.get('/cart/:id(\\d+)', (req, res) => {
  // Extracting the cart ID from the request parameters
  const id = req.params.id;

  // Sending a response with payment methods information for the specified cart ID
  res.send(`Payment methods for cart ${id}`);
});

// Route handler for the '/available_payments' path
app.get('/available_payments', (_req, res) => {
  // Sending a JSON response with available payment methods
  res.json({ payment_methods: { credit_cards: true, paypal: false } });
});

// Route handler for the '/login' path (POST method)
app.post('/login', (req, res) => {
  let username = '';

  // Extracting the username from the request body
  if (req.body) {
    username = req.body.userName;
  }

  // Sending a welcome message with the extracted username
  res.send(`Welcome ${username}`);
});

// Starting the server and listening for incoming requests on the specified port
app.listen(PORT, () => {
  // Logging a message to indicate that the API is available and listening on the specified port
  console.log(`API available on localhost port ${PORT}`);
});

// Exporting the express application to make it accessible from other modules
module.exports = app;
