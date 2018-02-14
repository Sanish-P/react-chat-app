import { call, put } from 'redux-saga/effects';
import loginAPI, { fetchProfileAPI } from '../api';
import { setClient, fetchProfile } from 'src/store/actionCreators/login';

export const performLoginTask = function* (action) {
  //task
  let { payload, resolve, reject } = action;
  try {
    let authResponse = yield call(loginAPI, payload);
    yield put(fetchProfile(resolve, reject));
  } catch (e) {
    reject(e);
  }
};

export const fetchProfileTask = function* (action) {
  let { resolve, reject } = action;
  try {
    let profile = yield call(fetchProfileAPI);
    yield put(setClient(profile))
    resolve({})
  } catch (e) {
    reject(e)
  }
}
