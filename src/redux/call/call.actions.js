import {
  ADD_COMPLETED_CALLS,
  ADD_CURRENT_CALL,
  ADD_EVENT_DETAILS_TO_CALL,
  ADD_ORDER_ID_TO_CALL,
  ADD_QUEUE,
} from './call.types';

export const addCompletedCalls = completedCalls => dispatch => {
  dispatch({
    type: ADD_COMPLETED_CALLS.SUCCESS,
    payload: completedCalls,
  });
};

export const addCurrentCall = currentCall => dispatch => {
  dispatch({
    type: ADD_CURRENT_CALL.SUCCESS,
    payload: currentCall,
  });
};

export const addEventDetailsToCall = eventDetails => dispatch => {
  dispatch({
    type: ADD_EVENT_DETAILS_TO_CALL.SUCCESS,
    payload: eventDetails,
  });
};

export const addOrderIDToCall = orderID => dispatch => {
  dispatch({
    type: ADD_ORDER_ID_TO_CALL.SUCCESS,
    payload: orderID,
  });
};

export const addQueue = queue => dispatch => {
  dispatch({
    type: ADD_QUEUE.SUCCESS,
    payload: queue,
  });
};
