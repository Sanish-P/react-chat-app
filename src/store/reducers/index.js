import { combineReducers } from 'redux';
import clientReducer from './client';

const testReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  counter: testReducer,
  client: clientReducer
});

export default rootReducer;
