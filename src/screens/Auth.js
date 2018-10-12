import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Logo from '../components/Logo';
import { loginWithFacebook } from '../redux/user/user.actions';

import auth from '../firebase/auth';

const propTypes = {
  navigation: PropTypes.object.isRequired,
  actionLoginWithFacebook: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  actionLoginWithFacebook: () => dispatch(loginWithFacebook()),
});

class Auth extends React.Component {
  handleLogin = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  };

  handleFacebookLogin = async () => {
    const { actionLoginWithFacebook } = this.props;
    actionLoginWithFacebook();
  };

  handleSignup = () => {
    const { navigation } = this.props;
    navigation.navigate('SignupName');
  };

  render() {
    return (
      <Container paddingHorizontal center>
        <Logo />
        <Btn.Primary title="Sign Up" onPress={this.handleSignup} />
        <Btn.Secondary title="Sign In With Facebook" onPress={this.handleFacebookLogin} />
        <Btn.Secondary title="Log In" onPress={this.handleLogin} />
      </Container>
    );
  }
}

Auth.propTypes = propTypes;

export default connect(
  null,
  mapDispatchToProps
)(Auth);
