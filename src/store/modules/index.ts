import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

import TodosReducer, { TodosSaga } from './todos';

export function* RootSaga() {
  yield fork(TodosSaga);
}

export default combineReducers({
  TodosReducer,
});
