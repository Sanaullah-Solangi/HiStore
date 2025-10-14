const sendRequest = async (url, method = "GET", data) => {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result; // ✅ success case
  } catch (error) {
    console.log("error in sendRequest =>", error);
    throw error;
  }
};

export default sendRequest;
