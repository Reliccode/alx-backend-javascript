const express = require('express');

// Create an Express application
const app = express();

// Define the port number
const PORT = 1245;

// Define a route for the root URL ('/')
app.get('/', (_, res) => {
  // Respond with 'Hello Holberton School!' for requests to the root URL
  res.send('Hello Holberton School!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message indicating that the server is listening
  console.log(`Server listening on PORT ${PORT}`);
});

// Export the Express application for external use
module.exports = app;
