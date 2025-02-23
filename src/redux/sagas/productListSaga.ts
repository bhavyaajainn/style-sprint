import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from '../actions/actionTypes';

function* fetchProducts(action: any) {
  const {page} = action.payload
  const options = {
    method: 'GET',
    url: 'https://unofficial-shein.p.rapidapi.com/products/list',
    params: {
      language: 'en',
      country: 'US',
      currency: 'USD',
      cat_id: '1980',
      adp: '10170797',
      sort: '7',
      limit: '100',
      page: `${page}`
    },
    headers: {
      'x-rapidapi-key': 'ffb3187d6dmshfae3f76f893b286p155121jsn108dc4c2eca4',
      'x-rapidapi-host': 'unofficial-shein.p.rapidapi.com'
    }
  };

  try {
    //@ts-ignore
    const response = yield call(axios.request, options);
    yield put({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error: any) {
    yield put({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
}

function* productSaga() {
  yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProducts);
}

export default productSaga;
