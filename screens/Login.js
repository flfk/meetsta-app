import React from 'react';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Content from '../components/Content';

class Login extends React.Component {
  static navigationOptions = {};

  Login = () => {
    // Todo XX
    // this.props.navigation.navigate('Main');
  };

  SignUp = () => {
    // Todo xx
    // this.props.navigation.navigate('SignUp');
  };

  render() {
    return (
      <Container>
        <Btn.Primary title="Sign Up" onPress={this.SignUp} />
        <Btn.Secondary title="Sign In With Facebook" onPress={this.Login} />
        <Btn.Secondary title="Log In" onPress={this.Login} />
      </Container>
    );
  }
}

export default Login;
