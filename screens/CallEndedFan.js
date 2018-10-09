import React from 'react';
import { Text } from 'react-native';

import Btn from '../components/Btn';
import Content from '../components/Content';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';

class CallEndedFan extends React.Component {
  state = {
    organiserName: 'Andre Swilley',
    email: 'test@email.com',
    addOns: []
  };

  render() {
    const { organiserName, addOns, email } = this.state;

    let addOnsView = null;
    let btnSouvenirs = null;
    if (addOns) {
      const addOnsFormatted = addOns.map((addOn, index) => {
        if (index + 1 === addOns.length) {
          return <Text key={addOn}>{addOn}</Text>;
        }
        if (index + 2 === addOns.length) {
          return <Text key={addOn}>{addOn} and </Text>;
        }
        return <Text key={addOn}>{addOn}, </Text>;
      });

      addOnsView = (
        <Fonts.H3>
          Within the 7 days we will your {addOnsFormatted} will be emailed to {email}.
        </Fonts.H3>
      );
      btnSouvenirs = <Btn.Primary title="Get More Souvenirs" />;
    }
    if (addOns.length === 0) {
      addOnsView = null;
      btnSouvenirs = <Btn.Primary title="Get Souvenirs" />;
    }

    return (
      <Container paddingHorizontal>
        <Fonts.H1 center>🎉 We hope you had an awesome time meeting {organiserName}!</Fonts.H1>
        {addOnsView}
        <Content.Seperator />
        {btnSouvenirs}
        <Btn.Tertiary title={'Back home'} />
      </Container>
    );
  }
}

export default CallEndedFan;
