import React from 'react';
import { View } from 'react-native';

import Content from '../components/Content';
import Icons from '../components/Icons';
import VideoBar from '../components/VideoBar';
import VideoCaller from '../components/VideoCaller';
import VideoCallee from '../components/VideoCallee';

import FAN_ON_CALL from '../assets/FAN_ON_CALL.png';
import ORGANISER_ON_CALL from '../assets/ORGANISER_ON_CALL.png';

class CallFan extends React.Component {
  state = {
    remainingSecs: 60,
    timeFormatted: {
      mins: 0,
      secs: 0
    }
  };

  componentDidMount() {
    this.countdownStart();
  }

  componentWillUnmount() {
    this.countdownStop();
  }

  countdownStart = () => {
    this.interval = setInterval(() => {
      const { remainingSecs } = this.state;
      if (remainingSecs === 0) {
        this.countdownStop();
        return;
      }
      const timeFormatted = this.formatTime(remainingSecs);
      this.setState({ timeFormatted, remainingSecs: remainingSecs - 1 });
    }, 1000);
  };

  countdownStop = () => {
    clearInterval(this.interval);
  };

  formatTime = secs => {
    const timeFormatted = {
      mins: 0,
      secs: 0
    };
    timeFormatted.mins = Math.floor(secs / 60);
    timeFormatted.secs = secs % 60;
    return timeFormatted;
  };

  addLeadingZeros = value => {
    let valueUpdated = String(value);
    while (valueUpdated.length < 2) {
      valueUpdated = `0${valueUpdated}`;
    }
    return valueUpdated;
  };

  render() {
    const { timeFormatted } = this.state;

    return (
      <View>
        <VideoCallee>
          <VideoCallee.Image source={ORGANISER_ON_CALL} />
        </VideoCallee>
        <VideoBar.Top>
          <VideoBar.Background />
          <VideoBar.Content>
            <View />
            <VideoBar.Timer>
              <VideoBar.Text>{Icons.Hourglass}</VideoBar.Text>
              <VideoBar.Text>
                {timeFormatted.mins}:{this.addLeadingZeros(timeFormatted.secs)}
              </VideoBar.Text>
            </VideoBar.Timer>
          </VideoBar.Content>
        </VideoBar.Top>
        <VideoBar.Bottom>
          <VideoBar.Background />
          <VideoBar.Content>
            <View />
            <VideoBar.Text>{Icons.Hangup}</VideoBar.Text>
          </VideoBar.Content>
        </VideoBar.Bottom>
        <VideoCaller>
          <VideoCaller.Image source={FAN_ON_CALL} />
        </VideoCaller>
      </View>
    );
  }
}

export default CallFan;
