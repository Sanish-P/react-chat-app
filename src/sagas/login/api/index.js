import axios from 'src/utils/axios';

export default function callLoginAPI(reqData) {
  return axios
    .post('/auth/token', reqData)
    .then(({ data }) => {
      window.sessionStorage.setItem('access_token', data.access_token);
      window.sessionStorage.setItem('refresh_token', data.refresh_token);
      axios.get('/user/me').then(({ data }) => {
        window.sessionStorage.setItem('user_id', data.user_id);
      });
      return data;
    })
    .catch(e => {
      throw e;
    });
}
