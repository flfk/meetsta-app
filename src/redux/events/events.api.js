import db from '../../firebase/db';

import { COLL_EVENTS, COLL_TICKETS, MEETSTA_COMMISSION } from '../../utils/Constants';
import { fetchCollEventOrders } from '../orders/orders.api';

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

export const fetchCollEvents = async organiserUid => {
  const events = [];
  try {
    const eventsRef = db.collection(COLL_EVENTS);
    const snapshot = await eventsRef.where('organiserUid', '==', organiserUid).get();
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
