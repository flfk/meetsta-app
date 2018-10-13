import { createSwitchNavigator } from 'react-navigation';

import CallEndedFan from '../screens/CallEndedFan';
import CallFan from '../screens/CallFan';
import QueueFan from '../screens/QueueFan';

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
