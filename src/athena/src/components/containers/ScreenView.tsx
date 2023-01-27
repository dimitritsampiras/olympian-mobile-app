import React, { ReactNode } from 'react';
import { ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../theme';

interface ScreenViewProps {
  children: ReactNode[] | ReactNode;
  type?: 'main' | 'form';
  styles?: ViewProps['style'];
}

export const ScreenView: React.FC<ScreenViewProps> = ({ type = 'main', styles, children }) => {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          paddingHorizontal: 24,
          backgroundColor: type === 'form' ? theme.white : theme.gray[50],
        },
        styles,
      ]}>
      {children}
    </SafeAreaView>
  );
};
