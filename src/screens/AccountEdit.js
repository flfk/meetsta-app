import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import BtnNavBar from '../components/BtnNavBar';
import Container from '../components/Container';
import InputText from '../components/InputText';
import { updateDisplayName, updateEmail } from '../redux/user/user.actions';

const propTypes = {
  actionUpdateDisplayName: PropTypes.func.isRequired,
  actionUpdateEmail: PropTypes.func.isRequired,
  displayName: PropTypes.string,
  email: PropTypes.string,
  navigation: PropTypes.object.isRequired,
};

const defaultProps = {
  displayName: '',
  email: '',
};

const mapStateToProps = state => ({
  displayName: state.user.displayName,
  email: state.user.email,
  uid: state.user.uid,
});

const mapDispatchToProps = dispatch => ({
  actionUpdateDisplayName: name => dispatch(updateDisplayName(name)),
  actionUpdateEmail: email => dispatch(updateEmail(email)),
});

class AccountEdit extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <BtnNavBar title="X" onPress={() => navigation.navigate('Account')} />,
      headerTitle: 'Edit Account',
    };
  };

  state = {
    email: this.props.email,
    name: this.props.displayName,
  };

  handleChangeEmail = email => this.setState({ email });

  handleChangeName = name => this.setState({ name });

  handleSave = () => {
    const { email, name } = this.state;
    const { actionUpdateDisplayName, actionUpdateEmail, navigation } = this.props;
    actionUpdateDisplayName(name);
    actionUpdateEmail(email);
    navigation.navigate('Account');
  };

  render() {
    const { email, name } = this.state;

    return (
      <Container spaceBetween paddingHorizontal>
        <InputText
          label={'Name'}
          value={name}
          handler={this.handleChangeName}
          placeholder={'Your Name'}
        />
        <InputText
          label={'Email'}
          value={email}
          handler={this.handleChangeEmail}
          placeholder={'Your Email'}
        />
        <Btn.Primary title="Save" onPress={this.handleSave} />
      </Container>
    );
  }
}

AccountEdit.propTypes = propTypes;
AccountEdit.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountEdit);
