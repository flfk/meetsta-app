import React from 'react';
import { View } from 'react-native';

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

  render() {
    const { remainingSecs, fanName } = this.state;

    return (
      <View>
        <VideoCallee>
          <VideoCallee.Image source={FAN_ON_CALL} />
        </VideoCallee>
        <VideoBar.Top>
          <VideoBar.Background />
          <VideoBar.Text>{fanName}</VideoBar.Text>
          <VideoBar.Text>
            {Icons.Hourglass}
            5:10
          </VideoBar.Text>
        </VideoBar.Top>
        <VideoBar.Bottom>
          <VideoBar.Background />
          <View />
          <VideoBar.Text>{Icons.Hangup}</VideoBar.Text>
        </VideoBar.Bottom>
        <VideoCaller>
          <VideoCaller.Image source={ORGANISER_ON_CALL} />
        </VideoCaller>
      </View>
    );
  }
}

export default CallOrganiser;
