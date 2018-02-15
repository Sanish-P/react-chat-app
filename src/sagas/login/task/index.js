import { call, put } from 'redux-saga/effects';
// import { delay } from  'redux-saga';
import loginAPI, { fetchProfileAPI } from '../api';
import { setClient, fetchProfile } from 'src/store/actionCreators/login';

export const performLoginTask = function* (action) {
  //task
  let { payload, resolve, reject } = action;
  try {
    let authResponse = yield call(loginAPI, payload);
    resolve({});
  } catch (e) {
    reject(e);
  }
};

export const fetchProfileTask = function* (action) {
  let { resolve, reject } = action;
  try {
    let profile = yield call(fetchProfileAPI);
    yield put.resolve(setClient(profile))
    // yield call(delay, 6000); //if you want delay
    resolve({})
  } catch (e) {
    reject(e)
  }
}
