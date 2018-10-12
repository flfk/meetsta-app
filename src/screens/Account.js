import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import BtnNavBar from '../components/BtnNavBar';
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
  displayName: state.user.displayName,
  email: state.user.email,
  uid: state.user.uid,
  state: state,
});

const mapDispatchToProps = dispatch => ({
  actionSignOut: () => dispatch(signOut()),
});

class Account extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: <BtnNavBar title="Edit" onPress={() => navigation.navigate('AccountEdit')} />,
    };
  };

  handleSignOut = () => {
    const { actionSignOut } = this.props;
    actionSignOut();
  };

  render() {
    const { displayName, email, uid, state } = this.props;

    // console.log('state is ', state);

    return (
      <Container spaceBetween paddingHorizontal>
        <Fonts.H1>{displayName}</Fonts.H1>
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
