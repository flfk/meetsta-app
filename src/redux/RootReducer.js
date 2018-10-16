import { combineReducers } from 'redux';

import reducerCall from './call/call.reducer';
import reducerEvents from './events/events.reducer';
import reducerOrders from './orders/orders.reducer';
import reducerUser from './user/user.reducer';

const reducerRoot = combineReducers({
  call: reducerCall,
  events: reducerEvents,
  orders: reducerOrders,
  user: reducerUser,
});

export default reducerRoot;
