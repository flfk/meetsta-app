import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import BtnNavBar from '../components/BtnNavBar';
import Btn from '../components/Btn';
import CellTicket from '../components/CellTicket';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import { getDate, getTimeStart } from '../utils/Helpers';
import ListTickets from '../components/ListTickets';

import BANNER_ANDRE from '../assets/EventBannerAndre.jpg';

const TEST_EVENTS = [
  {
    title: 'Meet Andre Swilley',
    organiser: 'Andre Swiley',
    date: 'Sunday, 26 August',
    time: '3:05pm PDT',
    orderNum: '123123123',
    name: 'Say Hi and Get a Selfie',
  },
  {
    title: 'Meet Mostly Luca',
    organiser: 'Andre Swiley',
    date: 'Sunday, 26 August',
    time: '3:05pm PDT',
    orderNum: '123123123',
    name: 'Say Hi and Get a Selfie',
  },
];

const propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      organiser: PropTypes.string.isRequired,
      dateStart: PropTypes.number.isRequired,
      orderNum: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      ticketID: PropTypes.string.isRequired,
      eventID: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const defaultProps = {};

const mapStateToProps = state => ({
  tickets: state.tickets,
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
    events: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ events: TEST_EVENTS });
  };

  joinQueue = () => {
    // XX TODO
    const { navigation } = this.props;
    navigation.navigate('EventFan');
  };

  renderItem = ({ item, index }) => {
    return (
      <CellTicket key={index}>
        <CellTicket.Image source={BANNER_ANDRE} />
        <Fonts.H1>{item.name}</Fonts.H1>
        <Fonts.H2>{item.organiser}</Fonts.H2>
        <Fonts.P>{getDate(item.dateStart)}</Fonts.P>
        <Fonts.P>{getTimeStart(item.dateStart)}</Fonts.P>
        <Fonts.P>Order #{item.orderNum}</Fonts.P>
        <Btn.Primary title="Join Queue" onPress={this.joinQueue} />
      </CellTicket>
    );
  };

  renderHeader = {};

  render() {
    console.log(this.props.tickets);

    const { tickets } = this.props;

    return (
      <Container>
        <ListTickets
          ListHeaderComponent={<Fonts.H1 marginLeft>My Tickets</Fonts.H1>}
          renderItem={this.renderItem}
          data={tickets}
          keyExtractor={(event, index) => event + index}
        />
      </Container>
    );
  }
}

Tickets.propTypes = propTypes;
Tickets.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  null
)(Tickets);
