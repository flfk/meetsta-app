import React from 'react';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';

class QueueFan extends React.Component {
  state = {
    eventTitle: "Andre Swilley's Online Meet & Greet",
    queuePosition: 3,
    queueWaitTimeMins: 10
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
      <Container paddingHorizontal>
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

export default QueueFan;
