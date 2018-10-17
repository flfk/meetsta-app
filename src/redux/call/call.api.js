import db from '../../firebase/db';

import { COLL_EVENTS, FIELD_EVENT_QUEUE } from '../../utils/Constants';
import { fetchDocOrderFromOrderID } from '../orders/orders.api';

export const fetchAdditionalCallFields = async orderID => {
  const order = await fetchDocOrderFromOrderID(orderID);
  return {
    lengthMins: order.lengthMins,
    uid: order.uid,
  };
};

export const fetchCallersInformation = async orderIDs => {
  const callersInformation = await Promise.all(
    orderIDs.map(async id => {
      const additionalFields = await fetchAdditionalCallFields(id);
      return { orderID: id, ...additionalFields };
    })
  );
  return callersInformation;
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
