import { ADD_EVENT_DETAILS_TO_CALL, ADD_ORDER_ID_TO_CALL, ADD_QUEUE } from './call.types';

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
