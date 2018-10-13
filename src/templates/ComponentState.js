import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

const propTypes = {};

const defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class XX extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <View />;
  }
}

XX.propTypes = propTypes;
XX.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(XX);
