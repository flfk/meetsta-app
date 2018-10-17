import { ADD_EVENT_DETAILS_SELECTED, ADD_ORDER_ID_SELECTED, ADD_QUEUE } from './runSheet.types';

export const addEventDetailsSelected = eventDetails => dispatch => {
  dispatch({
    type: ADD_EVENT_DETAILS_SELECTED.SUCCESS,
    payload: eventDetails,
  });
};

export const addOrderIDSelected = orderID => dispatch => {
  dispatch({
    type: ADD_ORDER_ID_SELECTED.SUCCESS,
    payload: orderID,
  });
};

export const addQueue = queue => dispatch => {
  dispatch({
    type: ADD_QUEUE.SUCCESS,
    payload: queue,
  });
};
