import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import React from 'react';

import AddTicket from '../screens/AddTicket';
import NavBarStyle from './NavBarStyle';
import EventsOrganiser from '../screens/EventsOrganiser';
import TabBarIcon from '../components/TabBarIcon';
import Tickets from '../screens/Tickets';

const StackTickets = createStackNavigator(
  {
    AddTicket,
    Tickets
  },
  {
    initialRouteName: 'Tickets',
    navigationOptions: NavBarStyle
  }
);

StackTickets.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
};

const StackEventsOrganiser = createStackNavigator(
  {
    EventsOrganiser
  },
  {
    initialRouteName: 'EventsOrganiser',
    navigationOptions: NavBarStyle
  }
);

StackEventsOrganiser.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  )
};

const NavigatorMain = createBottomTabNavigator({
  StackTickets,
  StackEventsOrganiser
});

export default NavigatorMain;
