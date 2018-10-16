import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Content from '../components/Content';
import Fonts from '../utils/Fonts';

const propTypes = {
  completedCalls: PropTypes.arrayOf(
    PropTypes.shape({
      lengthMins: PropTypes.number,
      orderID: PropTypes.string,
      uid: PropTypes.string,
    })
  ).isRequired,
  currentCall: PropTypes.shape({
    lengthMins: PropTypes.number,
    orderID: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  eventID: PropTypes.string.isRequired,
  eventTitle: PropTypes.string.isRequired,
  queue: PropTypes.arrayOf(
    PropTypes.shape({
      lengthMins: PropTypes.number,
      orderID: PropTypes.string,
      uid: PropTypes.string,
    })
  ).isRequired,
  orderID: PropTypes.string.isRequired,
};

const defaultProps = {};

const mapStateToProps = state => ({
  completedCalls: state.call.completedCalls,
  currentCall: state.call.currentCall,
  eventID: state.call.eventID,
  eventTitle: state.call.eventTitle,
  queue: state.call.queue,
  orderID: state.call.orderID,
});

const mapDispatchToProps = dispatch => ({});

class QueueOrganiser extends React.Component {
  state = {
    callsTotal: 8,
    remainingCalls: 4,
    remainingMins: 60,
    nextCaller: 'Jessica',
  };

  ENDEVENT = () => {
    // XX DELETE TESTING ONLY
    const { navigation } = this.props;
    navigation.navigate('EventEndedOrganiser');
  };

  startCall = () => {
    const { navigation } = this.props;
    navigation.navigate('CallOrganiser');
  };

  render() {
    const { callsTotal, remainingCalls, remainingMins, nextCaller } = this.state;

    const remainingCallsTxt = `${remainingCalls} of ${callsTotal} calls complete`;
    const remainingMinsTxt = `${remainingMins} minutes left`;

    return (
      <Container paddingHorizontal spaceAround>
        <Content center>
          <Fonts.H2>{remainingCallsTxt}</Fonts.H2>
          <Fonts.H2>{remainingMinsTxt}</Fonts.H2>
        </Content>
        <Content center>
          <Fonts.H2>Next fan is</Fonts.H2>
          <Fonts.H1>{nextCaller}</Fonts.H1>
        </Content>
        <Btn.Primary title="Start Call" onPress={this.startCall} />
        <Btn.Secondary title="TEST BTN END EVENT" onPress={this.ENDEVENT} />
      </Container>
    );
  }
}

QueueOrganiser.propTypes = propTypes;
QueueOrganiser.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueueOrganiser);
