import auth from './auth';
import db from './db';

// Collection and document Names
const COLL_ADD_ONS = 'addOns';
const COLL_EVENTS = 'events';
const COLL_ORDERS = 'orders';
const COLL_TICKETS = 'tickets';
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_OPTIONS = { permissions: ['public_profile', 'email'], behaviour: 'native' };

export const addUser = async (email, password) => {
  const data = await auth.createUserWithEmailAndPassword(email, password);
  return data.user;
};

export const fetchAdditionalOrderFields = async order => {
  const event = await fetchDocEvent(order.eventID);
  const ticket = await fetchDocTicket(order.eventID, order.ticketID);
  return {
    ...order,
    dateStart: event.dateStart,
    name: ticket.name,
    organiserName: event.organiserName,
    previewImgURL: ticket.previewImgURL,
    title: event.title,
  };
};

export const fetchCollOrders = async uid => {
  const orders = [];
  try {
    const ordersRef = db.collection(COLL_ORDERS);
    const snapshots = await ordersRef.where('uid', '==', uid).get();
    snapshots.forEach(snap => {
      const order = snap.data();
      const { id } = snap;
      order.orderID = id;
      orders.push(order);
    });
    return orders;
  } catch (error) {
    console.error('Error api fetchCollOrders ', error);
  }
  return orders;
};

export const fetchCollEvents = async () => {
  const events = [];
  try {
    const eventsRef = db.collection(COLL_EVENTS);
    const snapshot = await eventsRef.get();
    snapshot.forEach(snap => {
      const event = snap.data();
      const { id } = snap;
      event.eventID = id;
      events.push(event);
    });
    return events;
  } catch (error) {
    console.error('Error api fetchCollEvents ', error);
  }
  return events;
};

export const fetchCollEventTickets = async eventID => {
  const tickets = [];
  try {
    const ticketsRef = db
      .collection(COLL_EVENTS)
      .doc(eventID)
      .collection(COLL_TICKETS);
    const snapshot = await ticketsRef.get();
    snapshot.forEach(snap => {
      const ticket = snap.data();
      const { id } = snap;
      ticket.ticketID = id;
      tickets.push(ticket);
    });
    return tickets;
  } catch (error) {
    console.error('Error api fetchCollEventTickets ', error);
  }
  return tickets;
};

export const fetchDocOrder = async orderRef => {
  let orderComplete = {};
  try {
    const ordersRef = db.collection(COLL_ORDERS);
    const snapshots = await ordersRef.where('orderRef', '==', orderRef).get();
    snapshots.forEach(snap => {
      order = snap.data();
      order.orderID = snap.id;
    });
  } catch (error) {
    console.error('Error api fetchDocOrder, ', error);
  }
  return order;
};

export const fetchDocEvent = async eventID => {
  let event = {};
  try {
    const eventsRef = db.collection(COLL_EVENTS).doc(eventID);
    const snapshot = await eventsRef.get();
    event = snapshot.data();
  } catch (error) {
    console.error('Error api fetchDocEvent, ', error);
  }
  return event;
};

export const fetchDocTicket = async (eventID, ticketID) => {
  let ticket = {};
  try {
    const eventsRef = db
      .collection(COLL_EVENTS)
      .doc(eventID)
      .collection(COLL_TICKETS)
      .doc(ticketID);
    const snapshot = await eventsRef.get();
    ticket = snapshot.data();
  } catch (error) {
    console.error('Error api fetchDocTicket, ', error);
  }
  return ticket;
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

export const updateDocOrder = async (orderID, field, value) => {
  try {
    const orderRef = db.collection(COLL_ORDERS).doc(orderID);
    const fieldValuePair = {};
    fieldValuePair[field] = value;
    orderRef.update({ ...fieldValuePair });
  } catch (error) {
    console.error('Error api updateDocOrder, ', error);
  }
};
