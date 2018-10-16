import React from 'react';
import PropTypes from 'prop-types';

import Btn from './Btn';
import Cell from './Cell';
import Fonts from '../utils/Fonts';
import Icons from './Icons';
import { getDate, getTimeStart, getTimeRemaining } from '../helpers/TimeFormatting';

const propTypes = {
  addOnsSold: PropTypes.number.isRequired,
  dateStart: PropTypes.number.isRequired,
  eventID: PropTypes.string.isRequired,
  previewImgURL: PropTypes.string.isRequired,
  revenue: PropTypes.number.isRequired,
  handleStartEvent: PropTypes.func.isRequired,
  ticketsSold: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const defaultProps = {};

const CellEvent = ({
  addOnsSold,
  dateStart,
  eventID,
  previewImgURL,
  revenue,
  handleStartEvent,
  ticketsSold,
  title,
}) => {
  let btn = null;
  const timeRemaining = getTimeRemaining(dateStart);
  const { days, diffMillis, hours, minutes } = timeRemaining;
  const btnText = `${days}d : ${hours}h : ${minutes}m to go`;
  if (diffMillis > 0) {
    btn = (
      <Btn.Primary
        title="Start Event"
        onPress={() => handleStartEvent(eventID)}
        icon={Icons.Video}
      />
    );
  } else {
    btn = <Btn.Tertiary title={btnText} onPress={() => true} disabled icon={Icons.Hourglass} />;
  }
  return (
    <Cell>
      <Cell.Image source={{ uri: previewImgURL }} />
      <Fonts.H1>{title}</Fonts.H1>
      <Fonts.H3>{getDate(dateStart)}</Fonts.H3>
      <Fonts.H3>{getTimeStart(dateStart)}</Fonts.H3>
      <Fonts.H2>
        ${revenue.toFixed(0)} <Fonts.P>earned</Fonts.P>
      </Fonts.H2>
      <Fonts.H2>
        {ticketsSold} <Fonts.P>tickets sold</Fonts.P>
      </Fonts.H2>
      <Fonts.H2>
        {addOnsSold} <Fonts.P>add ons sold</Fonts.P>
      </Fonts.H2>
      {btn}
    </Cell>
  );
};

CellEvent.propTypes = propTypes;
CellEvent.defaultProps = defaultProps;

export default CellEvent;
