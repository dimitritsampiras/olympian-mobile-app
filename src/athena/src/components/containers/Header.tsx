import React from 'react';
import { View, ViewProps } from 'react-native';

interface HeaderProps extends ViewProps {}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return <View style={{ paddingTop: 25, paddingBottom: 25 }}>{children}</View>;
};
