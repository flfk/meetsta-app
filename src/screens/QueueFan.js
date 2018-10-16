import React from 'react';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';

const mapStateToProps = state => ({
  orderID: state.call.orderID,
  queue: state.call.queue,
});

const mapDispatchToProps = dispatch => ({
  // leaveQueue
});

class QueueFan extends React.Component {
  state = {
    eventTitle: "Andre Swilley's Online Meet & Greet",
    queuePosition: 3,
    queueWaitTimeMins: 10,
  };

  JOINCALL = () => {
    // XX DELETE TESTING ONLY
    const { navigation } = this.props;
    navigation.navigate('CallFan');
  };

  leaveQueue = () => {
    // XX todo
    this.goToMain();
  };

  goToMain = () => {
    const { navigation } = this.props;
    navigation.navigate('Main');
  };

  render() {
    const { eventTitle, queuePosition, queueWaitTimeMins } = this.state;

    console.log('the queue is ', this.props.queue);
    console.log('the orderID is ', this.props.orderID);

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueueFan);
