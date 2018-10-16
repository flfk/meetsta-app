import {
  CREATE_USER,
  GET_LOGGED_IN_USER,
  LOGIN_USER,
  LOGIN_USER_FACEBOOK,
  UPDATE_DISPLAY_NAME,
  UPDATE_EMAIL,
  SIGNOUT_USER,
} from './user.types';

const initialState = {
  displayName: 'initialName',
  email: 'initialState',
  error: '',
  firebaseUser: {},
  isPendingUser: false,
  photoURL: '',
  uid: 'initial uid',
};

const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER.PENDING:
      return {
        ...state,
        isPendingUser: true,
      };
    case CREATE_USER.SUCCESS:
      return {
        ...state,
        displayName: action.payload.displayName,
        email: action.payload.email,
        firebaseUser: action.payload,
        isPendingUser: false,
        uid: action.payload.uid,
      };
    case CREATE_USER.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingUser: false,
      };
    case GET_LOGGED_IN_USER.SUCCESS:
      return {
        ...state,
        displayName: action.payload.displayName,
        email: action.payload.email,
        firebaseUser: action.payload,
        isPendingUser: false,
        uid: action.payload.uid,
      };
    case LOGIN_USER.PENDING:
      return {
        ...state,
        isPendingUser: true,
      };
    case LOGIN_USER.SUCCESS:
      return {
        ...state,
        user: action.payload,
        isPendingUser: false,
      };
    case LOGIN_USER.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingUser: false,
      };
    case LOGIN_USER_FACEBOOK.SUCCESS:
      return {
        ...state,
        displayName: action.payload.displayName,
        email: action.payload.email,
        firebaseUser: action.payload,
        isPendingUser: false,
        uid: action.payload.uid,
      };
    case SIGNOUT_USER.PENDING:
      return {
        ...state,
        isPendingUser: true,
      };
    case SIGNOUT_USER.SUCCESS:
      return {
        ...state,
        user: action.payload,
        isPendingUser: false,
      };
    case SIGNOUT_USER.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingUser: false,
      };
    case UPDATE_DISPLAY_NAME.SUCCESS:
      return {
        ...state,
        displayName: action.payload,
      };
    case UPDATE_EMAIL.SUCCESS:
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default reducerUser;
