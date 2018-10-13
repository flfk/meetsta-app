import { createSwitchNavigator } from 'react-navigation';

import NavigatorAuth from './NavigatorAuth';
import NavigatorAuthLoading from './NavigatorAuthLoading';
import NavigatorCallFan from './NavigatorCallFan';
import NavigatorCallOrganiser from './NavigatorCallOrganiser';
import NavigatorMain from './NavigatorMain';

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: NavigatorAuthLoading,
    Auth: NavigatorAuth,
    Main: NavigatorMain,
    EventFan: NavigatorCallFan,
    EventOrganiser: NavigatorCallOrganiser,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default AppNavigator;
