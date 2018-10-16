import { fetchAdditionalCallFields } from '../firebase/api';

export const getCallersInformation = async orderIDs => {
  const callersInformation = await Promise.all(
    orderIDs.map(async id => {
      const additionalFields = await fetchAdditionalCallFields(id);
      return { orderID: id, ...additionalFields };
    })
  );
  return callersInformation;
};
