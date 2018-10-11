import { combineReducers } from 'redux';

import reducerUser from './user.reducer';

const reducerRoot = combineReducers({
  user: reducerUser,
});

export default reducerRoot;
