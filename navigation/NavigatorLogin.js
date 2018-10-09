import { createStackNavigator } from 'react-navigation';

import COLORS from '../utils/Colors';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const NavigatorLogin = createStackNavigator(
  {
    Login,
    SignUp
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerTintColor: `${COLORS.primary.red}`,
      headerStyle: {
        // backgroundColor: 'white'
        shadowColor: 'transparent',
        borderBottomWidth: 0
      }
    }
  }
);

export default NavigatorLogin;
