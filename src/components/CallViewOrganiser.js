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
  fanName: PropTypes.string.isRequired,
  remainingSecs: PropTypes.number.isRequired,
};

const defaultProps = {};

const CallViewOrganiser = ({ endCall, fanName, remainingSecs }) => {
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
          <TouchableOpacity onPress={endCall}>
            <VideoBar.Text>{Icons.Hangup}</VideoBar.Text>
          </TouchableOpacity>
        </VideoBar.Content>
      </VideoBar.Bottom>
      <VideoCaller>
        <VideoCaller.Image source={ORGANISER_ON_CALL} />
      </VideoCaller>
    </View>
  );
};

CallViewOrganiser.propTypes = propTypes;
CallViewOrganiser.defaultProps = defaultProps;

export default CallViewOrganiser;
