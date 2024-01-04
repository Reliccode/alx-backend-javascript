export default function handleResponseFromAPI(promise) {
  promise
    .then((result) => {
      /* eslint-disable-line no-unused-vars */
      console.log('Got a response from the API');
      return {
        status: 200,
        body: 'success',
      };
    })
    .catch((error) => {
      /* eslint-disable-line no-unused-vars */
      console.log('Got a response from the API');
      return new Error();
    });
}
