import auth from './auth';
import db from './db';

import { MEETSTA_COMMISSION } from '../utils/Constants';

// Collection and document Names
const COLL_ADD_ONS = 'addOns';
const COLL_EVENTS = 'events';
const COLL_ORDERS = 'orders';
const COLL_TICKETS = 'tickets';
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_OPTIONS = { permissions: ['public_profile', 'email'], behaviour: 'native' };
const FIELD_EVENT_QUEUE = 'queue';

export const addUser = async (email, password) => {
  const data = await auth.createUserWithEmailAndPassword(email, password);
  return data.user;
};

export const fetchAdditionalEventFields = async eventID => {
  const orders = await fetchCollEventOrders(eventID);
  const revenueTotal = orders.reduce((total, order) => total + order.priceTotal, 0);
  const revenueOrganiser = revenueTotal * (1 - MEETSTA_COMMISSION);
  const ticketsSold = orders.filter(order => order.lengthMins).length;
  const addOnsSold = orders.reduce((total, order) => total + order.addOns.length, 0);
  return {
    revenue: revenueOrganiser,
    ticketsSold,
    addOnsSold,
  };
};

export const fetchAdditionalOrderFields = async order => {
  const event = await fetchDocEvent(order.eventID);
  const ticket = await fetchDocTicket(order.eventID, order.ticketID);
  return {
    dateStart: event.dateStart,
    name: ticket.name,
    organiserName: event.organiserName,
    previewImgURL: ticket.previewImgURL,
    title: event.title,
  };
};

export const fetchAdditionalCallFields = async orderID => {
  const order = await fetchDocOrderFromOrderID(orderID);
  return {
    lengthMins: order.lengthMins,
    uid: order.uid,
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

export const fetchCollEvents = async uid => {
  const events = [];
  try {
    const eventsRef = db.collection(COLL_EVENTS);
    const snapshot = await eventsRef.where('organiserUid', '==', uid).get();
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

export const fetchCollEventOrders = async eventID => {
  const orders = [];
  try {
    const ordersRef = db.collection(COLL_ORDERS);
    const snapshot = await ordersRef.where('eventID', '==', eventID).get();
    snapshot.forEach(snap => {
      const order = snap.data();
      const { id } = snap;
      order.orderID = id;
      orders.push(order);
    });
    return orders;
  } catch (error) {
    console.error('Error api fetchCollEventOrders ', error);
  }
  return orders;
};

export const fetchDocOrderFromOrderID = async orderID => {
  let order = {};
  try {
    const orderRef = db.collection(COLL_ORDERS).doc(orderID);
    const snapshot = await orderRef.get();
    order = snapshot.data();
    order.orderID = snapshot.id;
  } catch (error) {
    console.error('Error api fetchDocOrderFromOrderID, ', error);
  }
  return order;
};

export const fetchDocOrderFromOrderRef = async orderRef => {
  let order = {};
  try {
    const ordersRef = db.collection(COLL_ORDERS);
    const snapshots = await ordersRef.where('orderRef', '==', orderRef).get();
    snapshots.forEach(snap => {
      order = snap.data();
      order.orderID = snap.id;
    });
  } catch (error) {
    console.error('Error api fetchDocOrderFromOrderRef, ', error);
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

export const fetchCallInformation = async eventID => {
  let callInformation = {};
  try {
    const eventRef = db.collection(COLL_EVENTS).doc(eventID);
    const snapshot = await eventRef.get();
    const data = snapshot.data();
    const { completedCalls, currentCall, queue } = data;
    callInformation = { completedCalls, currentCall, queue };
  } catch (error) {
    console.error('Error api fetchQueue, ', error);
  }
  return callInformation;
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

export const addToQueue = async (eventID, orderID) => {
  let queueUpdated = [];
  try {
    const eventRef = db.collection(COLL_EVENTS).doc(eventID);
    const snapshot = await eventRef.get();
    const data = snapshot.data();
    const { queue } = data;

    if (!queue) {
      queueUpdated.push(orderID);
      eventRef.set({ queue: queueUpdated }, { merge: true });
      return queueUpdated;
    }

    if (queue && queue.indexOf(orderID) !== -1) {
      console.log('User is Already in queue');
      return queue;
    }

    queueUpdated = queue.slice();
    queueUpdated.push(orderID);
    eventRef.set({ queue: queueUpdated }, { merge: true });
  } catch (error) {
    console.error('Error, api, addToQueue ', error);
  }
  return queueUpdated;
};

export const removeFromQueue = async (eventID, orderID) => {
  let queueUpdated = [];
  try {
    const eventRef = db.collection(COLL_EVENTS).doc(eventID);
    const snapshot = await eventRef.get();
    const data = snapshot.data();
    const { queue } = data;
    const index = queue.indexOf(orderID);

    if (!queue || index === -1) {
      console.log("Api, removeFromQueue, queue doesn't exist or user not in queue");
      return queueUpdated;
    }
    queueUpdated = queue.slice();
    queueUpdated.splice(index, 1);
    eventRef.set({ queue: queueUpdated }, { merge: true });
  } catch (error) {
    console.error('Error api, removeFromQueue', error);
  }
  return queueUpdated;
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
