const http = require('http');
const fs = require('fs');

// Define constants for port and host
const PORT = 1245;
const HOST = 'localhost';

// Create an HTTP server
const app = http.createServer();

// Check if a CSV data file path is provided in command line arguments
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file asynchronously.
 * @param {String} dataPath The path to the CSV data file.
 * @returns {Promise<String>} A promise that resolves to a report of students.
 * @throws {Error} If the database cannot be loaded.
 * @author Bezaleel Olakunori <https://github.com/B3zaleel>
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  // Check if dataPath is provided
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }

  // Read the CSV data file asynchronously
  fs.readFile(dataPath, (err, data) => {
    // Handle file read errors
    if (err) {
      reject(new Error('Cannot load the database'));
    }

    // Process data if available
    if (data) {
      const reportParts = [];
      const fileLines = data.toString('utf-8').trim().split('\n');
      const studentGroups = {};
      const dbFieldNames = fileLines[0].split(',');
      const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

      // Iterate through each line of the CSV starting from the second line
      for (const line of fileLines.slice(1)) {
        // Split the line into individual fields
        const studentRecord = line.split(',');
        // Extract property values for the student record
        const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
        // Extract the field value for the student record
        const field = studentRecord[studentRecord.length - 1];
        // If the field is not already a key in studentGroups, initialize it as an empty array
        if (!Object.keys(studentGroups).includes(field)) {
          studentGroups[field] = [];
        }
        // Create an array of [propertyName, propertyValue] pairs for each student
        const studentEntries = studentPropNames.map((propName, idx) => {
            return [propName, studentPropValues[idx]];
        });
        // Convert array of pairs to an object & push it to corresponding student group
        studentGroups[field].push(Object.fromEntries(studentEntries));
      }

      // Calculate the total number of students
      const totalStudents = Object.values(studentGroups)
        .reduce((pre, cur) => (pre || []).length + cur.length);
      reportParts.push(`Number of students: ${totalStudents}`);

      // Iterate through each student group and add information to the reportParts array
      for (const [field, group] of Object.entries(studentGroups)) {
        reportParts.push([
          `Number of students in ${field}: ${group.length}.`,
          'List:',
          group.map((student) => student.firstname).join(', '),
        ].join(' '));
      }

      // Resolve the promise with the report as a single string
      resolve(reportParts.join('\n'));
    }
  });
});

// Define route handlers for different endpoints
const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';

      // Set response headers and status code
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseParts = ['This is the list of our students'];

      // Retrieve student report asynchronously and handle the response
      countStudents(DB_FILE)
        .then((report) => {
          responseParts.push(report);
          const responseText = responseParts.join('\n');
          // Set response headers and status code
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        })
        .catch((err) => {
          responseParts.push(err instanceof Error ? err.message : err.toString());
          const responseText = responseParts.join('\n');
          // Set response headers and status code
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        });
    },
  },
];

// Event listener for incoming requests
app.on('request', (req, res) => {
  // Find the appropriate route handler for the request
  for (const routeHandler of SERVER_ROUTE_HANDLERS) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

// Start the HTTP server
app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

// Export the HTTP server
module.exports = app;
