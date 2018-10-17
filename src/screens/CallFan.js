import React from 'react';
import { connect } from 'react-redux';

import CallViewFan from '../components/CallViewFan';

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

    return <CallViewFan endCall={this.endCall} timeFormatted={timeFormatted} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallFan);
