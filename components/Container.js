import styled from 'styled-components';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  ${props => (props.padding ? 'padding: 16px' : '')};

  ${props => (props.spaceAround ? 'justify-content: space-around' : '')};
  ${props => (props.spaceBetween ? 'justify-content: space-between' : '')};
`;

export default Container;
