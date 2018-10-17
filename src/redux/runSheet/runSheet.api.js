import db from '../../firebase/db';

import { COLL_EVENTS, COLL_QUEUE, SECS_PER_MIN } from '../../utils/Constants';
import { fetchDocOrderFromOrderID } from '../orders/orders.api';
import { fetchDisplayName } from '../user/user.api';

export const getPosition = queue => {
  const highestPosition = queue.reduce(
    (max, info) => (info.position > max ? info.position : max),
    0
  );
  return highestPosition + 1;
};

export const addToQueue = async (eventID, callerInfo) => {
  try {
    const queueRef = getQueueRef(eventID);
    console.log('Adding to queue with caller info ', callerInfo);
    await queueRef.add(callerInfo);
  } catch (error) {
    console.error('Error, api queue, addToQueue ', error);
  }
};
const getQueueRef = eventID => {
  return db
    .collection(COLL_EVENTS)
    .doc(eventID)
    .collection(COLL_QUEUE);
};

export const fetchQueue = async eventID => {
  const queue = [];
  try {
    const queueRef = getQueueRef(eventID);
    const snapshots = await queueRef.get();

    if (snapshots.empty) {
      console.log('queue is empty');
      return queue;
    }

    snapshots.forEach(snap => {
      const callerInfo = snap.data();
      queue.push(callerInfo);
    });
  } catch (error) {
    console.error('Error, api queue, fetchQueue ', error);
  }
  return queue;
};

const fetchNewCallerInfo = async orderID => {
  const order = await fetchDocOrderFromOrderID(orderID);
  const displayName = await fetchDisplayName();
  return {
    displayName,
    isCurrentCall: false,
    orderID,
    secondsLeft: order.lengthMins * SECS_PER_MIN,
    uid: order.uid,
    wasCompleted: false,
  };
};

export const joinQueue = async (eventID, orderID) => {
  let queue = [];
  try {
    queue = await fetchQueue(eventID);

    console.log('Api runsheet, joinQueue, queue fetched is ', queue);

    let callerInfo = queue.find(info => info.orderID === orderID);
    if (!callerInfo) {
      callerInfo = await fetchNewCallerInfo(orderID);
    }
    callerInfo.position = getPosition(queue);
    console.log('Api runsheet, callerInfo is ', callerInfo);

    queue.push(callerInfo);
    await addToQueue(eventID, callerInfo);

    console.log('Api runsheet, queue updated is ', queue);
  } catch (error) {
    console.error('Error, api queue, joinQueue ', error);
  }
  return queue;
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
