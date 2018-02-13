import { CLIENT_SET, CLIENT_UNSET, PERFORM_LOGIN } from 'src/constants';

export function setClient({ access_token, refresh_token }) {
  return {
    type: CLIENT_SET,
    payload: {
      access_token,
      refresh_token
    }
  };
}

export function unsetClient() {
  return {
    type: CLIENT_UNSET
  };
}

export function loginRequest(payload, resolve, reject) {
  return {
    type: PERFORM_LOGIN,
    payload,
    resolve,
    reject
  };
}
