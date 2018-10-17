import { ADD_EVENT_DETAILS_SELECTED, ADD_ORDER_ID_SELECTED, ADD_QUEUE } from './runSheet.types';

const callerInfo = {
  displayName: '',
  isCurrentCall: false,
  orderID: '',
  dateJoined: 0,
  secondsLeft: 0,
  uid: '',
  wasCompleted: false,
};

const initialState = {
  eventID: '',
  orderID: '',
  organiserName: '',
  ticketName: '',
  queue: [callerInfo],
};

const reducerRunSheet = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT_DETAILS_SELECTED.SUCCESS:
      console.log('reducer runsheet adding event details', action.payload);
      return {
        ...state,
        eventID: action.payload.eventID,
        ticketName: action.payload.name,
        organiserName: action.payload.organiserName,
      };
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
