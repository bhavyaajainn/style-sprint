
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './redux/reducers/rootReducer';
import rootSaga from './redux/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const reduxStore = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
