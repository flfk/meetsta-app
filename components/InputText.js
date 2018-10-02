import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';

const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isSecureTextEntry: PropTypes.bool
};

const defaultProps = {
  placeholder: '',
  isSecureTextEntry: false
};

const InputText = props => {
  const { label, value, placeholder, handler, isSecureTextEntry } = props;

  return (
    <View>
      <Label>{label}</Label>
      <Input
        value={value}
        onChangeText={handler}
        secureTextEntry={isSecureTextEntry}
        placeholder={placeholder}
      />
    </View>
  );
};

const Label = styled.Text`
  font-size: ${Fonts.sizes.p};
  color: ${Colors.greys.supporting};
`;

const Input = styled.TextInput`
  font-size: ${Fonts.sizes.h1};
  color: ${Colors.greys.primary};
`;

InputText.propTypes = propTypes;
InputText.defaultProps = defaultProps;

export default InputText;
