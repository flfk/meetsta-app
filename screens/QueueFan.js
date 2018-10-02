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

  handleChangeOrderNum = orderNum => this.setState({ orderNum });

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
      <Container>
        <Fonts.H2>You are in the queue for </Fonts.H2>
        <Fonts.H1>{eventTitle}</Fonts.H1>
        <Fonts.H2>{queuePositionText}</Fonts.H2>
        <Fonts.H2>Your estimated wait time is {queueWaitTimeMins} minutes</Fonts.H2>
        <Btn.Secondary title="Leave Queue" />
      </Container>
    );
  }
}

export default QueueFan;
