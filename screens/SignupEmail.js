import PropTypes from 'prop-types';
import React from 'react';

import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import InputText from '../components/InputText';
import Btn from '../components/Btn';

const propTypes = {
  navigation: PropTypes.object.isRequired
};

class SignupEmail extends React.Component {
  state = {
    email: ''
  };

  handleChangeEmail = email => this.setState({ email });

  getNavParams = () => {
    const { navigation } = this.props;
    return {
      name: navigation.getParam('name', 'NO-NAME')
    };
  };

  goToNext = () => {
    const { email } = this.state;
    const { name } = this.getNavParams();
    const { navigation } = this.props;
    navigation.navigate('SignupPassword', {
      email,
      name
    });
  };

  render() {
    const { email } = this.state;

    return (
      <Container paddingHorizontal>
        <Fonts.H1>And, your email?</Fonts.H1>
        <InputText
          label={'Email'}
          value={email}
          handler={this.handleChangeEmail}
          placeholder={'Your Email'}
        />
        <Btn.Primary title="Next" onPress={this.goToNext} />
      </Container>
    );
  }
}

SignupEmail.propTypes = propTypes;

export default SignupEmail;
