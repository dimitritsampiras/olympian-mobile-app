import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import theme from '../../theme';

interface HeadingProps {
  as?: 'title' | 'h1' | 'h2' | 'h3';
  children: ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ as = 'h1', children }) => {
  let fontSize;
  switch (as) {
    case 'title':
      fontSize = 40;
      break;
    case 'h1':
      fontSize = 30;
      break;
    case 'h2':
      fontSize = 24;
      break;
    case 'h3':
      fontSize = 20;
      break;
  }

  return <Text style={{ fontSize, color: theme.gray[900], fontWeight: '800' }}>{children}</Text>;
};
