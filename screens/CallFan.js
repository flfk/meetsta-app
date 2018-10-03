import React from 'react';
import { View, Text, Image } from 'react-native';

import Fonts from '../utils/Fonts';
import VideoBar from '../components/VideoBar';
import VideoCaller from '../components/VideoCaller';
import VideoCallee from '../components/VideoCallee';

import FAN_ON_CALL from '../assets/FAN_ON_CALL.png';
import ORGANISER_ON_CALL from '../assets/ORGANISER_ON_CALL.png';

class QueueOrganiser extends React.Component {
  state = {
    remainingSecs: 60
  };

  render() {
    const { remainingSecs } = this.state;

    return (
      <View>
        <VideoCallee>
          <VideoCallee.Image source={ORGANISER_ON_CALL} />
        </VideoCallee>
        <VideoBar.Top>
          <VideoBar.Background />
          <View />
          <VideoBar.Text>5:10</VideoBar.Text>
        </VideoBar.Top>
        <VideoBar.Bottom />
        <VideoCaller>
          <VideoCaller.Image source={FAN_ON_CALL} />
        </VideoCaller>
      </View>
    );
  }
}

export default QueueOrganiser;
