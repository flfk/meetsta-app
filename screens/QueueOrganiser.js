import React from 'react';
import { View } from 'react-native';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Content from '../components/Content';
import Fonts from '../utils/Fonts';

class QueueOrganiser extends React.Component {
  state = {
    callsTotal: 8,
    remainingCalls: 4,
    remainingMins: 60,
    nextCaller: 'Jessica'
  };

  render() {
    const { callsTotal, remainingCalls, remainingMins, nextCaller } = this.state;

    const remainingCallsTxt = `${remainingCalls} of ${callsTotal} calls complete`;
    const remainingMinsTxt = `${remainingMins} minutes left`;

    return (
      <Container paddingHorizontal spaceAround>
        <Content center>
          <Fonts.H2>{remainingCallsTxt}</Fonts.H2>
          <Fonts.H2>{remainingMinsTxt}</Fonts.H2>
        </Content>
        <Content center>
          <Fonts.H2>Next fan is</Fonts.H2>
          <Fonts.H1>{nextCaller}</Fonts.H1>
        </Content>
        <Btn.Primary title="Start Call" />
      </Container>
    );
  }
}

export default QueueOrganiser;
