import styled from 'styled-components';

import Fonts from '../utils/Fonts';

const Top = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  height: 64;
  width: 100%;
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
  height: 48;
  width: 100%;
`;

const Content = styled.View`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 16;
  padding-left: 16;
  padding-right: 16;
`;

const Text = styled.Text`
  color: white;
  font-weight: bold;
  font-size: ${Fonts.sizes.h1};
`;

const Timer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 112;
`;

const VideoBar = {};
VideoBar.Background = Background;
VideoBar.Bottom = Bottom;
VideoBar.Content = Content;
VideoBar.Text = Text;
VideoBar.Timer = Timer;
VideoBar.Top = Top;

export default VideoBar;
