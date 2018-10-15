import { ADD_EVENTS_ALL } from './events.types';

const initialState = [
  // {
  //   title: 'Meet Andre Swilley',
  //   revenue: 50,
  //   ticketsSold: 12,
  //   addOnsSold: 5,
  //   dateStart: 1539453600000,
  // },
  // {
  //   title: 'Meet Mostly Luca',
  //   revenue: 50,
  //   ticketsSold: 8,
  //   addOnsSold: 5,
  //   dateStart: 1539453600000,
  //   time: '3:05pm PDT',
  // },
];

const reducerEvents = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENTS_ALL.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default reducerEvents;
