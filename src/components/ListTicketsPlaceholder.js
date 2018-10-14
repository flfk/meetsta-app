import React from 'react';
import PropTypes from 'prop-types';

import Fonts from '../utils/Fonts';
import Placeholder from './Placeholder';

const propTypes = {};

const defaultProps = {};

const ListTicketsPlaceholder = props => {
  const placeholderCell = (
    <Placeholder.Cell>
      <Placeholder.CellImage />
      <Placeholder.H1 />
      <Placeholder.H2 />
      <Placeholder.P />
      <Placeholder.P />
      <Placeholder.P />
      <Placeholder.Btn />
    </Placeholder.Cell>
  );

  return (
    <Placeholder.List>
      <Fonts.H1 marginLeft>My Tickets</Fonts.H1>
      {placeholderCell}
      {placeholderCell}
      {placeholderCell}
    </Placeholder.List>
  );
};

ListTicketsPlaceholder.propTypes = propTypes;
ListTicketsPlaceholder.defaultProps = defaultProps;

export default ListTicketsPlaceholder;
