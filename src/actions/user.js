// Action types
export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';

// Action creators
// export const setFavoriteAnimal = favoriteAnimal => {
//   return {
//     type: 'SET_FAVORITE_ANIMAL',
//     payload: favoriteAnimal,
//   };
// };

export const getUser = user => ({
  type: GET_USER,
  payload: user,
});

export const updateUser = user => ({
  type: UPDATE_USER,
  payload: user,
});
