import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import InputText from '../components/InputText';
import Btn from '../components/Btn';

import auth from '../firebase/auth';
import { createUser, updateDisplayName } from '../redux/user/user.actions';

const propTypes = {
  navigation: PropTypes.object.isRequired,
  actionCreateUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  actionCreateUser: (email, password) => dispatch(createUser(email, password)),
  actionupdateDisplayName: displayName => dispatch(updateDisplayName(displayName)),
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
    const { actionCreateUser, actionupdateDisplayName } = this.props;
    actionCreateUser(email, password);
    actionupdateDisplayName(name);
  };

  setDisplayName = async displayName => {
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
