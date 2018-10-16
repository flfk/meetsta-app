import styled from 'styled-components';

const Cell = styled.View`
  padding: 16px;
`;

const Image = styled.Image`
  width: 100%;
  height: 160px;
  border-radius: 5px;
  margin-bottom: 16px;
`;

Cell.Image = Image;

export default Cell;
