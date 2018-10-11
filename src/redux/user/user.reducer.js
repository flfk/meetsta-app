import { CREATE_USER } from './user.types';

const initialState = {
  user: {
    email: 'initialState@Email.com',
  },
  isPendingUser: false,
  error: '',
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
        isPendingUser: false,
      };
    case CREATE_USER.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingUser: false,
      };
    default:
      return state;
  }
};

export default reducerUser;
