import React from 'react';
import { View, ViewProps } from 'react-native';

interface HeaderProps extends ViewProps {
  row?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ style, row, children }) => {
  return (
    <View
      style={[
        { marginTop: 25 },
        row && { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        style,
      ]}>
      {children}
    </View>
  );
};
