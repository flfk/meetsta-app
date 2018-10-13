import {} from './tickets.types';

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
    // case CREATE_USER.PENDING:
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
};

export default reducerTickets;
