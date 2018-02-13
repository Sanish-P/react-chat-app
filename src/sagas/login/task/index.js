import { call, put } from 'redux-saga/effects';
import callLoginAPI from '../api';
import { setClient } from 'src/store/actionCreators/login';

export const performLogin = function* (action) {
  //task
  let { payload, resolve, reject } = action;
  try {
    let authResponse = yield call(callLoginAPI, payload);
    yield put(setClient(authResponse))
    resolve(authResponse)
  } catch (e) {
    reject(e);
  }
};
