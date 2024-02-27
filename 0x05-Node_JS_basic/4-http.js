const http = require('http');

// Define the port and host
const PORT = 1245;
const HOST = 'localhost';

// Create an HTTP server
const app = http.createServer();

// Event listener for incoming requests
app.on('request', (_, res) => {
  // Define the response text
  const responseText = 'Hello Holberton School!';

  // Set the response headers
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', responseText.length);

  // Set the status code
  res.statusCode = 200;

  // Write the response body
  res.write(Buffer.from(responseText));
});

// Listen for connections on the specified port and host
app.listen(PORT, HOST, () => {
  // Log a message indicating that the server is listening
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

// Export the HTTP server
module.exports = app;
