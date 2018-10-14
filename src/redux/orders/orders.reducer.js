import { ADD_ORDER } from './orders.types';

const initialState = [
  {
    addOns: [],
    eventID: 'masterclass-test',
    dateStart: 1539453600000,
    lengthMins: 5,
    name: 'Say Hi and Get a Selfie',
    orderRef: '123ABC',
    organiserName: 'Andre Swiley',
    previewImgURL: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
    ticketID: 'abc',
    title: 'Meet Andre Swilley',
  },
  {
    addOns: [],
    eventID: 'masterclass-test',
    dateStart: 1539453600000,
    lengthMins: 5,
    name: 'Say Hi and Get a Selfie',
    orderRef: '123ABC',
    organiserName: 'Owen Cusac',
    previewImgURL: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
    ticketID: 'abc',
    title: 'Meet Owen Cusac',
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
