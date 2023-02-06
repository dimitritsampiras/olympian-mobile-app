import React, { ReactNode } from 'react';
import { ScrollView, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../theme';

interface ScreenViewProps {
  children: ReactNode[] | ReactNode;
  type?: 'main' | 'form';
  styles?: ViewProps['style'];
  spaced?: boolean;
  showScrollBar?: boolean;
  scrollBounce?: boolean;
}

export const ScreenView: React.FC<ScreenViewProps> = ({
  type = 'main',
  spaced,
  showScrollBar = false,
  scrollBounce = true,
  styles,
  children,
}) => {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          paddingHorizontal: 24,
          backgroundColor: type === 'form' ? theme.white : theme.gray[50],
        },
        spaced && { justifyContent: 'space-between' },
        styles,
      ]}>
      <ScrollView
        showsVerticalScrollIndicator={showScrollBar}
        alwaysBounceVertical={scrollBounce}
        style={{
          flex: 1,
        }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
