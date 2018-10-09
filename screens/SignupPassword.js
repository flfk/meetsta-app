import PropTypes from 'prop-types';
import React from 'react';

import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import InputText from '../components/InputText';
import Btn from '../components/Btn';

const propTypes = {
  navigation: PropTypes.object.isRequired
};

class SignupPassword extends React.Component {
  state = {
    password: ''
  };

  handleChangePassword = password => this.setState({ password });

  getNavParams = () => {
    const { navigation } = this.props;
    return {
      name: navigation.getParam('name', 'NO-NAME'),
      email: navigation.getParam('email', 'NO-EMAIL')
    };
  };

  submitUser = () => {
    const { name, email } = this.getNavParams();
    const { password } = this.state;
    const { navigation } = this.props;
    console.log('creating new user with ', name, email, password);
    navigation.navigate('Main');
  };

  render() {
    const { password } = this.state;

    return (
      <Container padding>
        <Fonts.H1>Create a password</Fonts.H1>
        <InputText
          label={'Password'}
          value={password}
          handler={this.handleChangePassword}
          placeholder={''}
          isSecureTextEntry={true}
        />
        <Btn.Primary title="Submit" onPress={this.submitUser} />
      </Container>
    );
  }
}

SignupPassword.propTypes = propTypes;

export default SignupPassword;
