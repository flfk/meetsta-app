import React from 'react';
import { View } from 'react-native';

import Fonts from '../utils/Fonts';
import Container from '../components/Container';
import InputText from '../components/InputText';
import Btn from '../components/Btn';

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
        />
        <Btn.Primary title="Next" onPress={this.goToNext} />
      </View>
    );

    let signUpComponent = null;
    switch (signUpStep) {
      case 2:
        signUpComponent = signUpPassword;
        break;
      case 1:
        signUpComponent = signUpEmail;
        break;
      default:
        signUpComponent = signUpName;
    }

    return <Container>{signUpComponent}</Container>;
  }
}

export default SignUp;
