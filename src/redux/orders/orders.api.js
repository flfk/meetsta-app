import db from '../../firebase/db';

import { COLL_ORDERS } from '../../utils/Constants';
import { fetchDocEvent, fetchDocTicket } from '../events/events.api';

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
