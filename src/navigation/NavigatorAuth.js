import { createStackNavigator } from 'react-navigation';

import COLORS from '../utils/Colors';
import Login from '../screens/Login';
// import Signup from '../screens/Signup';
import SignupEmail from '../screens/SignupEmail';
import AuthErrors from '../screens/AuthErrors';
import SignupName from '../screens/SignupName';
import SignupPassword from '../screens/SignupPassword';

const NavigatorAuth = createStackNavigator(
  {
    Login,
    SignupEmail,
    AuthErrors,
    SignupName,
    SignupPassword
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

export default NavigatorAuth;
