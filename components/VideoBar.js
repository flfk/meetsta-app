import styled from 'styled-components';

import Fonts from '../utils/Fonts';

const Top = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  height: 64;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Background = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  background-color: black;
  opacity: 0.3;
`;

const Bottom = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 64;
  width: 100%;

  background-color: orange;
`;

const Text = styled.Text`
  color: white;
  font-weight: bold;
  font-size: ${Fonts.sizes.h1};
  margin-top: 16;
  margin-right: 16;
`;

const VideoBar = {};
VideoBar.Background = Background;
VideoBar.Bottom = Bottom;
VideoBar.Text = Text;
VideoBar.Top = Top;

export default VideoBar;
