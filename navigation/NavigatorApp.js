import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import AddTicket from '../screens/AddTicket';
import EventsOrganiser from '../screens/EventsOrganiser';
import CallFan from '../screens/CallFan';
import CallOrganiser from '../screens/CallOrganiser';
import CallEndedFan from '../screens/CallEndedFan';
import EventEndedOrganiser from '../screens/EventEndedOrganiser';
import Login from '../screens/Login';
import QueueFan from '../screens/QueueFan';
import QueueOrganiser from '../screens/QueueOrganiser';
import Tickets from '../screens/Tickets';

import NavigatorAuth from './NavigatorAuth';
import NavigatorMain from './NavigatorMain';

const AppNavigator = createSwitchNavigator(
  {
    Auth: NavigatorAuth,
    Main: NavigatorMain
  },
  {
    initialRouteName: 'Auth'
  }
);

export default AppNavigator;
