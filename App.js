import React from 'react';
import { View } from 'react-native';

import AddTicket from './screens/AddTicket';
// import EventsOrganiser from './screens/EventsOrganiser';
import CallFan from './screens/CallFan';
import CallOrganiser from './screens/CallOrganiser';
import CallEndedFan from './screens/CallEndedFan';
import EventEndedOrganiser from './screens/EventEndedOrganiser';
import Login from './screens/Login';
import QueueFan from './screens/QueueFan';
import QueueOrganiser from './screens/QueueOrganiser';
import SignUp from './screens/SignUp';
import Tickets from './screens/Tickets';

export default class App extends React.Component {
  render() {
    return <EventEndedOrganiser />;
  }
}
