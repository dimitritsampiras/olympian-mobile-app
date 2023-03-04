import React, { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';
import theme from '../../../theme';

interface HeadingProps extends TextProps {
  as?: 'title' | 'h1' | 'h2' | 'h3' | 'h4';
  children: ReactNode;
  noMargin?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  as = 'h1',
  children,
  style,
  noMargin,
  ...props
}) => {
  let fontSize;
  switch (as) {
    case 'title':
      fontSize = 40;
      break;
    case 'h1':
      fontSize = 30;
      break;
    case 'h2':
      fontSize = 26;
      break;
    case 'h3':
      fontSize = 18;
      break;
    case 'h4':
      fontSize = 14;
      break;
  }

  let marginBottom;
  switch (as) {
    case 'title':
      marginBottom = 24;
      break;
    case 'h1':
      marginBottom = 22;
      break;
    case 'h2':
      marginBottom = 14;
      break;
    case 'h3':
      marginBottom = 14;
      break;
    case 'h4':
      marginBottom = 0;
      break;
  }

  return (
    <Text
      style={[
        { fontSize, color: theme.colors.gray[900], fontWeight: '700' },
        !noMargin && { marginBottom },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};
