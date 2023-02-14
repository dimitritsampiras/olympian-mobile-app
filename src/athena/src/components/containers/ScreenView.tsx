import React, { ReactNode } from 'react';
import { StyleSheet, ScrollView, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../theme';

interface ScreenViewProps {
  children: ReactNode[] | ReactNode;
  type?: 'main' | 'form';
  styles?: ViewProps['style'];
  spaced?: boolean;
  showScrollBar?: boolean;
  scrollBounce?: boolean;
  scrollable?: boolean;
}

export const ScreenView: React.FC<ScreenViewProps> = ({
  type = 'main',
  spaced,
  showScrollBar = false,
  scrollBounce = true,
  scrollable = true,
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
      <ScrollView
        showsVerticalScrollIndicator={showScrollBar}
        alwaysBounceVertical={scrollBounce}
        scrollEnabled={scrollable}
        contentContainerStyle={spaced ? ScrollStyle.isSpaced : ScrollStyle.notSpaced}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const ScrollStyle = StyleSheet.create({
  notSpaced: {
    flex: 1,
  },
  isSpaced: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
