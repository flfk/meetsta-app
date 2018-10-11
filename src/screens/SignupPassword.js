import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import InputText from '../components/InputText';
import Btn from '../components/Btn';

import auth from '../firebase/auth';
import { createUser } from '../actions/user.actions';

const propTypes = {
  navigation: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  email: state.user.user.email,
});

const mapDispatchToProps = dispatch => ({
  createUser: (email, password) => dispatch(createUser(email, password)),
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
    try {
      this.props.createUser(email, password);
    } catch (error) {
      console.log('Error handling signup', error);
    }

    // const user = await this.createUser(email, password);
    // if (user) {
    //   const updatedUser = await this.updateDisplayName(name);
    //   const { navigation } = this.props;
    //   navigation.navigate('Main');
    // }
  };

  // createUser = async (email, password) => {
  //   try {
  //     const user = await auth.createUserWithEmailAndPassword(email, password);
  //     return user;
  //   } catch (error) {
  //     console.log('error', error);
  //     const errorCode = error.code;
  //     const { navigation } = this.props;
  //     navigation.navigate('AuthErrors', { errorCode });
  //   }
  // };

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

    const { email } = this.props;

    return (
      <Container paddingHorizontal>
        <Fonts.H1>Email: {email}</Fonts.H1>

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPassword);
