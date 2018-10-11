// TestRedux DELETE
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, Button } from 'react-native';

import { connect } from 'react-redux';
import { setFavoriteAnimal } from '../actions';

const propTypes = {};

const defaultProps = {};

class TestRedux extends React.Component {
  state = {
    favoriteAnimal: this.props.favoriteAnimal,
  };

  handleSetFavoriteAnimalPress = () => {
    const { setFavoriteAnimal } = this.props;
    setFavoriteAnimal('chicken');
  };

  render() {
    return (
      <View style={style.View}>
        <Text style={style.Text}>Testing redux</Text>
        <Text style={style.Text}>{this.props.favoriteAnimal}</Text>
        <Button title="set favorite animal" onPress={this.handleSetFavoriteAnimalPress} />
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

// Takes state from redux and returns to component properties
const mapStateToProps = state => ({
  favoriteAnimal: state.favoriteAnimal,
});

// Takes dispatch and applies to component properties
const mapDispatchToProps = dispatch => ({
  setFavoriteAnimal: text => dispatch(setFavoriteAnimal(text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestRedux);
