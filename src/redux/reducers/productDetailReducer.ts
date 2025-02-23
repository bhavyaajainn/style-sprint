import {
    FETCH_PRODUCT_DETAIL_REQUEST,
    FETCH_PRODUCT_DETAIL_SUCCESS,
    FETCH_PRODUCT_DETAIL_FAILURE
  } from '../actions/actionTypes';
  
  //Add more values
  const initialState = {
    loading: false,
    info: {},
    error: ''
  };
  
  const productDetailReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case FETCH_PRODUCT_DETAIL_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_PRODUCT_DETAIL_SUCCESS:
        return {
          ...state,
          loading: false,
          info: action.payload,
          error: ''
        };
      case FETCH_PRODUCT_DETAIL_FAILURE:
        return {
          ...state,
          loading: false,
          info: {},
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default productDetailReducer;