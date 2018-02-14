import { watchPerformLogin, watchFetchProfile } from './login/watcher';

export default function* rootSaga() {
  console.log('kick off generators');
  yield [watchPerformLogin(), watchFetchProfile()];
}
