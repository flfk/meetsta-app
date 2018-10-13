import { combineReducers } from 'redux';

import reducerTickets from './tickets/tickets.reducer';
import reducerUser from './user/user.reducer';

const reducerRoot = combineReducers({
  tickets: reducerTickets,
  user: reducerUser,
});

export default reducerRoot;
