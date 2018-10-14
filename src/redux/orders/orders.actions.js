import {} from '../../firebase/api';
import NavigationService from '../../navigation/NavigationService';
import { ADD_ORDER } from './orders.types';

export const addOrder = order => dispatch => {
  dispatch({
    type: ADD_ORDER.SUCCESS,
    payload: order,
  });
};
