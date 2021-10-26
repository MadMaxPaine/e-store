import axios from 'axios';

const $host = axios.create({
 baseURL: process.env.REACT_APP_API_URL
});

const $authhost = axios.create({
 withCredentials: true,
 baseURL: process.env.REACT_APP_API_URL
});

const authInterceptor = config => {
 config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
 return config;
}

$authhost.interceptors.request.use(authInterceptor);
$authhost.interceptors.response.use((config) => config, async (error) => {
 const originalReq = error.config;
 if (error.response.status === 401 && error.config && !error._isRetry) {
  originalReq._isRetry = true;
  try {
   const res = await axios.get('api/user/refresh', { withCredentials: true });
   localStorage.setItem('token', res.data.accessToken);
   $authhost.request(originalReq);
  }
  catch (e) {
   console.log(e.response?.data?.message);
  }
 }
 throw error;
});
// $host.interceptors.request.use(authInterceptor);
// $host.interceptors.response.use((config) => config, async (error) => {
//  const originalReq = error.config;
//  if (error.response.status === 401 && error.config && !error._isRetry) {
//   originalReq._isRetry = true;
//   try {
//    const res = await axios.get('api/user/refresh', { withCredentials: true });
//    localStorage.setItem('token', res.data.accessToken);
//    $host.request(originalReq);
//   }
//   catch (e) {
//    console.log(e.response?.data?.message);
//   }
//  }
//  throw error;
// });

export {
 $host,
 $authhost
}