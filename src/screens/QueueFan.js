import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';

import { removeFromQueue } from '../redux/runSheet/runSheet.api';

const propTypes = {
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
    console.log('getCallerInfo, callerInfo is', callerInfo);
    return callerInfo;
  };

  getQueueActiveInfront = () => {
    const { queue } = this.props;
    console.log('queue is ', queue.sort((a, b) => b.dateJoined > a.dateJoined));
    const { dateJoined } = this.getCallerInfo();
    console.log('dateJoined is ', dateJoined);
    const queueActiveInfront = queue
      .sort((a, b) => b.dateJoined > a.dateJoined)
      .filter(info => !info.wasCompleted)
      .filter(info => {
        console.log(`dateJoined of info is ${info.dateJoined}`);
        console.log(`${info.dateJoined < dateJoined}`);
        return info.dateJoined < dateJoined;
      });
    // .filter(info => info.dateJoined < dateJoined);
    // .map(info => {
    //   console.log(`dateJoined is ${dateJoined} and comparing it to ${info.dateJoined}`);
    //   console.log(`result is ${info.dateJoined < dateJoined}`);
    // });
    // .filter(info => info.dateJoined < dateJoined);
    console.log('queuelength is', queue.length);
    console.log('queueActiveInfront is', queueActiveInfront.length);
    return queueActiveInfront;
  };

  getQueuePosition = () => {
    const queueActiveInfront = this.getQueueActiveInfront();
    return queueActiveInfront.length;
  };

  getQueueWaitTimeMins = () => {
    // XX TODO
    // const { queue } = this.props;
    // const index = this.getQueuePosition();
    // const queueInfront = queue.slice(0, index);
    // const waitTimeMins =
    //   currentCall.lengthMins + queueInfront.reduce((total, order) => total + order.lengthMins, 0);
    // return waitTimeMins;]
    return 0;
  };

  JOINCALL = () => {
    // XX DELETE TESTING ONLY
    const { navigation } = this.props;
    navigation.navigate('CallFan');
  };

  leaveQueue = () => {
    // XX todo
    const { eventID, orderID } = this.props;
    removeFromQueue(eventID, orderID);
    this.goToMain();
  };

  goToMain = () => {
    const { navigation } = this.props;
    navigation.navigate('Main');
  };

  render() {
    const { ticketName, runSheet, organiserName } = this.props;

    // console.log('QueueFan, runSheet in props is', runSheet);

    const title = `${ticketName} with ${organiserName}`;

    const queuePosition = this.getQueuePosition();
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

    const queueWaitTimeMins = this.getQueueWaitTimeMins();

    return (
      <Container paddingHorizontal center>
        <Fonts.H2>You are in the queue for </Fonts.H2>
        <Fonts.H1>{title}</Fonts.H1>
        <Fonts.H2>{queuePositionText}</Fonts.H2>
        <Fonts.H2>Your estimated wait time is {queueWaitTimeMins} minutes</Fonts.H2>
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
