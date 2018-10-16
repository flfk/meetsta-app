import React from 'react';

import CallViewOrganiser from '../components/CallViewOrganiser';

class CallOrganiser extends React.Component {
  state = {
    remainingSecs: 60,
    fanName: 'Jessica',
  };

  endCall = () => {
    const { navigation } = this.props;
    navigation.navigate('QueueOrganiser');
  };

  render() {
    const { remainingSecs, fanName } = this.state;

    return (
      <CallViewOrganiser endCall={this.endCall} remainingSecs={remainingSecs} fanName={fanName} />
    );
  }
}

export default CallOrganiser;
