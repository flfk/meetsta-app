import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import Container from '../components/Container';
import InputText from '../components/InputText';
import { login } from '../redux/user/user.actions';

const propTypes = {
  actionLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  actionLogin: (email, password) => dispatch(login(email, password)),
});

class Login extends React.Component {
  state = {
    email: 'test@test.com',
    password: 'password',
  };

  handleChangeEmail = email => this.setState({ email });

  handleChangePassword = password => this.setState({ password });

  handleLogin = () => {
    const { email, password } = this.state;
    const { actionLogin } = this.props;
    actionLogin(email, password);
  };

  render() {
    const { email, password } = this.state;

    return (
      <Container paddingHorizontal center>
        <InputText
          label={'Email'}
          value={email}
          handler={this.handleChangeEmail}
          placeholder={'Your Email'}
        />
        <InputText
          label={'Password'}
          value={password}
          handler={this.handleChangePassword}
          placeholder={''}
          isSecureTextEntry
        />
        <Btn.Primary title="Log In" onPress={this.handleLogin} />
      </Container>
    );
  }
}

Login.propTypes = propTypes;

export default connect(
  null,
  mapDispatchToProps
)(Login);
