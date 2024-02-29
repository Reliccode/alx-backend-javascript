// Importing Utils module which contains the calculateNumber function
const Utils = require('./utils');

/**
 * Sends a payment request to the API.
 * Calculates total cost by summing total amount & total shipping using Utils.calculateNumber.
 * Prints the total cost to the console.
 * @param {number} totalAmount - The total amount of the payment.
 * @param {number} totalShipping - The total shipping cost.
 */
const sendPaymentRequestToApi = (totalAmount, totalShipping) => {
  // Calculate the total cost by summing the total amount and total shipping
  const totalCost = Utils.calculateNumber('SUM', totalAmount, totalShipping);
  
  // Print the total cost to the console
  console.log(`The total is: ${totalCost}`);
};

// Export sendPaymentRequestToApi function to make it accessible from other modules
module.exports = sendPaymentRequestToApi;
