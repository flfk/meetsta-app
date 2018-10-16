import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';

import { removeFromQueue } from '../firebase/api';

const propTypes = {
  orderID: PropTypes.string.isRequired,
  eventID: PropTypes.string.isRequired,
  queue: PropTypes.arrayOf(
    PropTypes.shape({
      lengthMins: PropTypes.number,
      orderID: PropTypes.string,
      uid: PropTypes.string,
    })
  ).isRequired,
  currentCall: PropTypes.shape({
    lengthMins: PropTypes.number,
    orderID: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

const defaultProps = {};

const mapStateToProps = state => ({
  orderID: state.call.orderID,
  eventID: state.call.eventID,
  queue: state.call.queue,
  currentCall: state.call.currentCall,
});

const mapDispatchToProps = dispatch => ({
  // leaveQueue
});

class QueueFan extends React.Component {
  state = {
    eventTitle: "Andre Swilley's Online Meet & Greet",
    queueWaitTimeMins: 10,
  };

  componentDidMount() {}

  getQueueIndex = () => {
    const { orderID, queue } = this.props;
    const queueOrderIDs = queue.map(item => item.orderID);
    const index = queueOrderIDs.indexOf(orderID);
    if (queueOrderIDs.indexOf(orderID) === -1) {
      console.error('QueueFan getQueueIndex orderID not found in queue');
    }
    return index;
  };

  getQueueWaitTimeMins = () => {
    const { queue, currentCall } = this.props;
    const index = this.getQueueIndex();
    const queueInfront = queue.slice(0, index);
    const waitTimeMins =
      currentCall.lengthMins + queueInfront.reduce((total, order) => total + order.lengthMins, 0);
    return waitTimeMins;
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
    const { eventTitle } = this.state;

    const queuePosition = this.getQueueIndex() + 1;
    let queuePositionText = null;
    switch (queuePosition) {
      case 1:
        queuePositionText = 'You are next in line!';
        break;
      case 2:
        queuePositionText = 'There is 1 person ahead of you';
        break;
      default:
        queuePositionText = `There are ${queuePosition - 1} people ahead of you`;
        break;
    }

    const queueWaitTimeMins = this.getQueueWaitTimeMins();

    return (
      <Container paddingHorizontal center>
        <Fonts.H2>You are in the queue for </Fonts.H2>
        <Fonts.H1>{eventTitle}</Fonts.H1>
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
  mapDispatchToProps
)(QueueFan);
