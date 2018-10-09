import React from 'react';
import { View } from 'react-native';

import Fonts from '../utils/Fonts';
import Container from '../components/Container';
import InputText from '../components/InputText';
import Btn from '../components/Btn';

const STEP_NAME = 0;
const STEP_EMAIL = 1;
const STEP_PASSWORD = 2;

class SignUp extends React.Component {
  state = {
    email: 'test@email.com',
    name: '',
    password: '',
    signUpStep: 0
  };

  handleChangeName = name => this.setState({ name });

  handleChangeEmail = email => this.setState({ email });

  handleChangePassword = password => this.setState({ password });

  goToNext = () => {
    const { signUpStep } = this.state;
    if (signUpStep < 2) {
      this.setState(prevState => ({ signUpStep: prevState.signUpStep + 1 }));
    }
  };

  render() {
    const { email, name, password, signUpStep } = this.state;

    const signUpName = (
      <View>
        <Fonts.H1>Tell us your name</Fonts.H1>
        <InputText
          label={'Name'}
          value={name}
          handler={this.handleChangeName}
          placeholder={'Your Name'}
        />
        <Btn.Primary title="Next" onPress={this.goToNext} />
      </View>
    );

    const signUpEmail = (
      <View>
        <Fonts.H1>And, your email?</Fonts.H1>
        <InputText
          label={'Email'}
          value={email}
          handler={this.handleChangeEmail}
          placeholder={'Your Email'}
        />
        <Btn.Primary title="Next" onPress={this.goToNext} />
      </View>
    );

    const signUpPassword = (
      <View>
        <Fonts.H1>Create a password</Fonts.H1>
        <InputText
          label={'Password'}
          value={password}
          handler={this.handleChangePassword}
          placeholder={''}
          isSecureTextEntry={true}
        />
        <Btn.Primary title="Next" onPress={this.goToNext} />
      </View>
    );

    let signUpComponent = null;
    switch (signUpStep) {
      case STEP_PASSWORD:
        signUpComponent = signUpPassword;
        break;
      case STEP_EMAIL:
        signUpComponent = signUpEmail;
        break;
      case STEP_NAME:
        signUpComponent = signUpName;
        break;
      default:
    }

    return (
      <Container padding spaceBetween>
        {signUpComponent}
      </Container>
    );
  }
}

export default SignUp;
