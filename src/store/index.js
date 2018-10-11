import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// import reducer from '../reducers';

// Initial state when the app initialises
const initialState = {
  favoriteAnimal: 'duck',
};

// Reducers - specify how state is changed based on actions
const TESTREDUCER = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FAVORITE_ANIMAL':
      return { ...state, favoriteAnimal: action.payload };
    default:
      return state;
  }
};

// Store
const store = createStore(TESTREDUCER, applyMiddleware(thunkMiddleware));

export default store;
