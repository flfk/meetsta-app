import { addUser, fetchUser, setDisplayName, signOutUser } from '../../firebase/api';
import NavigationService from '../../navigation/NavigationService';
import { CREATE_USER, LOGIN_USER, UPDATE_DISPLAY_NAME, SIGNOUT_USER } from './user.types';

export const updateDisplayName = displayName => dispatch => {
  console.log('calling setDisplayName');
  setDisplayName(displayName)
    .then(() => {
      dispatch({ type: UPDATE_DISPLAY_NAME.SUCCESS, payload: displayName });
      console.log('user actions updateDisplayName displayName is', displayName);
    })
    .catch(error => {
      console.error('Error actions user updateDisplayName, ', error);
    });
};

export const createUser = (email, password, displayName) => dispatch => {
  dispatch({
    type: CREATE_USER.PENDING,
  });
  console.log('calling addUser');
  addUser(email, password)
    .then(user => {
      dispatch({
        type: CREATE_USER.SUCCESS,
        payload: user,
      });
      console.log('addUser successful');
      dispatch(updateDisplayName(displayName));
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

export const login = (email, password) => dispatch => {
  dispatch({
    type: LOGIN_USER.PENDING,
  });
  fetchUser(email, password)
    .then(user => {
      dispatch({
        type: LOGIN_USER.SUCCESS,
        payload: user,
      });
      NavigationService.navigate('Main');
    })
    .catch(error => {
      dispatch({
        type: LOGIN_USER.ERROR,
        payload: error.message,
      });
      console.log('Error actions user login, ', error);
      const errorCode = error.code;
      console.log('Error code is, ', errorCode);
      NavigationService.navigate('AuthErrors', { errorCode });
    });
};

export const signOut = () => dispatch => {
  dispatch({
    type: SIGNOUT_USER.PENDING,
  });
  signOutUser()
    .then(() => {
      dispatch({
        type: SIGNOUT_USER.SUCCESS,
        payload: {},
      });
      NavigationService.navigate('Auth');
    })
    .catch(error => {
      dispatch({
        type: SIGNOUT_USER.ERROR,
        payload: error.message,
      });
      console.log('Error actions sign out, ', error);
      const errorCode = error.code;
      console.log('Error code is, ', errorCode);
    });
};
