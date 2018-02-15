// @flow

import axios from 'axios';
import history from 'src/utils/history.js';
import config from 'config';
import { useRefreshToken } from 'src/store/actionCreators/login'
import store from 'src/store'

const { baseURL, timeout } = config();

const instance = axios.create({
  baseURL,
  timeout
});

let savedConfig;

function _useRefreshToken() {
  console.log('use refresh');
  let refreshToken = window.sessionStorage.getItem('refresh_token');
  let reqData = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };
  return new Promise(function(resolve, reject) {
    // Promise aliasing returned promise resolves when _continuePrevReq does
    new Promise(function (res, rej) {
      store.dispatch(useRefreshToken(reqData, res, rej));
    })
    .then(() => {
      _continuePrevReq()
        .then(function(res) {
          console.log('resolved', res);
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
    // instance
    //   .post('/auth/token', reqData)
    //   .then(function({ data }) {
    //     console.log('Access token refreshed using refresh token');
    //     window.sessionStorage.setItem('access_token', data.access_token);
    //     window.sessionStorage.setItem('refresh_token', data.refresh_token);
    //     _continuePrevReq()
    //       .then(function(res) {
    //         resolve(res);
    //       })
    //       .catch(function(err) {
    //         reject(err);
    //       });
    //   })
    //   .catch(function() {
    //     // TODO: Write redirect code here
    //     sessionStorage.clear();
    //     history.push('/'); // find better way in future
    //   });
  });
}
function _continuePrevReq() {
  console.log('continued request');
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
    if (err.response && err.response.status === 401) {
      return _useRefreshToken(); // Return the continued req promise
    } else {
      return Promise.reject(err);
    }
  }
);

export default instance;
