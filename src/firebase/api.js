import auth from './auth';

const createUser = async (email, password) => {
  const data = await auth.createUserWithEmailAndPassword(email, password);
  return data.user;
};

const api = {};
api.createUser = createUser;

export default api;
