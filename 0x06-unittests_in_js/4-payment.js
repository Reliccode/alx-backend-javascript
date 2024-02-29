// Importing Utils module which contains the calculateNumber function
const Utils = require('./utils');

/**
 * Sends a payment request to the API and logs the total cost.
 * 
 * calculates total cost by summing total amt & total shipping using Utils.calculateNumber.
 * It then logs the total cost to the console.
 * 
 * @param {number} totalAmount - The total amount of the payment.
 * @param {number} totalShipping - The total shipping cost.
 */
const sendPaymentRequestToApi = (totalAmount, totalShipping) => {
  // Calculate the total cost by summing the total amount and total shipping
  const totalCost = Utils.calculateNumber('SUM', totalAmount, totalShipping);
  
  // Log the total cost to the console
  console.log(`The total is: ${totalCost}`);
};

// Export the sendPaymentRequestToApi function to make it accessible from other modules
module.exports = sendPaymentRequestToApi;
