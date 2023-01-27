import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import theme from '../../theme';

interface SubHeadingProps {
  as?: 'title' | 'h1' | 'h2' | 'h3';
  children: ReactNode;
}

export const SubHeading: React.FC<SubHeadingProps> = ({ as = 'h1', children }) => {
  let fontSize;
  switch (as) {
    case 'h1':
      fontSize = 20;
      break;
    case 'h2':
      fontSize = 16;
      break;
    case 'h3':
      fontSize = 12;
      break;
  }

  return <Text style={{ fontSize, color: theme.gray[600], fontWeight: '400' }}>{children}</Text>;
};
