import { ADD_ORDER_ID_SELECTED, ADD_QUEUE } from './runSheet.types';

export const actionAddOrderIDSelected = orderID => dispatch => {
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
