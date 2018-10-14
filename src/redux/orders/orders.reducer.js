import { ADD_ORDER } from './orders.types';

const initialState = [
  {
    title: 'Meet Andre Swilley',
    organiser: 'Andre Swiley',
    dateStart: 1539453600000,
    orderNum: '11111',
    name: 'Say Hi and Get a Selfie',
    ticketID: 'abc',
    eventID: 'masterclass-test',
  },
  {
    title: 'Meet Mostly Luca',
    organiser: 'Andre Swiley',
    dateStart: 1539453600000,
    orderNum: '12222',
    name: 'VIP Access',
    ticketID: 'xyz',
    eventID: 'masterclass-test',
  },
];

const reducerTickets = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER.SUCCESS:
      console.log('reducer called for Add Order');
      return [...state, action.payload];
    default:
      return state;
  }
};

export default reducerTickets;
