import styled from 'styled-components';

const Content = styled.View`
  margin-bottom: 16;

  ${props => (props.center ? 'justify-content: center; align-items: center' : '')};
`;

export default Content;
