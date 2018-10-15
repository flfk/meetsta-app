import styled from 'styled-components';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: white;
  width: 100%;

  ${props => (props.paddingHorizontal ? 'padding-left: 16px; padding-right: 16px' : '')};
  ${props => (props.paddingVertical ? 'padding-top: 16px; padding-bottom: 16px' : '')};

  ${props => (props.center ? 'justify-content: center' : '')};
  ${props => (props.spaceAround ? 'justify-content: space-around' : '')};
  ${props => (props.spaceBetween ? 'justify-content: space-between' : '')};
`;

export default Container;
