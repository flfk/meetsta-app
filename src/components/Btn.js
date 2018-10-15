import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import COLORS from '../utils/Colors';

const propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.element,
};

const defaultProps = {
  disabled: false,
  icon: null,
};

const Primary = ({ title, onPress, disabled, icon }) => (
  <WrapperPrimary onPress={onPress} disabled={disabled}>
    <TextPrimary>{icon}</TextPrimary>
    <TextPrimary>{title}</TextPrimary>
  </WrapperPrimary>
);

Primary.propTypes = propTypes;
Primary.defaultProps = defaultProps;

const Secondary = ({ title, onPress, disabled, icon }) => (
  <WrapperSecondary onPress={onPress} disabled={disabled}>
    <TextSecondary>{icon}</TextSecondary>
    <TextSecondary>{title}</TextSecondary>
  </WrapperSecondary>
);

Secondary.propTypes = propTypes;
Secondary.defaultProps = defaultProps;

const Tertiary = ({ title, onPress, disabled, icon }) => (
  <WrapperTertiary onPress={onPress} disabled={disabled}>
    <TextSecondary>{icon}</TextSecondary>
    <TextSecondary>{title}</TextSecondary>
  </WrapperTertiary>
);

Tertiary.propTypes = propTypes;
Tertiary.defaultProps = defaultProps;

// Styles

const Wrapper = styled.TouchableOpacity`
  flex-shrink: 0;
  padding-bottom: 8;
  padding-top: 8;
  margin-bottom: 16;
  border-radius: 5;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const WrapperPrimary = styled(Wrapper)`
  background-color: ${COLORS.primary.red};
  border: 2px solid ${COLORS.primary.red};
`;

const WrapperSecondary = styled(Wrapper)`
  border: 2px solid ${COLORS.primary.red};
`;

const WrapperTertiary = styled(Wrapper)`
  border: 2px solid white;
`;

const BtnText = styled.Text`
  font-size: 20;
  font-weight: bold;
`;

const TextPrimary = styled(BtnText)`
  color: white;
`;

const TextSecondary = styled(BtnText)`
  color: ${COLORS.primary.red};
`;

// Exports

const Btn = {};
Btn.Primary = Primary;
Btn.Secondary = Secondary;
Btn.Tertiary = Tertiary;

export default Btn;
