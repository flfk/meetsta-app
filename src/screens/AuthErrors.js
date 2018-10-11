import PropTypes from 'prop-types';
import React from 'react';

import Container from '../components/Container';
import Fonts from '../utils/Fonts';

const propTypes = {
  navigation: PropTypes.object.isRequired,
};

class AuthErrors extends React.Component {
  state = {
    errorCode: '',
  };

  componentDidMount() {
    const errorCode = this.getErrorCode();
    this.setState({ errorCode });
  }

  getErrorText = errorCode => {
    const errorText = {
      title: "Oops, something wen't wrong",
      message: 'Please try again or contact us at contact.meetsta.com for help.',
    };

    if (errorCode === 'auth/email-already-in-use') {
      errorText.title = "You're already here!";
      errorText.message =
        'You already have an account with this email. Try logging in or email us at contact.meetsta@gmail.com to reset your password.';
    }

    if (errorCode === 'auth/invalid-email') {
      errorText.title = 'Looks like you tried to use an invalid email';
      errorText.message =
        'Your email address needs to include an @ symbol and should look something like example@email.com.';
    }

    if (errorCode === 'auth/weak-password') {
      errorText.title = 'Oops, your password needs to be at least 6 characters';
    }

    return errorText;
  };

  getErrorCode = () => {
    const { navigation } = this.props;
    return navigation.getParam('errorCode', '');
  };

  render() {
    const { errorCode } = this.state;

    const errorText = this.getErrorText(errorCode);

    return (
      <Container paddingHorizontal>
        <Fonts.H1>{errorText.title}</Fonts.H1>
        <Fonts.P>{errorText.message}</Fonts.P>
      </Container>
    );
  }
}

AuthErrors.propTypes = propTypes;

export default AuthErrors;
