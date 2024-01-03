export default function appendToEachArrayValue(array, appendString) {
  const newArray = []; // new array to avoid directly modifying array paramter

  for (const value of array) {
    newArray.push(appendString + value);
  }

  return newArray;
}
