const backendServerAddress = "http://localhost:5000";

const sendRequest = (endpoint, type, body) => {
  const publicAddress = JSON.parse(localStorage.getItem("publicAddress"));
  
  let headers = {
    "Content-Type": "application/json",
  };

  if (publicAddress) {
    headers.Authorization = publicAddress;
  }

  let init = {
    method: type,
    headers,
    // mode: "no-cors",
  };

  if (body) {
    init.body = JSON.stringify(body);
  }

  return fetch(`${backendServerAddress}${endpoint}`, init);
};

const Request = {
  post: async (endpoint, body) =>
    (await sendRequest(endpoint, "POST", body)).json(),
  get: async (endpoint) => (await sendRequest(endpoint, "GET", false)).json(),
};

export default Request;
