const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath path to the CSV data file.
 * @throws {Error} If db cannot be loaded.
 * @returns {void}
 */
const countStudents = (dataPath) => {
  // Check if the dataPath exists, throw an error if it doesn't
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }
  // Check if dataPath is a file, throw an error if it's not
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }

  // Read the content of the CSV file and split it into lines
  const fileLines = fs
    .readFileSync(dataPath, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');

  // Initialize an object to store student groups
  const studentGroups = {};

  // Extract field names from the first line of the CSV
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
    const studentEntries = studentPropNames
      .map((propName, idx) => [propName, studentPropValues[idx]]);
    // Convert array of pairs to an object & push to corresponding student group
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
};

module.exports = countStudents;
