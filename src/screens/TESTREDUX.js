// TestRedux DELETE
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, Button } from 'react-native';

import { connect } from 'react-redux';
import { updateUser } from '../actions/user';

const propTypes = {
  uid: PropTypes.string.isRequired,
  updateUid: PropTypes.func.isRequired,
};

const defaultProps = {};

// Takes state from redux and returns to component properties
const mapStateToProps = state => ({
  uid: state.user.uid,
});

// Takes dispatch and applies to component properties
const mapDispatchToProps = dispatch => ({
  updateUid: uid => dispatch(updateUser({ uid })),
});

class TestRedux extends React.Component {
  handleUpdate = () => {
    const { updateUid } = this.props;
    updateUid('www');
  };

  render() {
    const { uid } = this.props;

    return (
      <View style={style.View}>
        <Text style={style.Text}>Testing redux</Text>
        <Text style={style.Text}>{uid}</Text>
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
