import { takeLatest } from 'redux-saga/effects';
import { FETCH_PROFILE } from 'src/constants';
import { fetchProfileTask } from '../task';

export default function* watchFetchProfile () {
  console.log('fetchProfile triggered');
  let profile = yield takeLatest(FETCH_PROFILE, fetchProfileTask);
}
