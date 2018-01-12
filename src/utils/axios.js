import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000
})

const accessToken = window.sessionStorage.getItem('access_token');

instance.interceptors.request.use(function (config) {
  (typeof accessToken === 'string') && (config.headers['Authorization'] = `Bearer ${accessToken}`);
  return config;
}, function (error) {
  return Promise.reject(error);
})

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    return Promise.reject(err);
  })


export default instance;
