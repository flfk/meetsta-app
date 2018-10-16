import { ADD_ORDER_ID, ADD_QUEUE } from './call.types';

export const addOrderID = orderID => dispatch => {
  dispatch({
    type: ADD_ORDER_ID.SUCCESS,
    payload: orderID,
  });
};

export const addQueue = queue => dispatch => {
  dispatch({
    type: ADD_QUEUE.SUCCESS,
    payload: queue,
  });
};
