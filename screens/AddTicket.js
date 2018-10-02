import React from 'react';

import Btn from '../components/Btn';
import Container from '../components/Container';
import Fonts from '../utils/Fonts';
import InputText from '../components/InputText';
// import BtnNavBar from '../components/BtnNavBar';

class AddTicket extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerTitle: 'Add Ticket'
  //   };
  // };

  state = {
    orderNum: ''
  };

  handleChangeOrderNum = orderNum => this.setState({ orderNum });

  render() {
    const { orderNum } = this.state;

    return (
      <Container>
        <Fonts.H1>What is your ticket order number?</Fonts.H1>
        <InputText
          label={'Order confirmation number'}
          value={orderNum}
          handler={this.handleChangeOrderNum}
          placeholder={'Type the number here'}
        />
        <Btn.Primary title="Submit" />
      </Container>
    );
  }
}

export default AddTicket;
