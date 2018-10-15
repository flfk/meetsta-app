import PropTypes from 'prop-types';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import auth from '../firebase/auth';
import Container from '../components/Container';
import NavigationService from '../navigation/NavigationService';
import Logo from '../components/Logo';
import { getLoggedInUser } from '../redux/user/user.actions';

const propTypes = {
  actionGetLoggedInUser: PropTypes.func.isRequired,
};

const defaultProps = {};

const mapDispatchToProps = dispatch => ({
  actionGetLoggedInUser: user => dispatch(getLoggedInUser(user)),
});

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this.getAuthState();
  }

  getAuthState = () => {
    // Listen for auth
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        const { actionGetLoggedInUser } = this.props;
        actionGetLoggedInUser(user);

        NavigationService.navigate('Main');
      } else {
        // No user is signed in.
        NavigationService.navigate('Auth');
      }
    });
  };

  render() {
    return (
      <Container center>
        <Logo />
      </Container>
    );
  }
}

AuthLoading.propTypes = propTypes;
AuthLoading.defaultProps = defaultProps;

export default connect(
  null,
  mapDispatchToProps
)(AuthLoading);
