import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import InputText from '../components/InputText';
import Btn from '../components/Btn';

import { createUser, updateDisplayName } from '../redux/user/user.actions';

const propTypes = {
  navigation: PropTypes.object.isRequired,
  actionCreateUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  actionCreateUser: (email, password, displayName) =>
    dispatch(createUser(email, password, displayName)),
});

class SignupPassword extends React.Component {
  state = {
    password: '',
  };

  getNavParams = () => {
    const { navigation } = this.props;
    return {
      name: navigation.getParam('name', 'NO-NAME'),
      email: navigation.getParam('email', 'NO-EMAIL'),
    };
  };

  handleChangePassword = password => this.setState({ password });

  handleSignup = async () => {
    const { name, email } = this.getNavParams();
    const { password } = this.state;
    const { actionCreateUser } = this.props;
    actionCreateUser(email, password, name);
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
          isSecureTextEntry
        />
        <Btn.Primary title="Submit" onPress={this.handleSignup} />
      </Container>
    );
  }
}

SignupPassword.propTypes = propTypes;

export default connect(
  null,
  mapDispatchToProps
)(SignupPassword);
