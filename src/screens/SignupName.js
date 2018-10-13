import PropTypes from 'prop-types';
import React from 'react';

import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import InputText from '../components/InputText';
import Btn from '../components/Btn';

const propTypes = {
  navigation: PropTypes.object.isRequired
};

class SignupName extends React.Component {
  state = {
    name: ''
  };

  handleChangeName = name => this.setState({ name });

  goToNext = () => {
    const { name } = this.state;
    const { navigation } = this.props;

    navigation.navigate('SignupEmail', {
      name
    });
  };

  render() {
    const { name } = this.state;

    return (
      <Container paddingHorizontal>
        <Fonts.H1>Tell us your name</Fonts.H1>
        <InputText
          label={'Name'}
          value={name}
          handler={this.handleChangeName}
          placeholder={'Your Name'}
        />
        <Btn.Primary title="Next" onPress={this.goToNext} />
      </Container>
    );
  }
}

SignupName.propTypes = propTypes;

export default SignupName;
