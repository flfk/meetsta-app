import {
  CREATE_USER,
  LOGIN_USER,
  LOGIN_USER_FACEBOOK,
  UPDATE_DISPLAY_NAME,
  GET_LOGGED_IN_USER,
  SIGNOUT_USER,
} from './user.types';

const initialState = {
  error: '',
  isPendingUser: false,
  user: {
    displayName: 'initialName',
    email: 'initialState@email',
    photoURL: '',
    uid: 'initial uid',
  },
};

const reducerUser = (state = initialState, action) => {
  const stateUpdated = Object.assign({}, state);
  switch (action.type) {
    case CREATE_USER.PENDING:
      return {
        ...state,
        isPendingUser: true,
      };
    case CREATE_USER.SUCCESS:
      return {
        ...state,
        user: action.payload,
        isPendingUser: false,
      };
    case CREATE_USER.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingUser: false,
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
        user: action.payload,
        isPendingUser: false,
      };
    case GET_LOGGED_IN_USER.SUCCESS:
      return {
        ...state,
        user: action.payload,
        isPendingUser: false,
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
      stateUpdated.user.displayName = action.payload;
      return {
        ...stateUpdated,
      };
    default:
      return state;
  }
};

export default reducerUser;
