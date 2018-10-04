import styled from 'styled-components';

const Content = styled.View`
  margin-bottom: 16;

  ${props => (props.row ? 'flex-direction: row' : '')};

  ${props => (props.center ? 'justify-content: center; align-items: center' : '')};
  ${props => (props.spaceBetween ? 'justify-content: space-between' : '')};
`;

export default Content;
