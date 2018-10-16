import PropTypes from 'prop-types';
import React from 'react';
import { RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import BtnNavBar from '../components/BtnNavBar';
import CellOrder from '../components/CellOrder';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import List from '../components/List';
import ListTicketsPlaceholder from '../components/ListTicketsPlaceholder';
import OnboardingBubble from '../components/OnboardingBubble';

import {
  addToQueue,
  fetchCallersInformation,
  fetchCollOrders,
  fetchAdditionalOrderFields,
} from '../firebase/api';
import { addQueue, addEventDetailsToCall, addOrderIDToCall } from '../redux/call/call.actions';
import { addOrdersAll } from '../redux/orders/orders.actions';

const propTypes = {
  actionAddEventDetailsToCall: PropTypes.func.isRequired,
  actionAddOrderIDToCall: PropTypes.func.isRequired,
  actionAddQueue: PropTypes.func.isRequired,
  actionAddOrdersAll: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      organiserName: PropTypes.string.isRequired,
      dateStart: PropTypes.number.isRequired,
      orderRef: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      orderID: PropTypes.string.isRequired,
      eventID: PropTypes.string.isRequired,
      ticketID: PropTypes.string.isRequired,
    })
  ).isRequired,
  uid: PropTypes.string.isRequired,
};

const defaultProps = {};

const mapStateToProps = state => ({
  orders: state.orders,
  uid: state.user.uid,
});

const mapDispatchToProps = dispatch => ({
  actionAddOrdersAll: orders => dispatch(addOrdersAll(orders)),
  actionAddQueue: queue => dispatch(addQueue(queue)),
  actionAddOrderIDToCall: orderID => dispatch(addOrderIDToCall(orderID)),
  actionAddEventDetailsToCall: event => dispatch(addEventDetailsToCall(event)),
});

class Tickets extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <BtnNavBar title="Add ticket" onPress={() => navigation.navigate('AddTicket')} />
      ),
    };
  };

  state = {
    isLoading: false,
    refreshing: false,
  };

  componentDidMount() {
    this.loadOrders();
  }

  loadOrders = async () => {
    this.setState({ isLoading: true });
    const { actionAddOrdersAll, uid } = this.props;
    const orderColl = await fetchCollOrders(uid);
    const ordersNotCompleted = orderColl.filter(orderDoc => !orderDoc.wasCompleted);
    const orders = await Promise.all(
      ordersNotCompleted.map(async orderDoc => {
        const additionalFields = await fetchAdditionalOrderFields(orderDoc);
        return { ...orderDoc, ...additionalFields };
      })
    );
    if (orders.length > 0) {
      actionAddOrdersAll(orders);
    }
    this.setState({ isLoading: false });
  };

  handleJoinQueue = async (eventID, orderID) => {
    const {
      actionAddEventDetailsToCall,
      actionAddOrderIDToCall,
      actionAddQueue,
      orders,
    } = this.props;

    const event = orders.find(order => order.orderID === orderID);
    const queueOrderIDs = await addToQueue(eventID, orderID);
    const queue = await fetchCallersInformation(queueOrderIDs);

    actionAddEventDetailsToCall(event);
    actionAddOrderIDToCall(orderID);
    actionAddQueue(queue);

    const { navigation } = this.props;
    navigation.navigate('EventFan');
  };

  renderItem = ({ item }) => {
    return (
      <CellOrder
        key={item.orderID}
        dateStart={item.dateStart}
        eventID={item.eventID}
        name={item.name}
        orderID={item.orderID}
        orderRef={item.orderRef}
        organiserName={item.organiserName}
        previewImgURL={item.previewImgURL}
        handleJoinQueue={this.handleJoinQueue}
      />
    );
  };

  renderHeader = {};

  sortOrders = (a, b) => a.dateStart - b.dateStart;

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.loadOrders().then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    // console.log('Orders are', this.props.orders);
    const { isLoading, refreshing } = this.state;
    const { orders } = this.props;
    const ordersSorted = orders.sort(this.sortOrders);

    const listTickets = (
      <List
        ListHeaderComponent={<Fonts.H1 marginLeft>My Tickets</Fonts.H1>}
        renderItem={this.renderItem}
        data={ordersSorted}
        keyExtractor={(event, index) => event + index}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
      />
    );

    let content = isLoading ? <ListTicketsPlaceholder /> : listTickets;

    if (!isLoading && orders.length === 0) {
      content = <OnboardingBubble text="Click here to add your first ticket" />;
    }

    return <Container>{content}</Container>;
  }
}

Tickets.propTypes = propTypes;
Tickets.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tickets);
