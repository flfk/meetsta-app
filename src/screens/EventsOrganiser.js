import PropTypes from 'prop-types';
import React from 'react';
import { Linking, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import CellEvent from '../components/CellEvent';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import List from '../components/List';
import ListEventsPlaceholder from '../components/ListEventsPlaceholder';

import {
  fetchAdditionalCallFields,
  fetchCallInformation,
  fetchCallersInformation,
  fetchAdditionalEventFields,
  fetchCollEvents,
} from '../firebase/api';
import { addEventsAll } from '../redux/events/events.actions';

const propTypes = {
  actionAddEventsAll: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      revenue: PropTypes.number.isRequired,
      ticketsSold: PropTypes.number.isRequired,
      addOnsSold: PropTypes.number.isRequired,
      dateStart: PropTypes.number.isRequired,
    })
  ).isRequired,
  uid: PropTypes.string.isRequired,
};

const defaultProps = {};

const mapStateToProps = state => ({
  events: state.events,
  uid: state.user.uid,
});

const mapDispatchToProps = dispatch => ({
  actionAddEventsAll: orders => dispatch(addEventsAll(orders)),
});

class Events extends React.Component {
  state = {
    isLoading: false,
    refreshing: false,
  };

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents = async () => {
    this.setState({ isLoading: true });
    const { actionAddEventsAll, uid } = this.props;
    const eventsColl = await fetchCollEvents(uid);
    const events = await Promise.all(
      eventsColl.map(async eventsDoc => {
        const additionalFields = await fetchAdditionalEventFields(eventsDoc.eventID);
        return { ...eventsDoc, ...additionalFields };
      })
    );
    if (events.length > 0) {
      actionAddEventsAll(events);
    }
    this.setState({ isLoading: false });
  };

  loadCallOrderID = orderID => {
    const { actionAddOrderIDToCall } = this.props;
    actionAddOrderIDToCall(orderID);
  };

  loadCallEventDetails = orderID => {
    const { actionAddEventDetailsToCall, orders } = this.props;
    const event = orders.find(order => order.orderID === orderID);
    actionAddEventDetailsToCall(event);
  };

  renderItem = ({ item }) => {
    return (
      <CellEvent
        key={item.eventID}
        addOnsSold={item.addOnsSold}
        dateStart={item.dateStart}
        eventID={item.eventID}
        previewImgURL={item.previewImgURL}
        revenue={item.revenue}
        handleStartEvent={this.handleStartEvent}
        ticketsSold={item.ticketsSold}
        title={item.title}
      />
    );
  };

  renderHeader = {};

  handleStartEvent = async eventID => {
    // load the queue, completed calls,
    // load the current call?

    const {
      actionAddCompletedCalls,
      actionAddCurrentCall,
      actionAddEventDetailsToCall,
      actionAddQueue,
    } = this.props;
    console.log('Events, handleStartEvent with eventID of', eventID);
    const callInformation = await fetchCallInformation(eventID);

    const completedCallsOrderIDs = callInformation.completedCalls;
    const currentCallOrderID = callInformation.currentCall;
    const queueOrderIDs = callInformation.queue;
    // TODO

    // getCallersInformation =

    const currentCallAdditionalFields = await fetchAdditionalCallFields(currentCallOrderID);
    const currentCall = { orderID: currentCallOrderID, ...currentCallAdditionalFields };

    const queue = await Promise.all(
      queueOrderIDs.map(async queueOrderID => {
        const additionalFields = await fetchAdditionalCallFields(queueOrderID);
        return { orderID: queueOrderID, ...additionalFields };
      })
    );

    // console.log('Tickets, queue is ', queue);
    actionAddQueue(queue);
    actionAddOrderIDToCall(orderID);
    const event = orders.find(order => order.orderID === orderID);
    actionAddEventDetailsToCall(event);

    // XX TODO
    const { navigation } = this.props;
    navigation.navigate('EventOrganiser');
  };

  sortOrders = (a, b) => a.dateStart - b.dateStart;

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.loadEvents().then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    const { isLoading, refreshing } = this.state;
    const { events } = this.props;
    const eventsSorted = events.sort(this.sortEvents);

    const listEvents = (
      <List
        ListHeaderComponent={<Fonts.H1 marginLeft>My Events</Fonts.H1>}
        renderItem={this.renderItem}
        data={events}
        keyExtractor={(event, index) => event + index}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
      />
    );

    let content = isLoading ? <ListEventsPlaceholder /> : listEvents;

    if (!isLoading && events.length === 0) {
      content = (
        <Container paddingHorizontal>
          <Fonts.H1>Sorry for now creating events is an invite only feature</Fonts.H1>
          <Fonts.P>
            Are you an influencer and want to host your own event? Click the button below and send
            us your instagram handle.
          </Fonts.P>
          <Btn.Primary
            title="Request Access"
            onPress={() =>
              Linking.openURL('mailto:contact.meetsta@gmail.com?subject=I want a Meetsta Event')
            }
          />
        </Container>
      );
    }

    return <Container>{content}</Container>;
  }
}

Events.propTypes = propTypes;
Events.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
