import React from 'react';
import { View } from 'react-native';

import AddTicket from './screens/AddTicket';
import Tickets from './screens/Tickets';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

export default class App extends React.Component {
  render() {
    return <AddTicket />;
  }
}
