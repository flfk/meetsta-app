import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';

import auth from '../firebase/auth';

const propTypes = {
  displayName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
};

const defaultProps = {};

const mapStateToProps = state => ({
  displayName: state.user.user.displayName,
  email: state.user.user.email,
  uid: state.user.user.uid,
  state: state,
});

class Settings extends React.Component {
  logOut = () => {
    const { navigation } = this.props;
    navigation.navigate('Auth');
  };

  render() {
    const { displayName, email, uid, state } = this.props;

    console.log(state);

    return (
      <Container spaceBetween paddingHorizontal>
        <Fonts.H1>Your Account</Fonts.H1>
        <Fonts.H3>{displayName}</Fonts.H3>
        <Fonts.H3>{email}</Fonts.H3>
        <Fonts.H3>{uid}</Fonts.H3>
        <Btn.Secondary title="Log Out" onPress={this.logOut} />
      </Container>
    );
  }
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  null
)(Settings);
