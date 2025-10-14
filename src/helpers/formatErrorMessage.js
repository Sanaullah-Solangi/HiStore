const formatErrorMessage = (error) => {
  let errorMessage;
  try {
    errorMessage = JSON.parse(error.message);
  } catch (err) {
    errorMessage = error.message;
  }
  let messages = null;

  if (typeof errorMessage === "object" && errorMessage !== null) {
    const keys = Object.keys(errorMessage);
    messages = keys.map((key) => `${errorMessage[key]}`);
  } else {
    messages = errorMessage;
  }

  return messages;
};

export default formatErrorMessage;
