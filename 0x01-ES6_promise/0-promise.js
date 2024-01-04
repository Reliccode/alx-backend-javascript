export default function getResponseFromAPI() {
  return new Promise((resolve, reject) => {
    const gotResponse = true;
    if (gotResponse) {
      resolve('true');
    } else {
      reject(new Error('false'));
    }
  });
}
