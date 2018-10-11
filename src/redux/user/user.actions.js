import api from '../../firebase/api';

import { CREATE_USER } from './user.types';

// export const GET_USER = 'GET_USER';
// export const UPDATE_UID = 'UPDATE_UID';

// Action creators
export const createUser = (email, password) => dispatch => {
  dispatch({
    type: CREATE_USER.PENDING,
  });
  api
    .createUser(email, password)
    .then(user => {
      console.log('user.actions created user', user);
      dispatch({
        type: CREATE_USER.SUCCESS,
        payload: user,
      });
    })
    .catch(error => {
      console.log('Error user.actions createUser', error);
      dispatch({
        type: CREATE_USER.ERROR,
        payload: error,
      });
    });
};

export const xx = () => {};

//   try {
//     const user = await auth.createUserWithEmailAndPassword(email, password);
//     return {
//       type: CREATE_USER,
//       payload: user,
//     };
//   } catch (error) {
//     const errorCode = error.code;
//     console.log('Error creating user', errorCode, error);
//     return {};
//   }
// };

// export const loadSections = () => {
//   return dispatch => {
//     dispatch({
//       type: actionType.LOAD_SECTIONS_REQUEST,
//     });
//     getSectionsDB()
//       .then(sections => {
//         dispatch({
//           type: actionType.LOAD_SECTIONS_SUCCESS,
//           payload: sections.val(),
//         });
//       })
//       .catch(error => {
//         dispatch({
//           type: actionType.LOAD_SECTIONS_FAILED,
//           payload: error,
//         });
//       });
//   };
// };

// createUser = async (email, password) => {
//   try {
//     const user = await auth.createUserWithEmailAndPassword(email, password);
//     return user;
//   } catch (error) {
//     console.log('error', error);
//     const errorCode = error.code;
//     const { navigation } = this.props;
//     navigation.navigate('AuthErrors', { errorCode });
//   }
// };

// export const getUser = user => ({
//   type: GET_USER,
//   payload: user,
// });

// export const updateUser = user => ({
//   type: UPDATE_USER,
//   payload: user,
// });

// export const updateUid = uid => ({
//   type: UPDATE_UID,
//   payload: uid,
// });
