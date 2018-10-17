import { ADD_ORDER_ID_SELECTED, ADD_QUEUE } from './runSheet.types';

const callerInfo = {
  displayName: '',
  isCurrentCall: false,
  orderID: '',
  queuePosition: 0,
  secondsLeft: 0,
  uid: '',
  wasCompleted: false,
};

const initialState = {
  orderID: '',
  queue: [callerInfo],
};

const reducerRunSheet = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_ID_SELECTED.SUCCESS:
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

export default reducerRunSheet;
