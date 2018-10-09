import { createSwitchNavigator } from 'react-navigation';

import EventEndedOrganiser from '../screens/EventEndedOrganiser';
import CallOrganiser from '../screens/CallOrganiser';
import QueueOrganiser from '../screens/QueueOrganiser';

const NavigatorCallFan = createSwitchNavigator(
  {
    EventEndedOrganiser,
    CallOrganiser,
    QueueOrganiser
  },
  {
    initialRouteName: 'QueueOrganiser'
  }
);

export default NavigatorCallFan;
