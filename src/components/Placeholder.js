import React from 'react';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import styled from 'styled-components';

const BtnPlaceholder = styled(ShimmerPlaceHolder)`
  width: 100%;
  border-radius: 5px;
  height: 44;
  margin-bottom: 16;
`;

const Btn = props => <BtnPlaceholder autoRun visible={false} />;

const Cell = styled.View`
  width: 100%;
  padding: 16px;
`;

const CellImagePlaceholder = styled(ShimmerPlaceHolder)`
  width: 100%;
  height: 160px;
  border-radius: 5px;
  margin-bottom: 16px;
`;

const CellImage = props => <CellImagePlaceholder autoRun visible={false} />;

const H1Placeholder = styled(ShimmerPlaceHolder)`
  width: 100%;
  border-radius: 5px;
  height: 39;
  margin-bottom: 16;
`;

const H1 = props => <H1Placeholder autoRun visible={false} />;

const H2Placeholder = styled(ShimmerPlaceHolder)`
  width: 100%;
  border-radius: 5px;
  height: 29.5;
  margin-bottom: 16;
`;

const H2 = props => <H2Placeholder autoRun visible={false} />;

const H3Placeholder = styled(ShimmerPlaceHolder)`
  width: 100%;
  border-radius: 5px;
  height: 24.5;
  margin-bottom: 16;
`;

const H3 = props => <H3Placeholder autoRun visible={false} />;

const List = styled.ScrollView`
  width: 100%;
`;

const PPlaceholder = styled(ShimmerPlaceHolder)`
  width: 100%;
  border-radius: 5px;
  height: 20;
  margin-bottom: 8;
`;

const P = props => <PPlaceholder autoRun visible={false} />;

const Placeholder = {};
Placeholder.Btn = Btn;
Placeholder.Cell = Cell;
Placeholder.CellImage = CellImage;
Placeholder.H1 = H1;
Placeholder.H2 = H2;
Placeholder.H3 = H3;
Placeholder.List = List;
Placeholder.P = P;

export default Placeholder;
