import axios from 'src/utils/axios';

export default function loginAPI(reqData) {
  return axios
    .post('/auth/token', reqData)
    .then(({ data }) => {
      window.sessionStorage.setItem('access_token', data.access_token);
      window.sessionStorage.setItem('refresh_token', data.refresh_token);
      return data;
    })
    .catch(e => {
      throw e;
    });
}

export const fetchProfileAPI = function () {
  return axios
    .get('/user/me').then(({ data }) => {
      return data;
    })
}
