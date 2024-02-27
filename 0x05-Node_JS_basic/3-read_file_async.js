const fs = require('fs');

/**
 * Counts students in CSV file asynchronously.
 * @param {String} dataPath path to CSV file.
 * @returns {Promise<Boolean>} promise that resolves to true if operation successful.
 * @throws {Error} If db cannot be loaded.
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  // Read the CSV data file asynchronously
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    // Handle errors
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    // Process data if available
    if (data) {
      // Split data into lines
      const fileLines = data
        .toString('utf-8')
        .trim()
        .split('\n');
      // Initialize an object to store student groups
      const studentGroups = {};
      // Extract field names from the first line of the CSV
      const dbFieldNames = fileLines[0].split(',');
      const studentPropNames = dbFieldNames
        .slice(0, dbFieldNames.length - 1);

      // Iterate through each line of the CSV starting from the second line
      for (const line of fileLines.slice(1)) {
        // Split the line into individual fields
        const studentRecord = line.split(',');
        // Extract property values for the student record
        const studentPropValues = studentRecord
          .slice(0, studentRecord.length - 1);
        // Extract the field value for the student record
        const field = studentRecord[studentRecord.length - 1];
        // If the field is not already a key in studentGroups, initialize it as an empty array
        if (!Object.keys(studentGroups).includes(field)) {
          studentGroups[field] = [];
        }
        // Create an array of [propertyName, propertyValue] pairs for each student
        const studentEntries = studentPropNames
          .map((propName, idx) => [propName, studentPropValues[idx]]);
        // Convert array of pairs to an object & push it to corresponding student group
        studentGroups[field].push(Object.fromEntries(studentEntries));
      }

      // Calculate the total number of students
      const totalStudents = Object
        .values(studentGroups)
        .reduce((pre, cur) => (pre || []).length + cur.length);
      // Log the total number of students
      console.log(`Number of students: ${totalStudents}`);

      // Iterate through each student group and log the number of students and their names
      for (const [field, group] of Object.entries(studentGroups)) {
        // Extract student names from the group and join them with a comma
        const studentNames = group.map((student) => student.firstname).join(', ');
        // Log the number of students in the group and their names
        console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
      }

      // Resolve the promise with a value indicating success
      resolve(true);
    }
  });
});

module.exports = countStudents;
