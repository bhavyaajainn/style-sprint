import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCT_DETAIL_FAILURE,
  FETCH_PRODUCT_DETAIL_REQUEST,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  CLEAR_USER,
  SET_USER,
  SET_PRODUCT_RATINGS,
} from "./actionTypes";
import { User } from 'firebase/auth';

export const fetchProductsRequest = (pagination: any) => ({
  type: FETCH_PRODUCTS_REQUEST,
  payload: pagination
});

export const fetchProductsSuccess = (products:any) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error:any) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchProductDetailRequest = (id:any) => ({
  type: FETCH_PRODUCT_DETAIL_REQUEST,
  payload: {id}
});

export const fetchProductDetailSuccess = (productDetail:any) => ({
  type: FETCH_PRODUCT_DETAIL_SUCCESS,
  payload: productDetail,
});

export const fetchProductDetailFailure = (error:any) => ({
  type: FETCH_PRODUCT_DETAIL_FAILURE,
  payload: error,
});

interface SetUserAction {
  type: typeof SET_USER;
  payload: User | null;
}

interface ClearUserAction {
  type: typeof CLEAR_USER;
}

export type AuthActionTypes = SetUserAction | ClearUserAction;

export const setUser = (user: User | null): AuthActionTypes => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = (): AuthActionTypes => ({
  type: CLEAR_USER,
});

export const setProductRatings = (ratings: any[]) => {
  return {
    type: SET_PRODUCT_RATINGS,
    payload: ratings,
  };};