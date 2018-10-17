import { ADD_EVENTS_ALL } from './events.types';

export const addEventsAll = events => dispatch => {
  dispatch({
    type: ADD_EVENTS_ALL.SUCCESS,
    payload: events,
  });
};
