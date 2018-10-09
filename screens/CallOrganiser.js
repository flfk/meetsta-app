import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Icons from '../components/Icons';
import VideoBar from '../components/VideoBar';
import VideoCaller from '../components/VideoCaller';
import VideoCallee from '../components/VideoCallee';

import FAN_ON_CALL from '../assets/FAN_ON_CALL.png';
import ORGANISER_ON_CALL from '../assets/ORGANISER_ON_CALL.png';

class CallOrganiser extends React.Component {
  state = {
    remainingSecs: 60,
    fanName: 'Jessica'
  };

  endCall = () => {
    const { navigation } = this.props;
    navigation.navigate('QueueOrganiser');
  };

  render() {
    const { remainingSecs, fanName } = this.state;

    return (
      <View>
        <VideoCallee>
          <VideoCallee.Image source={FAN_ON_CALL} />
        </VideoCallee>
        <VideoBar.Top>
          <VideoBar.Background />
          <VideoBar.Content>
            <VideoBar.Text>{fanName}</VideoBar.Text>
            <VideoBar.Text>
              {Icons.Hourglass}
              5:12
            </VideoBar.Text>
          </VideoBar.Content>
        </VideoBar.Top>
        <VideoBar.Bottom>
          <VideoBar.Background />
          <VideoBar.Content>
            <View />
            <TouchableOpacity onPress={this.endCall}>
              <VideoBar.Text>{Icons.Hangup}</VideoBar.Text>
            </TouchableOpacity>
          </VideoBar.Content>
        </VideoBar.Bottom>
        <VideoCaller>
          <VideoCaller.Image source={ORGANISER_ON_CALL} />
        </VideoCaller>
      </View>
    );
  }
}

export default CallOrganiser;
