import { all } from 'redux-saga/effects';
import productListSaga from './productListSaga';
import productDetailSaga from './productDetailSaga';

export default function* rootSaga() {
  yield all([
    productListSaga(),
    productDetailSaga()
  ]);
}