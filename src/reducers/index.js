import { combineReducers } from 'redux';

import { GET_USER, UPDATE_USER } from '../actions/user';

const initialStateUser = {
  uid: 'abcd',
};

const reducerUser = (state = initialStateUser, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case UPDATE_USER:
      console.log('reducing update user with user ', action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const reducerRoot = combineReducers({
  user: reducerUser,
});

export default reducerRoot;
