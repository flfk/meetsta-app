import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

import COLORS from '../utils/Colors';
import Fonts from '../utils/Fonts';

const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-end;
`;

const Bubble = styled.View`
  border-radius: 5px;
  margin: 0 16px;
  padding: 32px;
  background-color: ${COLORS.primary.red};
  box-shadow: 0 4px 6px #00000020;
`;

const BubbleText = styled(Fonts.H1)`
  color: white;
`;

const Triangle = styled.View`
  width: 0;
  height: 0;
  margin-right: 24px;
  box-shadow: 0 4px 6px #00000020;
  background-color: transparent;
  border-style: solid;
  border-top-width: 0;
  border-right-width: 16;
  border-bottom-width: 32;
  border-left-width: 16;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: ${COLORS.primary.red};
  border-left-color: transparent;
`;

const propTypes = {
  text: PropTypes.string.isRequired,
};

// const defaultProps = {};

class OnboardingBubble extends React.Component {
  render() {
    const { text } = this.props;

    return (
      <Container>
        <Triangle />
        <Bubble>
          <BubbleText center>{text}</BubbleText>
        </Bubble>
      </Container>
    );
  }
}

OnboardingBubble.propTypes = propTypes;

export default OnboardingBubble;
