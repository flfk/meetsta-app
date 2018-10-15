import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import InputText from '../components/InputText';

import { addOrder } from '../redux/orders/orders.actions';

import { fetchAdditionalOrderFields, fetchDocOrder, updateDocOrder } from '../firebase/api';
import NavigationService from '../navigation/NavigationService';

const propTypes = {
  actionAddOrder: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.uid,
});

const mapDispatchToProps = dispatch => ({
  actionAddOrder: order => dispatch(addOrder(order)),
});

class AddTicket extends React.Component {
  static navigationOptions = {
    headerTitle: 'Add Ticket',
    tabBarVisible: false,
  };

  state = {
    email: 'test@test.com',
    errorMsg: '',
    isLoading: false,
    orderRef: '1',
  };

  claimOrder = async orderID => {
    const { uid } = this.props;
    const orderClaimed = await updateDocOrder(orderID, 'uid', uid);
  };

  handleAddTicket = async () => {
    const { email, orderRef } = this.state;
    const { actionAddOrder } = this.props;
    const order = await fetchDocOrder(orderRef);

    if (!this.isValidOrder(order, email)) {
      return;
    }

    this.claimOrder(order.orderID);

    const additionalFields = await fetchAdditionalOrderFields(order);
    // console.log('Full order should be ', { ...order, ...additionalFields });
    actionAddOrder({ order, ...additionalFields });
    NavigationService.navigate('Tickets');
  };

  handleChangeEmail = email => this.setState({ email });

  handleChangeOrderNum = orderRef => this.setState({ orderRef });

  isValidOrder = (order, email) => {
    const { uid } = this.props;
    const emailFormatted = email.toLowerCase().trim();

    if (!order.eventID) {
      this.setState({
        errorMsg:
          'The order reference number provided is invalid. Please check your order confirmation email for the reference number and try again.',
      });
      return false;
    }
    if (order.purchaseEmail !== emailFormatted) {
      this.setState({
        errorMsg: "The email address doesn't match the order reference. Please try again.",
      });
      return false;
    }
    if (order.uid === uid) {
      this.setState({ errorMsg: "You've already added this order." });
      return false;
    }
    if (order.uid && order.uid !== uid) {
      this.setState({
        errorMsg:
          'Looks like someone has already added this order. Have you added this order with a different account? If not email contact.meetsta@gmail.com for help.',
      });
      return false;
    }

    this.setState({ errorMsg: '' });
    return true;
  };

  render() {
    const { email, orderRef, errorMsg } = this.state;

    return (
      <Container paddingHorizontal>
        <InputText
          label={'Ticket order reference from ticket confirmation email'}
          value={orderRef}
          handler={this.handleChangeOrderNum}
          placeholder={'123456'}
        />
        <InputText
          label={'Email you provided when you purchased ticket'}
          value={email}
          handler={this.handleChangeEmail}
          placeholder={'email@example.com'}
        />
        <Btn.Primary title="Submit" onPress={this.handleAddTicket} />
        <Fonts.ERROR>{errorMsg}</Fonts.ERROR>
      </Container>
    );
  }
}

AddTicket.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTicket);
