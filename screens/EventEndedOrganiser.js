import React from 'react';

import Btn from '../components/Btn';
import Content from '../components/Content';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';

class CallEndedFan extends React.Component {
  state = {
    revenue: 0,
    ticketsSold: 0,
    addOnsSold: 0,
    paypalEmail: 'test@paypal.com'
  };

  render() {
    const { revenue, ticketsSold, addOnsSold, paypalEmail } = this.state;

    return (
      <Container padding>
        <Fonts.H1>🎉 Done!</Fonts.H1>
        <Fonts.H1>
          ${revenue} <Fonts.H3>earned</Fonts.H3>
        </Fonts.H1>
        <Fonts.H1>
          {ticketsSold} <Fonts.H3>ticket sold</Fonts.H3>
        </Fonts.H1>
        <Fonts.H1>
          {addOnsSold} <Fonts.H3>add ons sold</Fonts.H3>
        </Fonts.H1>
        <Fonts.H3 center>
          You will be paid at your paypal account {paypalEmail} within 48 hours
        </Fonts.H3>
        <Content.Seperator />
        <Btn.Primary title={'Make another event'} />
        <Btn.Tertiary title={'Back home'} />
      </Container>
    );
  }
}

export default CallEndedFan;
