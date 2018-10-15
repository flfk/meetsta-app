import PropTypes from 'prop-types';
import React from 'react';
import { RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import CellTicket from '../components/CellTicket';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import { getDate, getTimeStart } from '../utils/Helpers';
import ListTickets from '../components/ListTickets';

// import { XX } from '../firebase/api';
import { addEventsAll } from '../redux/orders/orders.actions';

import BANNER_ANDRE from '../assets/EventBannerAndre.jpg';

// const TEST_EVENTS = [
//   {
//     title: 'Meet Andre Swilley',
//     revenue: 50,
//     ticketsSold: 12,
//     addOnsSold: 5,
//     date: 'Sunday, 26 August',
//     time: '3:05pm PDT',
//   },
//   {
//     title: 'Meet Mostly Luca',
//     revenue: 50,
//     ticketsSold: 8,
//     addOnsSold: 5,
//     date: 'Sunday, 26 August',
//     time: '3:05pm PDT',
//   },
// ];

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
    // const { actionAddEventsAll, uid } = this.props;
    // const orderColl = await fetchCollEvents(uid);
    // const orders = await Promise.all(
    //   orderColl.map(async orderDoc => {
    //     const additionalFields = await fetchAdditionalOrderFields(orderDoc);
    //     return { ...orderDoc, ...additionalFields };
    //   })
    // );
    // if (orders.length > 0) {
    //   actionAddEventsAll(orders);
    // }
    this.setState({ isLoading: false });
  };

  renderItem = ({ item, index }) => {
    return (
      <CellTicket key={index}>
        <CellTicket.Image source={BANNER_ANDRE} />
        <Fonts.H1>{item.title}</Fonts.H1>
        <Fonts.H3>
          {getDate(item.dateStart)}, {getTimeStart(item.dateStart)}
        </Fonts.H3>
        <Fonts.H2>
          ${item.revenue} <Fonts.P>earned</Fonts.P>
        </Fonts.H2>
        <Fonts.H2>
          {item.ticketsSold} <Fonts.P>tickets sold</Fonts.P>
        </Fonts.H2>
        <Fonts.H2>
          {item.addOnsSold} <Fonts.P>add ons sold</Fonts.P>
        </Fonts.H2>
        <Btn.Primary title="Start Event" onPress={this.startEvent} />
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

    return (
      <Container>
        <ListTickets
          ListHeaderComponent={<Fonts.H1 marginLeft>My Events</Fonts.H1>}
          renderItem={this.renderItem}
          data={events}
          keyExtractor={(event, index) => event + index}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
        />
      </Container>
    );
  }
}

Events.propTypes = propTypes;
Events.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
