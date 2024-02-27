/**
 * Program prompts user for name. reads input & displays name
 * along with closing message
 */

// Display initial message
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// set encoding for stdin stream to UTF-8
process.stdin.setEncoding('utf-8');

// listen for data events on user input
process.stdin.on('data', (data) => {
  // trim leading or trailing whitespace from user input
  const input = data.trim();

  // check if input is not empty
  if (input) {
    // display entered name along with message
    console.log(`Your name is: ${input}`);
  } else {
    // display message if input empty
    console.log('Your name is empty');
  }

  // display closing message
  console.log('This important software is now closing');

  // exit the process
  process.exit();
});
