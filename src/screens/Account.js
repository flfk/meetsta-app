import React from 'react';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';

import auth from '../firebase/auth';

const propTypes = {};

const defaultProps = {};

class Settings extends React.Component {
  state = {
    name: 'XX',
    email: 'XX',
    uid: 'XX'
  };

  componentDidMount() {
    console.log('Settings mounting');
    this.getCurrentUser();
  }

  getCurrentUser = async () => {
    const user = await auth.currentUser;
    console.log('current user is ', user);
    this.setState({ name: user.displayName, email: user.email, uid: user.uid });
  };

  logOut = () => {
    const { navigation } = this.props;
    navigation.navigate('Auth');
  };

  render() {
    const { name, email, uid } = this.state;

    return (
      <Container spaceBetween paddingHorizontal>
        <Fonts.H1>Your Account</Fonts.H1>
        <Fonts.H3>{name}</Fonts.H3>
        <Fonts.H3>{email}</Fonts.H3>
        <Fonts.H3>{uid}</Fonts.H3>
        <Btn.Secondary title="Log Out" onPress={this.logOut} />
      </Container>
    );
  }
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
