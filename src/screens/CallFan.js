import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Icons from '../components/Icons';
import VideoBar from '../components/VideoBar';
import VideoCaller from '../components/VideoCaller';
import VideoCallee from '../components/VideoCallee';

import FAN_ON_CALL from '../assets/FAN_ON_CALL.png';
import ORGANISER_ON_CALL from '../assets/ORGANISER_ON_CALL.png';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class CallFan extends React.Component {
  state = {
    remainingSecs: 5,
    timeFormatted: {
      mins: 0,
      secs: 0,
    },
  };

  componentDidMount() {
    this.countdownStart();
  }

  componentWillUnmount() {
    this.countdownStop();
  }

  addLeadingZeros = value => {
    let valueUpdated = String(value);
    while (valueUpdated.length < 2) {
      valueUpdated = `0${valueUpdated}`;
    }
    return valueUpdated;
  };

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
    this.endCall();
  };

  endCall = () => {
    this.goToCallEndedFan();
  };

  formatTime = secs => {
    const timeFormatted = {
      mins: 0,
      secs: 0,
    };
    timeFormatted.mins = Math.floor(secs / 60);
    timeFormatted.secs = secs % 60;
    return timeFormatted;
  };

  goToCallEndedFan = () => {
    const { navigation } = this.props;
    navigation.navigate('CallEndedFan');
  };

  disconnect = () => {};

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
            <TouchableOpacity onPress={this.endCall}>
              <VideoBar.Text>{Icons.Hangup}</VideoBar.Text>
            </TouchableOpacity>
          </VideoBar.Content>
        </VideoBar.Bottom>
        <VideoCaller>
          <VideoCaller.Image source={FAN_ON_CALL} />
        </VideoCaller>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallFan);
