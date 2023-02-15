import React from 'react';
import { View, ViewProps } from 'react-native';

interface HeaderProps extends ViewProps {}

export const Header: React.FC<HeaderProps> = ({ style, children }) => {
  return <View style={[{ marginTop: 25 }, style]}>{children}</View>;
};
