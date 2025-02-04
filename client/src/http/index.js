import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authhost = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
};

$authhost.interceptors.request.use(authInterceptor);

$authhost.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;

    if (error.response.status === 401 && !originalReq._isRetry) {
      originalReq._isRetry = true;

      try {
        const res = await axios.get("api/user/refresh", {
          withCredentials: true,
        });
        localStorage.setItem("token", res.data.accessToken);

        return $authhost.request(originalReq);
      } catch (e) {
        console.log("Error refreshing token", e.response?.data?.message);
      }
    }
    throw error;
  }
);

export { $host, $authhost };
