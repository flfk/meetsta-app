import PropTypes from 'prop-types';
import React from 'react';

import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import InputText from '../components/InputText';
import Btn from '../components/Btn';

import auth from '../firebase/auth';

const propTypes = {
  navigation: PropTypes.object.isRequired
};

class SignupPassword extends React.Component {
  state = {
    password: ''
  };

  getNavParams = () => {
    const { navigation } = this.props;
    return {
      name: navigation.getParam('name', 'NO-NAME'),
      email: navigation.getParam('email', 'NO-EMAIL')
    };
  };

  handleChangePassword = password => this.setState({ password });

  handleSignup = async () => {
    const { name, email } = this.getNavParams();
    const { password } = this.state;
    const user = await this.createUser(email, password);
    if (user) {
      const updatedUser = await this.updateDisplayName(name);
      const { navigation } = this.props;
      navigation.navigate('Main');
    }
  };

  createUser = async (email, password) => {
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);
      return user;
    } catch (error) {
      console.log('error', error);
      const errorCode = error.code;
      const { navigation } = this.props;
      navigation.navigate('AuthErrors', { errorCode });
    }
  };

  updateDisplayName = async displayName => {
    try {
      const user = await auth.currentUser;
      const updatedUser = await user.updateProfile({ displayName });
      return updatedUser;
    } catch (error) {
      console.error('Error updating display name, ', error);
    }
  };

  render() {
    const { password } = this.state;

    return (
      <Container paddingHorizontal>
        <Fonts.H1>Create a password</Fonts.H1>
        <InputText
          label={'Password'}
          value={password}
          handler={this.handleChangePassword}
          placeholder={''}
          isSecureTextEntry={true}
        />
        <Btn.Primary title="Submit" onPress={this.handleSignup} />
      </Container>
    );
  }
}

SignupPassword.propTypes = propTypes;

export default SignupPassword;
