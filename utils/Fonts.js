import styled from 'styled-components';

import COLORS from './Colors';

const FONT_FAMILY = {
  // XX TODO
};

const FONT_SIZES = {
  logo: '32',
  h1: '32',
  h2: '24',
  h3: '20',
  p: '16',
  finePrint: '12'
};

const LOGO = styled.Text`
  font-size: ${FONT_SIZES.logo};
  font-weight: 400;
`;

const H1 = styled.Text`
  font-size: ${FONT_SIZES.h1};
  color: ${COLORS.greys.primary};
  font-weight: 500;
  text-align: ${props => (props.center ? 'center' : 'auto')};
  margin-bottom: 16;
  ${props => (props.marginLeft ? 'margin-left: 16' : '')};
`;

const H2 = styled.Text`
  font-size: ${FONT_SIZES.h2};
  color: ${COLORS.greys.primary};
  font-weight: 400;
  text-align: ${props => (props.center ? 'center' : 'auto')};
  margin-bottom: 16;
`;

const H3 = styled.Text`
  font-size: ${FONT_SIZES.h3};
  color: ${COLORS.greys.primary};
  font-weight: 400;
  text-align: ${props => (props.center ? 'center' : 'auto')};
  margin-bottom: 16;
`;

const P = styled.Text`
  font-size: ${FONT_SIZES.p};
  font-weight: 300;
  color: ${COLORS.greys.primary};
  margin: 0;
  text-align: ${props => (props.center ? 'center' : 'auto')};
  margin-bottom: 8;
`;

const FinePrint = styled.Text`
  font-size: ${FONT_SIZES.finePrint};
  font-weight: 300;
  color: ${COLORS.greys.secondary};
  margin: 8px 0;
  text-align: center;
  margin-bottom: 8;
`;

const ERROR = styled.Text`
  font-size: ${FONT_SIZES.p};
  font-weight: bold;
  color: red;
  margin: 8px 0;
  margin: ${props => (props.noMargin ? '0px' : '')};
  text-align: ${props => (props.center ? 'center' : 'auto')};
`;

const A = styled.Text`
  text-decoration: none;
  color: ${COLORS.primary.red};
  font-weight: bold;
  text-align: ${props => (props.center ? 'center' : 'auto')};
  margin-bottom: 8;
`;

const FONTS = {};
FONTS.family = FONT_FAMILY;
FONTS.sizes = FONT_SIZES;
FONTS.LOGO = LOGO;
FONTS.H1 = H1;
FONTS.H2 = H2;
FONTS.H3 = H3;
FONTS.P = P;
FONTS.FinePrint = FinePrint;
FONTS.ERROR = ERROR;
FONTS.A = A;

export default FONTS;
