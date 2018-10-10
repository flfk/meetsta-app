import React from 'react';

import Btn from '../components/Btn';
import Container from '../components/Container';

class Login extends React.Component {
  static navigationOptions = {};

  handleLogin = () => {
    this.props.navigation.navigate('Main');
  };

  handleSignup = () => {
    this.props.navigation.navigate('SignupName');
  };

  render() {
    return (
      <Container paddingHorizontal center>
        <Btn.Primary title="Sign Up" onPress={this.handleSignup} />
        <Btn.Secondary title="Sign In With Facebook" onPress={this.handleLogin} />
        <Btn.Secondary title="Log In" onPress={this.handleLogin} />
      </Container>
    );
  }
}

export default Login;
