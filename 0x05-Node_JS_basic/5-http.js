const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const DB_FILE = process.argv[2] || '';

// Function to count students from CSV data
const countStudents = (dataPath) => {
  return new Promise((resolve, reject) => {
    if (!dataPath) {
      reject(new Error('Cannot load the database'));
    }
    fs.readFile(dataPath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const fileLines = data.trim().split('\n');
        const studentGroups = {};
        const dbFieldNames = fileLines[0].split(',');
        const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

        for (const line of fileLines.slice(1)) {
          const studentRecord = line.split(',');
          const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
          const field = studentRecord[studentRecord.length - 1];
          if (!Object.keys(studentGroups).includes(field)) {
            studentGroups[field] = [];
          }
          const studentEntries = studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]]);
          studentGroups[field].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(studentGroups).reduce((pre, cur) => (pre || []).length + cur.length);
        const reportParts = [`Number of students: ${totalStudents}`];
        for (const [field, group] of Object.entries(studentGroups)) {
          reportParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', ')
          ].join(' '));
        }
        resolve(reportParts.join('\n'));
      }
    });
  });
};

// Create HTTP server
const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!\n');
  } else if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    countStudents(DB_FILE)
      .then(report => {
        res.end(`This is the list of our students\n${report}`);
      })
      .catch(error => {
        res.end(error.message);
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

// Listen on port
app.listen(PORT, HOST, () => {
  console.log(`Server listening at -> http://${HOST}:${PORT}`);
});

module.exports = app;
