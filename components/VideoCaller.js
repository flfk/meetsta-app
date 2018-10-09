import styled from 'styled-components';

const VideoCaller = styled.View`
  position: absolute;
  bottom: 24;
  left: 16;
  height: 110;
  width: 90;
  border-radius: 5;
`;

const Image = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 5;
`;

VideoCaller.Image = Image;

export default VideoCaller;
