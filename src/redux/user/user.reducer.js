import { CREATE_USER, UPDATE_DISPLAY_NAME } from './user.types';

const initialState = {
  error: '',
  isPendingUser: false,
  user: {
    email: 'initialState@email',
    uid: 'initial uid',
    displayName: 'initialName',
  },
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
        user: action.payload,
      };
    case CREATE_USER.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingUser: false,
      };
    case UPDATE_DISPLAY_NAME.SUCCESS:
      return {
        ...state,
        user: { ...state.user, displayName: action.payload },
      };
    default:
      return state;
  }
};

export default reducerUser;
