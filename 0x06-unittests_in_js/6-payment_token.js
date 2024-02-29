/**
 * Retrieves a payment token from the API.
 * 
 * This function simulates an asynchronous operation by returning a Promise.
 * If the operation is successful (success is true), it resolves the Promise with a successful response object.
 * 
 * @param {boolean} success - Indicates whether the operation should succeed or fail.
 * @returns {Promise<object>} A Promise that resolves with the response object if the operation is successful.
 */
const getPaymentTokenFromAPI = (success) => new Promise((resolve, _reject) => {
    // Simulate an asynchronous operation
    if (success) {
      // If the operation is successful, resolve the Promise with a successful response object
      resolve({ data: 'Successful response from the API' });
    }
  });
  
  // Export the getPaymentTokenFromAPI function to make it accessible from other modules
  module.exports = getPaymentTokenFromAPI;
  