import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Icons from './Icons';
import VideoBar from './VideoBar';
import VideoCaller from './VideoCaller';
import VideoCallee from './VideoCallee';

import FAN_ON_CALL from '../assets/FAN_ON_CALL.png';
import ORGANISER_ON_CALL from '../assets/ORGANISER_ON_CALL.png';

const propTypes = {
  endCall: PropTypes.func.isRequired,
  timeFormatted: PropTypes.shape({
    mins: PropTypes.number.isRequired,
    secs: PropTypes.number.isRequired,
  }).isRequired,
};

const defaultProps = {};

const CallViewFan = ({ endCall, timeFormatted }) => {
  const addLeadingZeros = value => {
    let valueUpdated = String(value);
    while (valueUpdated.length < 2) {
      valueUpdated = `0${valueUpdated}`;
    }
    return valueUpdated;
  };

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
              {timeFormatted.mins}:{addLeadingZeros(timeFormatted.secs)}
            </VideoBar.Text>
          </VideoBar.Timer>
        </VideoBar.Content>
      </VideoBar.Top>
      <VideoBar.Bottom>
        <VideoBar.Background />
        <VideoBar.Content>
          <View />
          <TouchableOpacity onPress={endCall}>
            <VideoBar.Text>{Icons.Hangup}</VideoBar.Text>
          </TouchableOpacity>
        </VideoBar.Content>
      </VideoBar.Bottom>
      <VideoCaller>
        <VideoCaller.Image source={FAN_ON_CALL} />
      </VideoCaller>
    </View>
  );
};

CallViewFan.propTypes = propTypes;
CallViewFan.defaultProps = defaultProps;

export default CallViewFan;
