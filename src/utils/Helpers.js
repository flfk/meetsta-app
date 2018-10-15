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

export const getTimeRemaining = timestampMillis => {
  const momentCurrent = moment();
  const momentStart = moment(timestampMillis);
  const diffMillis = momentStart.diff(momentCurrent);
  const duration = moment.duration({ milliseconds: diffMillis });
  return {
    days: duration.days(),
    diffMillis,
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  };
};
