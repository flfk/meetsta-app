import { ADD_EVENT_ID_TO_CALL, ADD_ORDER_ID_TO_CALL, ADD_QUEUE } from './call.types';

const initialState = {
  orderID: '',
  eventID: '',
  queue: [
    {
      orderID: '',
      lengthMins: 0,
      uid: '',
    },
  ],
  completedCalls: [
    {
      orderID: '',
      lengthMins: 0,
      uid: '',
    },
  ],
  currentCall: {
    orderID: '',
    lengthMins: 0,
    uid: '',
  },
};

const reducerCall = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT_ID_TO_CALL.SUCCESS:
      return {
        ...state,
        eventID: action.payload,
      };
    case ADD_ORDER_ID_TO_CALL.SUCCESS:
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
