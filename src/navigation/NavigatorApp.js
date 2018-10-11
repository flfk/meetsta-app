import { createSwitchNavigator } from 'react-navigation';

import NavigatorAuth from './NavigatorAuth';
import NavigatorCallFan from './NavigatorCallFan';
import NavigatorCallOrganiser from './NavigatorCallOrganiser';
import NavigatorMain from './NavigatorMain';

const AppNavigator = createSwitchNavigator(
  {
    Auth: NavigatorAuth,
    Main: NavigatorMain,
    EventFan: NavigatorCallFan,
    EventOrganiser: NavigatorCallOrganiser,
  },
  {
    initialRouteName: 'Auth',
  }
);

export default AppNavigator;
