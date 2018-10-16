import { ADD_ORDER_ID, ADD_QUEUE } from './call.types';

const initialState = {
  // orderID: '',
  // queue: [orderID1, orderID2],
  // queueLengthMins: 5,
};

const reducerCall = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_ID.SUCCESS:
      return {
        ...state,
        orderID: action.payload,
      };
    case ADD_QUEUE.SUCCESS:
      return {
        ...state,
        queue: action.payload,
      };
    default:
      return state;
  }
};

export default reducerCall;
