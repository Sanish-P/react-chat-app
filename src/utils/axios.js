// @flow

import axios from 'axios';
import history from 'src/utils/history.js';
import config from 'config';

const { baseURL, timeout } = config();

const instance = axios.create({
  baseURL,
  timeout
});

let savedConfig;

function _useRefreshToken() {
  let refreshToken = window.sessionStorage.getItem('refresh_token');
  let userId = window.sessionStorage.getItem('user_id');
  let reqData = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    user_id: userId
  };
  return new Promise(function(resolve, reject) {
    // Promise aliasing returned promise resolves when _continuePrevReq does
    instance
      .post('/auth/token', reqData)
      .then(function({ data }) {
        console.log('Access token refreshed using refresh token');
        window.sessionStorage.setItem('access_token', data.access_token);
        window.sessionStorage.setItem('refresh_token', data.refresh_token);
        _continuePrevReq()
          .then(function(res) {
            resolve(res);
          })
          .catch(function(err) {
            reject(err);
          });
      })
      .catch(function() {
        // TODO: Write redirect code here
        sessionStorage.clear();
        history.push('/'); // find better way in future
      });
  });
}
function _continuePrevReq() {
  return instance[savedConfig.method](savedConfig.url);
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
      return _useRefreshToken(); // Return the continued req promise
    } else {
      return Promise.reject(err);
    }
  }
);

export default instance;
