import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import InputText from '../components/InputText';
import Btn from '../components/Btn';

import auth from '../firebase/auth';
import { createUser } from '../redux/user/user.actions';

const propTypes = {
  navigation: PropTypes.object.isRequired,
  actionCreateUser: PropTypes.func.isRequired,
  createUserError: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  email: state.user.user.email,
  createUserError: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  actionCreateUser: (email, password) => dispatch(createUser(email, password)),
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
    actionCreateUser(email, password);
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

  goToAuthErrors = errorCode => {
    const { navigation } = this.props;
    navigation.navigate('AuthErrors', { errorCode });
  };

  render() {
    const { password } = this.state;

    const { createUserError } = this.props;

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
        <Fonts.ERROR>{createUserError}</Fonts.ERROR>
      </Container>
    );
  }
}

SignupPassword.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPassword);
