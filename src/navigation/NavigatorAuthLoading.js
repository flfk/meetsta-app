import { createSwitchNavigator } from 'react-navigation';

import AuthLoading from '../screens/AuthLoading';

const NavigatorAuthLoading = createSwitchNavigator(
  {
    AuthLoading,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default NavigatorAuthLoading;
