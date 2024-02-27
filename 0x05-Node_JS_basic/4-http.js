const http = require('http');

// create the HTTP server
const app = http.createServer((req, res) => {
  // set the status code and content type header
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // send the response body
  res.end('Hello Holberton School!\n');
});

// listen on port 1245
app.listen(1245);

module.exports = app;
