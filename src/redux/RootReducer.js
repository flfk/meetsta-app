import { combineReducers } from 'redux';

import reducerTickets from './orders/orders.reducer';
import reducerUser from './user/user.reducer';

const reducerRoot = combineReducers({
  orders: reducerTickets,
  user: reducerUser,
});

export default reducerRoot;
