/**
 * Performs mathematical operations based on specified type.
 * @param {string} type - type of operation to perform (SUM, SUBTRACT, DIVIDE).
 * @param {number} a - first operand.
 * @param {number} b - second operand.
 * @returns {number|string} result of operation or 'Error' if division by zero occurs.
 */
const calculateNumber = (type, a, b) => {
    // Round operands to nearest integer
    const roundedA = Math.round(a);
    const roundedB = Math.round(b);
  
    // Perform operation based on specified type
    if (type === 'SUM') {
      return roundedA + roundedB; // Return sum of rounded operands
    }
    if (type === 'SUBTRACT') {
      return roundedA - roundedB; // Return difference of rounded operands
    }
    if (type === 'DIVIDE') {
      if (roundedB === 0) {
        return 'Error'; // Return 'Error' if second operand is zero
      }
      return roundedA / roundedB; // Return quotient of rounded operands
    }
  
    return 0; // Return 0 if an invalid type is provided
  };
  
  module.exports = calculateNumber;
  