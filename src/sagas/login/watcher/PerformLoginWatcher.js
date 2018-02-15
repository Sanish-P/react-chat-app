import { PERFORM_LOGIN, USE_REFRESH_TOKEN } from 'src/constants';
import { takeLatest } from 'redux-saga/effects';
import { performLoginTask } from '../task';

export default function* watchPerformLogin() {
  //watcher for task
  console.log('after kick');
  const action = yield takeLatest([PERFORM_LOGIN, USE_REFRESH_TOKEN], performLoginTask); // take will stop the yield but not takeLatest
  console.log('watcher completed', action);
}

// takeLatest runs the watcher in background and returns a task instannce of the background task
// take holds execution and returns action object when watched action is triggered
