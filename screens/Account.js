import React from 'react';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';

const propTypes = {};

const defaultProps = {};

class Settings extends React.Component {
  state = {};

  logOut = () => {
    // XX TODO
  };

  render() {
    return (
      <Container spaceBetween paddingSides>
        <Fonts.H1>Your Account</Fonts.H1>
        <Btn.Secondary title="Log Out" onPress={this.logOut} />
      </Container>
    );
  }
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
