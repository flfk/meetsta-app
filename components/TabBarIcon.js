import { Icon } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';

import COLORS from '../utils/Colors';

const propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired
};

const defaultProps = {};

const TabBarIcon = props => {
  const { name, focused } = props;

  return (
    <Icon.Ionicons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? COLORS.primary.red : COLORS.greys.supporting}
    />
  );
};

TabBarIcon.propTypes = propTypes;
TabBarIcon.defaultProps = defaultProps;

export default TabBarIcon;
