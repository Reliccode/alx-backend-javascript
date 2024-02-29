// Importing the express module
const express = require('express');

// Creating an instance of the express application
const app = express();

// Port number on which the server will listen for incoming requests
const PORT = 7865;

// Route handler for the root path ('/')
app.get('/', (_, res) => {
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

// Starting the server and listening for incoming requests on the specified port
app.listen(PORT, () => {
  // Logging a message to indicate that the API is available and listening on the specified port
  console.log(`API available on localhost port ${PORT}`);
});

// Exporting the express application to make it accessible from other modules
module.exports = app;
