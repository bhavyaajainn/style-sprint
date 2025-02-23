import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_PRODUCT_DETAIL_REQUEST,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_FAILURE
} from '../actions/actionTypes';

function* fetchProducts(action:any) {
  const {id} = action.payload
    const options = {
        method: 'GET',
        url: 'https://unofficial-shein.p.rapidapi.com/products/v2/detail',
        params: {
          language: 'en',
          country: 'US',
          currency: 'USD',
          goods_id: `${id}`
        },
        headers: {
          'x-rapidapi-key': 'ffb3187d6dmshfae3f76f893b286p155121jsn108dc4c2eca4',
          'x-rapidapi-host': 'unofficial-shein.p.rapidapi.com'
        }
      };

  try {
    //@ts-ignore
    const response = yield call(axios.request, options);
    yield put({ type: FETCH_PRODUCT_DETAIL_SUCCESS, payload: response.data });
  } catch (error: any) {
    yield put({ type: FETCH_PRODUCT_DETAIL_FAILURE, payload: error.message });
  }
}

function* productDetailSaga() {
  yield takeEvery(FETCH_PRODUCT_DETAIL_REQUEST, fetchProducts);
}

export default productDetailSaga;
