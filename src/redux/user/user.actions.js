import api from '../../firebase/api';

import { CREATE_USER } from './user.types';

// export const GET_USER = 'GET_USER';
// export const UPDATE_UID = 'UPDATE_UID';

// Action creators
export const createUser = (email, password) => dispatch => {
  dispatch({
    type: CREATE_USER.PENDING,
  });
  api
    .createUser(email, password)
    .then(user => {
      console.log('user.actions created user', user);
      dispatch({
        type: CREATE_USER.SUCCESS,
        payload: user,
      });
    })
    .catch(error => {
      dispatch({
        type: CREATE_USER.ERROR,
        payload: error.message,
      });
      return { error };
    });
};

export const xx = () => {};
