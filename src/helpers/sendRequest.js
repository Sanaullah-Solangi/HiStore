const sendRequest = async (url, method, data) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    if (method) {
      options.method = method;
    }

    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error in sendRequest =>", error);
  }
};

export default sendRequest;
