import React from 'react';
import styled from 'styled-components';

import LogoImg from '../assets/Logo.png';

const LogoWrapper = styled.Image`
  align-self: center;
  width: 240px;
  resize-mode: contain;
`;

const Logo = () => <LogoWrapper source={LogoImg} alt="Meetsta logo" />;

export default Logo;
