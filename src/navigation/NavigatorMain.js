import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import React from 'react';

import AddTicket from '../screens/AddTicket';
import COLORS from '../utils/Colors';
import NavBarStyle from './NavBarStyle';
import EventsOrganiser from '../screens/EventsOrganiser';
import TabBarIcon from '../components/TabBarIcon';
import Tickets from '../screens/Tickets';
import Account from '../screens/Account';

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

// These navigation items both set the icon and hide the tab bar on anything but the main screen
StackTickets.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
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

const StackAccount = createStackNavigator(
  {
    Account
  },
  {
    initialRouteName: 'Account',
    navigationOptions: NavBarStyle
  }
);

StackAccount.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-settings${focused ? '' : '-outline'}` : 'md-settings'}
    />
  )
};

const NavigatorMain = createBottomTabNavigator(
  {
    StackTickets,
    StackEventsOrganiser,
    StackAccount
  },
  {
    tabBarOptions: {
      activeTintColor: `${COLORS.primary.red}`
    }
  }
);

export default NavigatorMain;