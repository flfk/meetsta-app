import React from 'react';
import { View } from 'react-native';

import AddTicket from './screens/AddTicket';
import Login from './screens/Login';
import QueueFan from './screens/QueueFan';
import SignUp from './screens/SignUp';
import Tickets from './screens/Tickets';

export default class App extends React.Component {
  render() {
    return <QueueFan />;
  }
}
