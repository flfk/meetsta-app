import React from 'react';

// import BtnNavBar from '../components/BtnNavBar';
import Btn from '../components/Btn';
import CellTicket from '../components/CellTicket';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import ListTickets from '../components/ListTickets';

import BANNER_ANDRE from '../assets/EventBannerAndre.jpg';

const TEST_EVENTS = [
  {
    title: 'Meet Andre Swilley',
    revenue: 50,
    ticketsSold: 12,
    addOnsSold: 5,
    date: 'Sunday, 26 August',
    time: '3:05pm PDT'
  },
  {
    title: 'Meet Mostly Luca',
    revenue: 50,
    ticketsSold: 8,
    addOnsSold: 5,
    date: 'Sunday, 26 August',
    time: '3:05pm PDT'
  }
];

const propTypes = {};

const defaultProps = {};

class Events extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerRight: <BtnNavBar title="Add ticket" onPress={() => navigation.navigate('AddTicket')} />
  //   };
  // };

  state = {
    events: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ events: TEST_EVENTS });
  };

  startEvent = () => {
    // XX TODO
    const { navigation } = this.props;
    navigation.navigate('EventOrganiser');
  };

  renderItem = ({ item, index }) => {
    return (
      <CellTicket key={index}>
        <CellTicket.Image source={BANNER_ANDRE} />
        <Fonts.H1>{item.title}</Fonts.H1>
        <Fonts.H3>
          {item.date}, {item.time}
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

  render() {
    return (
      <Container>
        <ListTickets
          ListHeaderComponent={<Fonts.H1 marginLeft>My Events</Fonts.H1>}
          renderItem={this.renderItem}
          data={this.state.events}
          keyExtractor={(event, index) => event + index}
        />
      </Container>
    );
  }
}

Events.propTypes = propTypes;
Events.defaultProps = defaultProps;

export default Events;
