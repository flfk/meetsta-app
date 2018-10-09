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
import SignUp from '../screens/SignUp';
import Tickets from '../screens/Tickets';

import NavigatorLogin from './NavigatorLogin';
import NavigatorMain from './NavigatorMain';

const AppNavigator = createSwitchNavigator(
  {
    Login: NavigatorLogin,
    Main: NavigatorMain,
    SignUp
  },
  {
    initialRouteName: 'Main'
  }
);

export default AppNavigator;
