import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/Store';

import NavigatorApp from './navigation/NavigatorApp';
import NavigationService from './navigation/NavigationService';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigatorApp
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
