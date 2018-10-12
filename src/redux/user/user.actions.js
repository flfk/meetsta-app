import {
  addUser,
  fetchUser,
  fetchUserFacebook,
  setDisplayName,
  setEmail,
  signInWithCredential,
  signOutUser,
} from '../../firebase/api';
import NavigationService from '../../navigation/NavigationService';
import {
  CREATE_USER,
  LOGIN_USER,
  LOGIN_USER_FACEBOOK,
  GET_LOGGED_IN_USER,
  SIGNOUT_USER,
  UPDATE_DISPLAY_NAME,
  UPDATE_EMAIL,
} from './user.types';

export const updateDisplayName = displayName => dispatch => {
  setDisplayName(displayName)
    .then(() => {
      dispatch({ type: UPDATE_DISPLAY_NAME.SUCCESS, payload: displayName });
    })
    .catch(error => {
      console.error('Error actions user updateDisplayName, ', error);
    });
};

export const createUser = (email, password, displayName) => dispatch => {
  dispatch({
    type: CREATE_USER.PENDING,
  });
  addUser(email, password)
    .then(user => {
      dispatch({
        type: CREATE_USER.SUCCESS,
        payload: user,
      });
      dispatch(updateDisplayName(displayName));
      NavigationService.navigate('Main');
    })
    .catch(error => {
      dispatch({
        type: CREATE_USER.ERROR,
        payload: error.message,
      });
      console.error('Error actions user createUser, ', error);
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

export const loginWithFacebook = () => dispatch => {
  dispatch({
    type: LOGIN_USER_FACEBOOK.PENDING,
  });
  fetchUserFacebook().then(response => {
    const { token, name } = response;
    signInWithCredential(token)
      .then(user => {
        dispatch({
          type: LOGIN_USER_FACEBOOK.SUCCESS,
          payload: user,
        });
        NavigationService.navigate('Main');
      })
      .catch(error => {
        dispatch({
          type: LOGIN_USER_FACEBOOK.ERROR,
          payload: error.message,
        });
        console.log('Error actions user login with facebook, ', error);
      });
  });
};

export const getLoggedInUser = user => dispatch => {
  dispatch({
    type: GET_LOGGED_IN_USER.SUCCESS,
    payload: user,
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

export const updateEmail = email => dispatch => {
  setEmail(email)
    .then(() => {
      dispatch({ type: UPDATE_EMAIL.SUCCESS, payload: email });
    })
    .catch(error => {
      console.error('Error actions user updateEmail, ', error);
    });
};
