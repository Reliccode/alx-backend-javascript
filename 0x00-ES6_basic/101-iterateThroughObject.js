export default function iterateThroughObject(reportWithIterator) {
  const separator = ' | ';
  let result = '';

  for (const employee of reportWithIterator) {
    result += employee + separator;
  }

  // Remove the trailing separator
  result = result.slice(0, -separator.length);

  return result;
}
