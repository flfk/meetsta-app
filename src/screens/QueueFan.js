import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import Container from '../components/Container';
import { getformattedTimeFromSecs } from '../helpers/TimeFormatting';
import Fonts from '../utils/Fonts';

import { removeFromQueue } from '../redux/runSheet/runSheet.api';

const propTypes = {
  eventID: PropTypes.string.isRequired,
  queue: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      isCurrentCall: PropTypes.bool.isRequired,
      orderID: PropTypes.string.isRequired,
      dateJoined: PropTypes.number,
      secondsLeft: PropTypes.number.isRequired,
      uid: PropTypes.string.isRequired,
      wasCompleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
  ticketName: PropTypes.string.isRequired,
  orderID: PropTypes.string.isRequired,
  organiserName: PropTypes.string.isRequired,
};

const defaultProps = {};

const mapStateToProps = state => ({
  eventID: state.runSheet.eventID,
  queue: state.runSheet.queue,
  ticketName: state.runSheet.ticketName,
  orderID: state.runSheet.orderID,
  organiserName: state.runSheet.organiserName,

  runSheet: state.runSheet,
});

class QueueFan extends React.Component {
  isNewerEntry = (current, entry) => (current.dateJoined > entry.dateJoined ? current : entry);

  getCallerInfo = () => {
    const { queue, orderID } = this.props;
    const callerQueueEntries = queue.filter(info => info.orderID === orderID);
    const callerInfo = callerQueueEntries.sort((a, b) => b.dateJoined > a.dateJoined)[0];
    return callerInfo;
  };

  getQueueActiveInfront = () => {
    const { queue } = this.props;
    const { dateJoined } = this.getCallerInfo();
    const queueActiveInfront = queue
      .filter(info => !info.wasCompleted)
      .filter(info => info.dateJoined < dateJoined);
    return queueActiveInfront;
  };

  getQueuePosition = () => {
    const queueActiveInfront = this.getQueueActiveInfront();
    return queueActiveInfront.length;
  };

  getQueueWaitTime = () => {
    const queueActiveInfront = this.getQueueActiveInfront();
    console.log(queueActiveInfront);
    const waitTimeSecs = queueActiveInfront.reduce(
      (total, callInfo) => total + callInfo.secondsLeft,
      0
    );
    console.log('wait time secs is ', waitTimeSecs);
    const waitTime = getformattedTimeFromSecs(waitTimeSecs);
    return waitTime;
  };

  JOINCALL = () => {
    // XX DELETE TESTING ONLY
    const { navigation } = this.props;
    navigation.navigate('CallFan');
  };

  leaveQueue = () => {
    // XX todo
    const { eventID } = this.props;
    const callerInfo = this.getCallerInfo();
    removeFromQueue(callerInfo, eventID);
    this.goToMain();
  };

  goToMain = () => {
    const { navigation } = this.props;
    navigation.navigate('Main');
  };

  render() {
    const { ticketName, runSheet, organiserName } = this.props;

    const title = `${ticketName} with ${organiserName}`;

    const queuePosition = this.getQueuePosition();
    // const queuePosition = 5;
    let queuePositionText = null;
    switch (queuePosition) {
      case 1:
        queuePositionText = 'You are next in line!';
        break;
      case 2:
        queuePositionText = 'There is 1 person ahead of you';
        break;
      default:
        queuePositionText = `There are ${queuePosition} people ahead of you`;
        break;
    }

    const queueWaitTime = this.getQueueWaitTime();
    // const queueWaitTime = { mins: 5 };

    return (
      <Container paddingHorizontal center>
        <Fonts.H2>You are in the queue for </Fonts.H2>
        <Fonts.H1>{title}</Fonts.H1>
        <Fonts.H2>{queuePositionText}</Fonts.H2>
        <Fonts.H2>Your estimated wait time is {queueWaitTime.mins} minutes</Fonts.H2>
        <Btn.Primary title="TEST BTN - JOIN CALL" onPress={this.JOINCALL} />
        <Btn.Secondary title="Leave Queue" onPress={this.leaveQueue} />
      </Container>
    );
  }
}

QueueFan.propTypes = propTypes;
QueueFan.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  null
)(QueueFan);
