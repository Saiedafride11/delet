export const handleResponseErrorMessage = (responseError, setError) => {
  const errorMessage =
    responseError?.data?.message?.message ||
    responseError?.data?.message ||
    responseError?.data?.error ||
    responseError?.error;
  setError(errorMessage);
};
