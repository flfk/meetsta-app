import PropTypes from 'prop-types';
import React from 'react';
import { RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import BtnNavBar from '../components/BtnNavBar';
import Btn from '../components/Btn';
import CellTicket from '../components/CellTicket';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import { getDate, getTimeStart } from '../utils/Helpers';
import ListTickets from '../components/ListTickets';

import { fetchCollOrders, fetchAdditionalOrderFields } from '../firebase/api';
import { addOrdersAll } from '../redux/orders/orders.actions';

import BANNER_ANDRE from '../assets/EventBannerAndre.jpg';

const propTypes = {
  actionAddOrdersAll: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      organiserName: PropTypes.string.isRequired,
      dateStart: PropTypes.number.isRequired,
      orderRef: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      ticketID: PropTypes.string.isRequired,
      eventID: PropTypes.string.isRequired,
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
    refreshing: false,
  };

  componentDidMount() {
    this.loadOrders();
  }

  loadOrders = async () => {
    const { actionAddOrdersAll, uid } = this.props;
    const orderColl = await fetchCollOrders(uid);
    const orders = await Promise.all(
      orderColl.map(async orderDoc => {
        const additionalFields = await fetchAdditionalOrderFields(orderDoc);
        return { ...orderDoc, ...additionalFields };
      })
    );
    console.log('orders are ', orders);
    actionAddOrdersAll(orders);

    // XX TODO
    // If they have none, present instructions to add a ticket
    // swipe up to reload
  };

  joinQueue = () => {
    // XX TODO
    const { navigation } = this.props;
    navigation.navigate('EventFan');
  };

  renderItem = ({ item, index }) => {
    return (
      <CellTicket key={index}>
        <CellTicket.Image source={{ uri: item.previewImgURL }} />
        <Fonts.H1>{item.name}</Fonts.H1>
        <Fonts.H2>{item.organiserName}</Fonts.H2>
        <Fonts.P>{getDate(item.dateStart)}</Fonts.P>
        <Fonts.P>{getTimeStart(item.dateStart)}</Fonts.P>
        <Fonts.P>Order ref {item.orderRef}</Fonts.P>
        <Btn.Primary title="Join Queue" onPress={this.joinQueue} />
      </CellTicket>
    );
  };

  renderHeader = {};

  sortTickets = (a, b) => a.dateStart - b.dateStart;

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.loadOrders().then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    // console.log('Tickets orders are', this.props.orders);
    const { refreshing } = this.state;
    const { orders } = this.props;
    const ordersSorted = orders.sort(this.sortTickets);

    return (
      <Container>
        <ListTickets
          ListHeaderComponent={<Fonts.H1 marginLeft>My Tickets</Fonts.H1>}
          renderItem={this.renderItem}
          data={ordersSorted}
          keyExtractor={(event, index) => event + index}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
        />
      </Container>
    );
  }
}

Tickets.propTypes = propTypes;
Tickets.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tickets);
