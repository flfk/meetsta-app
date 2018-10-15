import React from 'react';
import PropTypes from 'prop-types';

import Fonts from '../utils/Fonts';
import Placeholder from './Placeholder';

const propTypes = {};

const defaultProps = {};

const ListEventsPlaceholder = props => {
  const placeholderCell = (
    <Placeholder.Cell>
      <Placeholder.CellImage />
      <Placeholder.H1 />
      <Placeholder.H3 />
      <Placeholder.H3 />
      <Placeholder.H2 />
      <Placeholder.H2 />
      <Placeholder.H2 />
      <Placeholder.Btn />
    </Placeholder.Cell>
  );

  return (
    <Placeholder.List>
      <Fonts.H1 marginLeft>My Events</Fonts.H1>
      {placeholderCell}
      {placeholderCell}
      {placeholderCell}
    </Placeholder.List>
  );
};

ListEventsPlaceholder.propTypes = propTypes;
ListEventsPlaceholder.defaultProps = defaultProps;

export default ListEventsPlaceholder;
