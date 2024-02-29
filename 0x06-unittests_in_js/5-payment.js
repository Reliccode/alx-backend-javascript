// Importing the Utils module which contains the calculateNumber function
const Utils = require('./utils');

/**
 * Sends a payment request to the API.
 * 
 * This func calculates total cost of a payment by summing total amt & shipping.
 * It then logs the total cost to the console.
 * 
 * @param {number} totalAmount - The total amount of the payment.
 * @param {number} totalShipping - The total shipping cost.
 */
const sendPaymentRequestToApi = (totalAmount, totalShipping) => {
  // Calculate total cost by summing total amt & shipping using calculateNumber func from Utils
  const totalCost = Utils.calculateNumber('SUM', totalAmount, totalShipping);
  
  // Log the total cost to the console
  console.log(`The total is: ${totalCost}`);
};

// Exporting the sendPaymentRequestToApi function to make it accessible from other modules
module.exports = sendPaymentRequestToApi;
