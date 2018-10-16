import {
  ADD_COMPLETED_CALLS,
  ADD_CURRENT_CALL,
  ADD_EVENT_DETAILS_TO_CALL,
  ADD_ORDER_ID_TO_CALL,
  ADD_QUEUE,
} from './call.types';

const initialState = {
  eventID: '',
  eventTitle: '',
  orderID: '',
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
    case ADD_COMPLETED_CALLS.SUCCESS:
      return {
        ...state,
        completedCalls: action.payload,
      };
    case ADD_CURRENT_CALL.SUCCESS:
      return {
        ...state,
        currentCall: action.payload,
      };
    case ADD_EVENT_DETAILS_TO_CALL.SUCCESS:
      return {
        ...state,
        eventID: action.payload.eventID,
        eventTitle: action.payload.title,
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
