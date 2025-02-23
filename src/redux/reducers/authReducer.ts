import { User } from "firebase/auth";
import { CLEAR_USER, SET_USER } from "../actions/actionTypes";
import { AuthActionTypes } from "../actions/productActions";


interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case CLEAR_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
