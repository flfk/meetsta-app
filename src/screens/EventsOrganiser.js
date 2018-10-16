import PropTypes from 'prop-types';
import React from 'react';
import { Linking, RefreshControl, View } from 'react-native';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import CellTicket from '../components/CellTicket';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import Icons from '../components/Icons';
import { getDate, getTimeStart, getTimeRemaining } from '../utils/Helpers';
import List from '../components/List';
import ListEventsPlaceholder from '../components/ListEventsPlaceholder';

import { fetchAdditionalEventFields, fetchCollEvents } from '../firebase/api';
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
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerRight: <BtnNavBar title="Add ticket" onPress={() => navigation.navigate('AddTicket')} />
  //   };
  // };

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

  renderItem = ({ item, index }) => {
    let btn = null;
    const timeRemaining = getTimeRemaining(item.dateStart);
    const { days, diffMillis, hours, minutes } = timeRemaining;
    const btnText = `${days}d : ${hours}h : ${minutes}m to go`;
    if (diffMillis > 0) {
      btn = <Btn.Primary title="Start Event" onPress={this.startEvent} icon={Icons.Video} />;
    } else {
      btn = <Btn.Tertiary title={btnText} onPress={() => true} disabled icon={Icons.Hourglass} />;
    }

    return (
      <CellTicket key={index}>
        <CellTicket.Image source={{ uri: item.previewImgURL }} />
        <Fonts.H1>{item.title}</Fonts.H1>
        <Fonts.H3>{getDate(item.dateStart)}</Fonts.H3>
        <Fonts.H3>{getTimeStart(item.dateStart)}</Fonts.H3>
        <Fonts.H2>
          ${item.revenue.toFixed(0)} <Fonts.P>earned</Fonts.P>
        </Fonts.H2>
        <Fonts.H2>
          {item.ticketsSold} <Fonts.P>tickets sold</Fonts.P>
        </Fonts.H2>
        <Fonts.H2>
          {item.addOnsSold} <Fonts.P>add ons sold</Fonts.P>
        </Fonts.H2>
        {btn}
      </CellTicket>
    );
  };

  renderHeader = {};

  startEvent = () => {
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
