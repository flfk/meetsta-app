import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import { signOut } from '../redux/user/user.actions';

const propTypes = {
  actionSignOut: PropTypes.func.isRequired,
  displayName: PropTypes.string,
  email: PropTypes.string,
  uid: PropTypes.string,
};

const defaultProps = {
  displayName: '',
  email: '',
  uid: '',
};

const mapStateToProps = state => ({
  displayName: state.user.user.displayName,
  email: state.user.user.email,
  uid: state.user.user.uid,
  state: state,
});

const mapDispatchToProps = dispatch => ({
  actionSignOut: () => dispatch(signOut()),
});

class Account extends React.Component {
  handleSignOut = () => {
    const { actionSignOut } = this.props;
    actionSignOut();
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
        <Btn.Secondary title="Log Out" onPress={this.handleSignOut} />
      </Container>
    );
  }
}

Account.propTypes = propTypes;
Account.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
