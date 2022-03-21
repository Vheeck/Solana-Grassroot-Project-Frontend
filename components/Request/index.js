const backendServerAddress = process.env.NEXT_PUBLIC_API_ENPOINT;

const sendRequest = (endpoint, type, body, headers) => {
  const custom = endpoint.indexOf("http") === 0;

  if (!custom) {
    const publicAddress = localStorage.getItem("publicAddress");
    headers = { ...headers, "Content-Type": "application/json" };
    if (publicAddress) {
      headers.Authorization = publicAddress;
    }
  }

  let init = {
    method: type,
    headers,
    // mode: "no-cors",
  };

  if (body) {
    init.body = JSON.stringify(body);
  }

  return fetch(`${custom ? "" : backendServerAddress}${endpoint}`, init);
};

const Request = {
  post: async (endpoint, body, headers = {}) =>
    (await sendRequest(endpoint, "POST", body, headers)).json(),
  get: async (endpoint, headers = {}) =>
    (await sendRequest(endpoint, "GET", false, headers)).json(),
};

export default Request;
