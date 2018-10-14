import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import InputText from '../components/InputText';

import { addOrder } from '../redux/orders/orders.actions';

import { fetchDocOrder } from '../firebase/api';
import NavigationService from '../navigation/NavigationService';

const propTypes = {
  actionAddOrder: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  actionAddOrder: order => dispatch(addOrder(order)),
});

class AddTicket extends React.Component {
  static navigationOptions = {
    headerTitle: 'Add Ticket',
    tabBarVisible: false,
  };

  state = {
    email: '',
    orderRef: '',
  };

  addTicket = async () => {
    // XX TODO
    const { email, orderRef } = this.state;
    const { actionAddOrder } = this.props;
    // console.log('AddTicket orderRef is ', orderRef);
    const order = await fetchDocOrder(orderRef);
    // console.log('order is ', order);
    actionAddOrder(order);
    NavigationService.navigate('Tickets');
    // attempt to fetch the ticket
    // if successful
    // disaptch an action to add ticket to store
    // navigate back to add tickets
    // handle errror
  };

  handleChangeEmail = email => this.setState({ email });

  handleChangeOrderNum = orderRef => this.setState({ orderRef });

  render() {
    const { email, orderRef } = this.state;

    return (
      <Container paddingHorizontal>
        <InputText
          label={'Ticket order reference number'}
          value={orderRef}
          handler={this.handleChangeOrderNum}
          placeholder={'123456'}
        />
        <InputText
          label={'Email you provided when you purchased ticket'}
          value={email}
          handler={this.handleChangeOrderNum}
          placeholder={'email@example.com'}
        />
        <Btn.Primary title="Submit" onPress={this.addTicket} />
      </Container>
    );
  }
}

AddTicket.propTypes = propTypes;

export default connect(
  null,
  mapDispatchToProps
)(AddTicket);
