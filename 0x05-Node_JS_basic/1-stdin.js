/**
 * This program prompts the user for their name, reads the input from the command line,
 * and then displays the entered name along with a closing message.
 */

// Display initial message to prompt for user input
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Listen for 'readable' event on stdin (user input)
process.stdin.on('readable', () => {
  // Read input from stdin
  const chunk = process.stdin.read();

  // Check if input is available
  if (chunk) {
    // Display the entered name along with a message
    process.stdout.write(`Your name is: ${chunk}`);
  }
});

// Listen for 'end' event on stdin (end of input)
process.stdin.on('end', () => {
  // Display closing message when the program ends
  process.stdout.write('This important software is now closing\n');
});
