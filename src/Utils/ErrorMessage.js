export const getErrorMessage = (err, defaultMsg) =>
  (err.response && err.response.data && err.response.data.message) ||
  err.message ||
  defaultMsg;
