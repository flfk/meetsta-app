import api from '../../firebase/api';
import NavigationService from '../../navigation/NavigationService';
import { CREATE_USER } from './user.types';

export const createUser = (email, password) => dispatch => {
  dispatch({
    type: CREATE_USER.PENDING,
  });
  api
    .createUser(email, password)
    .then(user => {
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
      const errorCode = error.code;
      NavigationService.navigate('AuthErrors', { errorCode });
    });
};

export const xx = () => {};
