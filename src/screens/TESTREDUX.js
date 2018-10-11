// TestRedux DELETE
import PropTypes from 'prop-types';
import React from 'react';
import { AppState, View, Text, Button } from 'react-native';

import { connect } from 'react-redux';
import { updateUser } from '../actions/user';

const propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const defaultProps = {};

// Takes state from redux and returns to component properties
const mapStateToProps = state => ({
  user: state.user,
});

// Takes dispatch and applies to component properties
const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user)),
});

class TestRedux extends React.Component {
  handleUpdate = () => {
    console.log('handling update');
    console.log('app state', AppState.currentState);
    const { user } = this.props;
    const userUpdated = { uid: 'xyz' };
    this.props.updateUser(userUpdated);
  };

  render() {
    const { user } = this.props;

    console.log('the user in props is ', user);

    return (
      <View style={style.View}>
        <Text style={style.Text}>Testing redux</Text>
        <Text style={style.Text}>{user.uid}</Text>
        <Button title="update" onPress={this.handleUpdate} />
      </View>
    );
  }
}

const style = {
  View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontSize: 36,
  },
};

TestRedux.propTypes = propTypes;
TestRedux.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestRedux);
