import moment from 'moment-timezone';

export const getTimeRange = (dateStart, dateEnd) => {
  const timeStart = moment.tz(dateStart, 'America/Los_Angeles').format('H:mm');
  const timeEnd = moment.tz(dateEnd, 'America/Los_Angeles').format('H:mm');
  const timeRange = `${timeStart} - ${timeEnd} California Time`;
  return timeRange;
};

export const getTimeStart = dateStart => {
  const timeStart = moment.tz(dateStart, 'America/Los_Angeles').format('H:mm');
  const timeRange = `${timeStart} California Time`;
  return timeRange;
};

export const getDate = dateStart =>
  moment.tz(dateStart, 'America/Los_Angeles').format('dddd, MMM Do, YYYY');
