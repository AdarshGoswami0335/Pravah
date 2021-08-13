import {
  AUTHENTICATE,
  AUTO_LOGIN,
  FETCH_USERS,
  LOGOUT,
} from '../actions/AuthAction';

const initialState = {
  mobile: null,
  users: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        mobile: action.productData.mobile,
      };
    case AUTO_LOGIN:
      return {
        mobile: action.mobile,
      };
    default:
      return state;
  }
};

export default authReducer;
