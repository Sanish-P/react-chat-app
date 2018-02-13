import { PERFORM_LOGIN } from 'src/constants';
import { takeLatest, take } from 'redux-saga/effects';
import { performLogin } from '../task';

export default function* watchPerformLogin() {
  //watcher for task
  console.log('after kick');
  const action = yield takeLatest(PERFORM_LOGIN, performLogin); // take will stop the yield but not takeLatest
  console.log('watcher completed', action);
}

// takeLatest runs the watcher in background and returns a task instannce of the background task
// take holds execution and returns action object when watched action is triggered
