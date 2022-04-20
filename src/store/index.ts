import { configureStore, Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer, { RootSaga } from './modules';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

let middleware: Middleware[] = [sagaMiddleware];
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  middleware = middleware.concat(loggerMiddleware);
}

const store = configureStore({
  reducer,
  middleware,
  devTools: isDev,
});
sagaMiddleware.run(RootSaga);

export type IStoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
