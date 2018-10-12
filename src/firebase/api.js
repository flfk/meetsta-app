import auth from './auth';

export const addUser = async (email, password) => {
  const data = await auth.createUserWithEmailAndPassword(email, password);
  return data.user;
};

export const fetchUser = async (email, password) => {
  const data = await auth.signInWithEmailAndPassword(email, password);
  return data.user;
};

export const setDisplayName = async displayName => {
  const user = await auth.currentUser;
  const userUpdated = await user.updateProfile({ displayName });
  console.log('userUpdated in api is', userUpdated);
};
