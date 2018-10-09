import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import CallEndedFan from '../screens/CallEndedFan';
import CallFan from '../screens/CallFan';
import QueueFan from '../screens/QueueFan';
import NavBarStyle from './NavBarStyle';

const NavigatorCallFan = createSwitchNavigator(
  {
    CallEndedFan,
    CallFan,
    QueueFan
  },
  {
    initialRouteName: 'QueueFan'
  }
);

export default NavigatorCallFan;
