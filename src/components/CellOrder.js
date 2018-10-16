import React from 'react';
import PropTypes from 'prop-types';

import Btn from './Btn';
import Cell from './Cell';
import Fonts from '../utils/Fonts';
import Icons from './Icons';
import { getDate, getTimeStart, getTimeRemaining } from '../helpers/TimeFormatting';

const propTypes = {
  dateStart: PropTypes.number.isRequired,
  eventID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  orderID: PropTypes.string.isRequired,
  orderRef: PropTypes.string.isRequired,
  organiserName: PropTypes.string.isRequired,
  previewImgURL: PropTypes.string.isRequired,
  handleJoinQueue: PropTypes.func.isRequired,
};

const defaultProps = {};

const CellOrder = ({
  dateStart,
  eventID,
  name,
  orderID,
  orderRef,
  organiserName,
  previewImgURL,
  handleJoinQueue,
}) => {
  let btn = null;
  const timeRemaining = getTimeRemaining(dateStart);
  const { days, diffMillis, hours, minutes } = timeRemaining;
  const btnText = `${days}d : ${hours}h : ${minutes}m to go`;
  if (diffMillis > 0) {
    btn = (
      <Btn.Primary
        title="Join Queue"
        onPress={() => handleJoinQueue(eventID, orderID)}
        icon={Icons.Video}
      />
    );
  } else {
    btn = <Btn.Tertiary title={btnText} onPress={() => true} disabled icon={Icons.Hourglass} />;
  }

  return (
    <Cell key={orderID}>
      <Cell.Image source={{ uri: previewImgURL }} />
      <Fonts.H1>{name}</Fonts.H1>
      <Fonts.H2>{organiserName}</Fonts.H2>
      <Fonts.P>{getDate(dateStart)}</Fonts.P>
      <Fonts.P>{getTimeStart(dateStart)}</Fonts.P>
      <Fonts.P>Order ref {orderRef}</Fonts.P>
      {btn}
    </Cell>
  );
};

CellOrder.propTypes = propTypes;
CellOrder.defaultProps = defaultProps;

export default CellOrder;
