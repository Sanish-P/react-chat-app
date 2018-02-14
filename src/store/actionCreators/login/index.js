import { CLIENT_SET, CLIENT_UNSET, PERFORM_LOGIN, FETCH_PROFILE } from 'src/constants';

export function setClient({ user_id }) {
  return {
    type: CLIENT_SET,
    payload: {
      user_id
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

export function fetchProfile(resolve, reject) {
  return {
    type: FETCH_PROFILE,
    resolve,
    reject
  }
}
