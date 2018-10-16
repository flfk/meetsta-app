import PropTypes from 'prop-types';
import React from 'react';
import { RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import BtnNavBar from '../components/BtnNavBar';
import Btn from '../components/Btn';
import CellTicket from '../components/CellTicket';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import Icons from '../components/Icons';
import { getDate, getTimeStart, getTimeRemaining } from '../utils/Helpers';
import List from '../components/List';
import ListTicketsPlaceholder from '../components/ListTicketsPlaceholder';
import OnboardingBubble from '../components/OnboardingBubble';

import { fetchCollOrders, fetchAdditionalOrderFields } from '../firebase/api';
import { addOrdersAll } from '../redux/orders/orders.actions';

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
    const orders = await Promise.all(
      orderColl.map(async orderDoc => {
        const additionalFields = await fetchAdditionalOrderFields(orderDoc);
        return { ...orderDoc, ...additionalFields };
      })
    );
    if (orders.length > 0) {
      actionAddOrdersAll(orders);
    }
    this.setState({ isLoading: false });
  };

  joinQueue = () => {
    // XX TODO
    const { navigation } = this.props;
    navigation.navigate('EventFan');
  };

  renderItem = ({ item, index }) => {
    let btn = null;
    const timeRemaining = getTimeRemaining(item.dateStart);
    const { days, diffMillis, hours, minutes } = timeRemaining;
    const btnText = `${days}d : ${hours}h : ${minutes}m to go`;
    if (diffMillis > 0) {
      btn = <Btn.Primary title="Join Queue" onPress={this.joinQueue} icon={Icons.Video} />;
    } else {
      btn = <Btn.Tertiary title={btnText} onPress={() => true} disabled icon={Icons.Hourglass} />;
    }

    return (
      <CellTicket key={index}>
        <CellTicket.Image source={{ uri: item.previewImgURL }} />
        <Fonts.H1>{item.name}</Fonts.H1>
        <Fonts.H2>{item.organiserName}</Fonts.H2>
        <Fonts.P>{getDate(item.dateStart)}</Fonts.P>
        <Fonts.P>{getTimeStart(item.dateStart)}</Fonts.P>
        <Fonts.P>Order ref {item.orderRef}</Fonts.P>
        {btn}
      </CellTicket>
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
    // console.log('Tickets orders are', this.props.orders);
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
