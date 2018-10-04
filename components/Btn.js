import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import COLORS from '../utils/Colors';

const propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const Primary = ({ title, onPress }) => (
  <WrapperPrimary onPress={onPress}>
    <TextPrimary>{title}</TextPrimary>
  </WrapperPrimary>
);

Primary.propTypes = propTypes;

const Secondary = ({ title, onPress }) => (
  <WrapperSecondary onPress={onPress}>
    <TextSecondary>{title}</TextSecondary>
  </WrapperSecondary>
);

Secondary.propTypes = propTypes;

const Tertiary = ({ title, onPress }) => (
  <WrapperTertiary onPress={onPress}>
    <TextSecondary>{title}</TextSecondary>
  </WrapperTertiary>
);

Tertiary.propTypes = propTypes;

// Styles

const Wrapper = styled.TouchableOpacity`
  padding: 8px 8px;
  margin-bottom: 16;
  border-radius: 50;
  align-items: center;
  width: 100%;
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
