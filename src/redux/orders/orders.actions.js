import { ADD_ORDER, ADD_ORDERS_ALL } from './orders.types';

export const addOrder = order => dispatch => {
  dispatch({
    type: ADD_ORDER.SUCCESS,
    payload: order,
  });
};

export const addOrdersAll = orders => dispatch => {
  dispatch({
    type: ADD_ORDERS_ALL.SUCCESS,
    payload: orders,
  });
};
