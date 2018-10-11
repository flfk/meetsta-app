import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import TestRedux from './screens/TESTREDUX';

import NavigatorApp from './navigation/NavigatorApp';

export default class App extends React.Component {
  // render() {
  //   return (
  //     <Provider store={store}>
  //       <TestRedux />
  //     </Provider>
  //   );
  // }

  render() {
    return (
      <Provider store={store}>
        <NavigatorApp />
      </Provider>
    );
  }
}
