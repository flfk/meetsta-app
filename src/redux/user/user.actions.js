import { addUser, setDisplayName } from '../../firebase/api';
import NavigationService from '../../navigation/NavigationService';
import { CREATE_USER, UPDATE_DISPLAY_NAME } from './user.types';

export const createUser = (email, password) => dispatch => {
  dispatch({
    type: CREATE_USER.PENDING,
  });
  addUser(email, password)
    .then(user => {
      dispatch({
        type: CREATE_USER.SUCCESS,
        payload: user,
      });
      NavigationService.navigate('Main');
    })
    .catch(error => {
      dispatch({
        type: CREATE_USER.ERROR,
        payload: error.message,
      });
      console.log('Error actions user createUser, ', error);
      const errorCode = error.code;
      NavigationService.navigate('AuthErrors', { errorCode });
    });
};

export const updateDisplayName = displayName => dispatch => {
  setDisplayName(displayName)
    .then(() => {
      dispatch({ type: UPDATE_DISPLAY_NAME.SUCCESS, payload: displayName });
    })
    .catch(error => {
      console.error('Error actions user updateDisplayName, ', error);
    });
};
