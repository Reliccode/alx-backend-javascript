export default function concatArrays(array1, array2, string) {
  const result = [...array1, ...array2, ...string.split('')];// spread operator is like rest
  return result;
}
