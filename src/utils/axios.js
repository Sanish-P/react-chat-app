import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000
});
let savedConfig;

function _useRefreshToken() {
  let refreshToken = window.sessionStorage.getItem('refresh_token');
  let userId = window.sessionStorage.getItem('user_id');
  let reqData = {
    'grant_type': 'refresh_token',
    'refresh_token': refreshToken,
    'user_id': userId
  }
  instance.post('/auth/token', reqData).then(function ({data}) {
    console.log('Access token refreshed using refresh token');
    window.sessionStorage.setItem('access_token', data.access_token);
    window.sessionStorage.setItem('refresh_token', data.refresh_token);
    _continuePrevReq();
  })
}
function _continuePrevReq() {
  console.log('I am continuing prev request ...');
}

instance.interceptors.request.use(
  function(config) {
    if (config.url !== '/auth/token') {
      savedConfig = config;
      let accessToken = window.sessionStorage.getItem('access_token');
      typeof accessToken === 'string' &&
      (config.headers['Authorization'] = `Bearer ${accessToken}`);
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(err) {
    if (err.response.status === 401) {
      _useRefreshToken();
    }
    return Promise.reject(err);
  }
);

export default instance;
