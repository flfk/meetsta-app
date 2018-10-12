import auth from './auth';
import firebase from 'firebase/app';

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_OPTIONS = { permissions: ['public_profile', 'email'], behaviour: 'native' };

export const addUser = async (email, password) => {
  const data = await auth.createUserWithEmailAndPassword(email, password);
  return data.user;
};

export const fetchUserFacebook = async () => {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    FACEBOOK_APP_ID,
    FACEBOOK_OPTIONS
  );
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    const data = await response.json();
    const { name } = data;
    return {
      token,
      displayName: name,
    };
  }
  if (type === 'cancel') {
    // Do nothing
  }
  return {};
};

export const fetchUser = async (email, password) => {
  const data = await auth.signInWithEmailAndPassword(email, password);
  return data.user;
};

export const setDisplayName = async displayName => {
  const user = await auth.currentUser;
  await user.updateProfile({
    displayName: displayName,
  });
};

export const setEmail = async email => {
  const user = await auth.currentUser;
  await user.updateProfile({
    email: email,
  });
};

export const signOutUser = async () => {
  await auth.signOut();
};

export const signInWithCredential = async token => {
  const credential = firebase.auth.FacebookAuthProvider.credential(token);
  const data = await auth.signInAndRetrieveDataWithCredential(credential);
  console.log(data);
  // from data you can get data.additionalUserInfo and then isNewUser, profile.picture.url (100px by 100px)
  return data.user;
};
