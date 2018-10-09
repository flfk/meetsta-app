import React from 'react';

import BtnNavBar from '../components/BtnNavBar';
import Btn from '../components/Btn';
import CellTicket from '../components/CellTicket';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import ListTickets from '../components/ListTickets';

import BANNER_ANDRE from '../assets/EventBannerAndre.jpg';

const TEST_EVENTS = [
  {
    title: 'Meet Andre Swilley',
    creator: 'Andre Swiley',
    date: 'Sunday, 26 August',
    time: '3:05pm PDT',
    order: '123123123'
  },
  {
    title: 'Meet Mostly Luca',
    creator: 'Andre Swiley',
    date: 'Sunday, 26 August',
    time: '3:05pm PDT',
    order: '123123123'
  }
];

const propTypes = {};

const defaultProps = {};

class Tickets extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: <BtnNavBar title="Add ticket" onPress={() => navigation.navigate('AddTicket')} />
    };
  };

  state = {
    events: []
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
        <Fonts.H1>{item.title}</Fonts.H1>
        <Fonts.A>{item.creator}</Fonts.A>
        <Fonts.P>{item.date}</Fonts.P>
        <Fonts.P>{item.time}</Fonts.P>
        <Fonts.P>Order #{item.order}</Fonts.P>
        <Btn.Primary title="Join Queue" onPress={this.joinQueue} />
      </CellTicket>
    );
  };

  renderHeader = {};

  render() {
    return (
      <Container>
        <ListTickets
          ListHeaderComponent={<Fonts.H1 marginLeft>My Tickets</Fonts.H1>}
          renderItem={this.renderItem}
          data={this.state.events}
          keyExtractor={(event, index) => event + index}
        />
      </Container>
    );
  }
}

Tickets.propTypes = propTypes;
Tickets.defaultProps = defaultProps;

export default Tickets;
