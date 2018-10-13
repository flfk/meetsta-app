import { createStackNavigator } from 'react-navigation';

import COLORS from '../utils/Colors';
import Auth from '../screens/Auth';
import AuthErrors from '../screens/AuthErrors';
import Login from '../screens/Login';
import SignupEmail from '../screens/SignupEmail';
import SignupName from '../screens/SignupName';
import SignupPassword from '../screens/SignupPassword';

const NavigatorAuth = createStackNavigator(
  {
    Auth,
    AuthErrors,
    Login,
    SignupEmail,
    SignupName,
    SignupPassword,
  },
  {
    initialRouteName: 'Auth',
    navigationOptions: {
      headerTintColor: `${COLORS.primary.red}`,
      headerStyle: {
        // backgroundColor: 'white'
        shadowColor: 'transparent',
        borderBottomWidth: 0,
      },
    },
  }
);

export default NavigatorAuth;
