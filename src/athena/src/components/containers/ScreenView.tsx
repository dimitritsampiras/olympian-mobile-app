import React, { ReactNode } from 'react';
import { ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../theme';

interface ScreenViewProps {
  children: ReactNode[] | ReactNode;
  type?: 'main' | 'form';
  styles?: ViewProps['style'];
  spaced?: boolean;
}

export const ScreenView: React.FC<ScreenViewProps> = ({
  type = 'main',
  spaced,
  styles,
  children,
}) => {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          paddingHorizontal: 24,
          backgroundColor: type === 'form' ? theme.colors.white : theme.colors.gray[50],
        },
        spaced && { justifyContent: 'space-between' },
        styles,
      ]}>
      {children}
    </SafeAreaView>
  );
};
