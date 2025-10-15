const formatErrorMessage = (message) => {
  let errorMessage;
  try {
    errorMessage = JSON.parse(message);
  } catch (err) {
    errorMessage = message;
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
